# Lab 22 — **Terraform Workshop (AWS) for Docker Swarm**

**Format:** mkdocs-material friendly Markdown (followed your lab style)
**Goal:** students *build the Terraform files step-by-step themselves* (we give short snippets and ask for one input at a time). This teaches what each resource does, and avoids dumping a full monolith Terraform file.

---

!!! tip "Objective"

    By the end of this workshop students will be able to:

    * Understand Terraform basics (provider, variables, resources, outputs).
    * Create a VPC, public subnets, Internet Gateway, Route Table, Security Group.
    * Launch EC2 instances (manager + 2 workers) with cloud-init user-data that installs Docker.
    * Output instance IPs and SSH info.
    * Apply and destroy the infrastructure with Terraform.

---

!!! info "Prerequisites"

    * AWS account with permission to create VPCs, EC2, security groups, keypairs, IAM (basic).
    * [AWS CLI configured](../phase-2/cloud-computing/lab13.md) locally (or set `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` env vars).
    * Basic familiarity with terminal & SSH.

---


## Project layout you will create

```
swarm-terraform/
├─ main.tf              # provider + optional locals
├─ variables.tf         # all variables (students will fill defaults or input during apply)
├─ vpc.tf               # VPC, subnets, IGW, route table
├─ security.tf          # security group
├─ keypair.tf           # optional AWS key pair resource
├─ instances.tf         # EC2 instances (manager + workers)
├─ outputs.tf           # public/private IP outputs
├─ cloud-init-docker.sh # cloud-init script to install and configure docker in first boot
```

> For Linux Users: create directory `mkdir ~/swarm-terraform && cd ~/swarm-terraform` before starting.
> For Windows Users: Create the Folder `swarm-terraform` in any place that you prefer in your computer

---
Got it 👍 — here are the **Terraform installation steps for both Windows and Linux**, explained simply so students (who are mostly beginners) can follow.

---

## Installing Terraform


=== "Windows Installation"

    ### Step 1: Download Terraform

    1. Open a browser and go to the official Terraform downloads page:
    👉 [https://developer.hashicorp.com/terraform/downloads](https://developer.hashicorp.com/terraform/downloads)
    2. Choose **Windows (AMD64)** — download the `.zip` file.

    ---

    ### Step 2: Extract the zip

    1. Right-click the downloaded zip → **Extract All**.
    2. Inside you will see a single executable: `terraform.exe`.

    ---

    ### Step 3: Move terraform.exe to a permanent folder

    Common choice:

    * `C:\terraform\terraform.exe`
    (or any folder you prefer).

    ---

    ### Step 4: Add Terraform to PATH

    1. Open **Start Menu** → search for **Environment Variables**.
    2. Click **Edit the system environment variables**.
    3. In System Properties → Advanced → click **Environment Variables**.
    4. Under “System variables” find `Path` → select → **Edit**.
    5. Click **New**, and add the path where you stored `terraform.exe` (e.g., `C:\terraform`).
    6. Click OK → OK → OK to save.

    ---

    ### Step 5: Verify installation

    Open **Command Prompt** or **PowerShell** and run:

    ```powershell
    terraform version
    ```

    You should see something like:

    ```
    Terraform v1.6.x
    on windows_amd64
    ```

    ✅ Done — Terraform is installed on Windows!


=== "Linux Installation (Ubuntu / Debian)"

    ### Step 1: Update packages and install curl, unzip

    ```bash
    sudo apt update
    sudo apt install -y curl unzip
    ```

    ---

    ### Step 2: Download Terraform binary

    Find latest version (example: 1.6.6). Run:

    ```bash
    curl -fsSL https://releases.hashicorp.com/terraform/1.6.6/terraform_1.6.6_linux_amd64.zip -o terraform.zip
    ```

    ---

    ### Step 3: Unzip and move binary

    ```bash
    unzip terraform.zip
    sudo mv terraform /usr/local/bin/
    ```

    ---

    ### Step 4: Verify installation

    ```bash
    terraform version
    ```

    Output should look like:

    ```
    Terraform v1.6.6
    on linux_amd64
    ```

    ✅ Done — Terraform is installed on Linux!

---


## STEP 0 — Create basic files

**Create `main.tf`**:

```hcl
terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
```

**Create `variables.tf`**:

!!! info "Info"
    * Check your default region in AWS Web Console and configure the same here
    * In `variable "ssh_key_name"` section, enter the same key that you have used before

```hcl
variable "aws_region" {
  description = "AWS region to create resources in"
  type        = string
  default     = "eu-north-1"   # change if you like
}

variable "vpc_cidr" {
  description = "VPC CIDR"
  type        = string
  default     = "15.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "List of public subnet CIDRs (at least 2 recommended)"
  type        = list(string)
  default     = ["15.0.1.0/24", "15.0.2.0/24"]
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "ssh_key_name" {
  description = "Existing AWS key pair name (or empty to create one)"
  type        = string
  default     = "ditiss-chef-key"
}

variable "ssh_public_key" {
  description = "If creating a keypair, paste your public SSH key here"
  type        = string
  default     = ""
}

variable "manager_count" {
  description = "Number of Swarm manager nodes"
  type        = number
  default     = 1
}

variable "worker_count" {
  description = "Number of Swarm worker nodes"
  type        = number
  default     = 2
}
```

**Explanation:**
`main.tf` sets the AWS provider. `variables.tf` collects small inputs from users so they can reason about each value (region, CIDRs, instance sizes, keypair choices).

---

## STEP 1 — Create the VPC


**Create `vpc.tf`**:

```hcl
resource "aws_vpc" "swarm_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  tags = {
    Name = "swarm-vpc"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.swarm_vpc.id
  tags = { Name = "swarm-igw" }
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.swarm_vpc.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
  tags = {
    Name = "swarm-public-${count.index + 1}"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.swarm_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = { Name = "swarm-public-rt" }
}

resource "aws_route_table_association" "public_assoc" {
  count          = length(var.public_subnet_cidrs)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public_rt.id
}

data "aws_availability_zones" "available" {}
```

**Explanation:**
This creates a VPC, an Internet Gateway (so instances can reach/pulled images from internet), two public subnets (one per AZ), and associates them with a public route table. Visualisation: *VPC = private network; subnet = chunk of that network; IGW = door to Internet; route table = instructs traffic via the IGW*.

---

## STEP 2 — Create Security Group

!!! warning "Warning"
    * `admin_ip` — is the public IP of your local computer, you can find the same using [What is My IP](https://www.whatismyip.com/). For lab purposes, you can keep default as `0.0.0.0/0` which allows access from any system in the world. But this is risky and should be avoided

**Create `security.tf`**:

```hcl
variable "admin_ip" {
  description = "Your admin public IP in CIDR format for SSH and HTTP access"
  type        = string
  default     = "0.0.0.0/0"
}

resource "aws_security_group" "swarm_sg" {
  name        = "swarm-sg"
  description = "Allow SSH, Swarm and app ports"
  vpc_id      = aws_vpc.swarm_vpc.id

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_ip]
  }

  ingress {
    description = "Swarm manager (2377)"
    from_port   = 2377
    to_port     = 2377
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.swarm_vpc.cidr_block]
  }

  ingress {
    description = "Swarm cluster discovery (7946/tcp)"
    from_port   = 7946
    to_port     = 7946
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.swarm_vpc.cidr_block]
  }

  ingress {
    description = "Swarm cluster discovery (7946/udp)"
    from_port   = 7946
    to_port     = 7946
    protocol    = "udp"
    cidr_blocks = [aws_vpc.swarm_vpc.cidr_block]
  }

  ingress {
    description = "Swarm overlay network (4789/udp)"
    from_port   = 4789
    to_port     = 4789
    protocol    = "udp"
    cidr_blocks = [aws_vpc.swarm_vpc.cidr_block]
  }

  ingress {
    description = "HTTP App (8080)"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = [var.admin_ip]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "swarm-sg" }
}
```

**Explanation:**
We create a SG that permits SSH from your IP, Swarm internal ports across the VPC CIDR (so manager & workers can talk), and exposes port 8080 for the demo app only to your IP.

---

## STEP 3 — Key pair

!!! warning "Choice for students:"

    Do you already have an AWS key pair you will use? (yes/no)

      * If **yes**: set variable `ssh_key_name` to that key name in `variables.tf`. Terraform will attach it to instances.
      * If **no**: paste your local public SSH key (e.g., `~/.ssh/id_rsa.pub`) into `variables.tf` (`ssh_public_key`) and Terraform will create a keypair in AWS.

**Create `keypair.tf`** (paste — this will create a keypair if `ssh_public_key` is provided):

```hcl
resource "aws_key_pair" "swarm_key" {
  count      = var.ssh_public_key != "" ? 1 : 0
  key_name   = "swarm-key-${random_id.key_id.hex}"
  public_key = var.ssh_public_key
}

resource "random_id" "key_id" {
  byte_length = 4
}

# a simple local value to pick either existing name or created one
locals {
  ssh_key_name_final = var.ssh_key_name != "" ? var.ssh_key_name : (length(aws_key_pair.swarm_key) > 0 ? aws_key_pair.swarm_key[0].key_name : "")
}

output "ssh_key_name" {
  value = local.ssh_key_name_final
}
```

---

## STEP 4 — EC2 Instances

!!! info "Instance Information"

    * `manager_count` and `worker_count` (from `variables.tf`, defaults 1 and 2)
    * Confirm `instance_type` (default `t3.small`)

**Create `instances.tf`** (paste — uses the `local.ssh_key_name_final` from previous step):

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical Ubuntu
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "manager" {
  count         = var.manager_count
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.public[0].id
  key_name      = local.ssh_key_name_final
  vpc_security_group_ids = [aws_security_group.swarm_sg.id]
  associate_public_ip_address = true

  user_data = file("${path.module}/cloud-init-docker.sh")

  tags = {
    Name = "swarm-manager-${count.index + 1}"
    Role = "swarm-manager"
  }
}

resource "aws_instance" "worker" {
  count         = var.worker_count
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.public[count.index + 1 >= length(aws_subnet.public) ? 0 : count.index + 1].id
  key_name      = local.ssh_key_name_final
  vpc_security_group_ids = [aws_security_group.swarm_sg.id]
  associate_public_ip_address = true

  user_data = file("${path.module}/cloud-init-docker.sh")

  tags = {
    Name = "swarm-worker-${count.index + 1}"
    Role = "swarm-worker"
  }
}
```

**Create file `cloud-init-docker.sh`**:

```bash
#!/bin/bash
# cloud-init script to install Docker on Ubuntu (runs as root on first boot)
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io
usermod -aG docker ubuntu || true
systemctl enable docker
systemctl start docker
# add a tiny marker file to confirm cloud-init ran
echo "Docker installed on $(hostname)" > /etc/motd.d/docker-installed
```

**Explanation:**
We launch EC2 instances with a cloud-init script that installs Docker and starts it. Students will later SSH into manager and run `docker swarm init`.

---

## STEP 5 — Outputs

**Create `outputs.tf`**:

```hcl
output "manager_public_ips" {
  value = [for i in aws_instance.manager : i.public_ip]
}

output "worker_public_ips" {
  value = [for i in aws_instance.worker : i.public_ip]
}

output "manager_private_ips" {
  value = [for i in aws_instance.manager : i.private_ip]
}
```

**Explanation:**
Outputs make it easy to find the public IPs to SSH into. Students can run `terraform output` or view values after `apply`.

---

## STEP 6 — Initialize & apply

* Start your terminal/cmd/powershell at the same folder where your project folder resides

**Commands (one-by-one):**

1. `terraform init`
2. `terraform validate`
3. `terraform plan` *This will use all default values set in `variables.tf`*

      * Or override defaults by passing them in cli `terraform plan -var="aws_region=ap-south-1" -var="admin_ip=203.0.113.5/32" -var="ssh_public_key=\"<paste-your-ssh-pub-key>\""`

4. `terraform apply`

**Explanation:**
You are intentionally applying as a final step after you’ve built the pieces — this reinforces the idea that Terraform *plans* then *applies* changes.

---

## STEP 7 — Verify EC2 instances & Docker

**Student commands:**

* `terraform output manager_public_ips`
* SSH into manager: `ssh -i ~/.ssh/your_private_key ubuntu@<manager_ip>`
* On manager: `sudo docker version` and `sudo docker run hello-world`

**Explanation:**
Confirm the cloud-init ran and Docker is available. If cloud-init failed, inspect `/var/log/cloud-init-output.log`.

---


## Troubleshooting tips

* If `terraform apply` fails due to API limits or missing quotas, try again after a short wait.
* If EC2 boot fails (no Docker), inspect `cloud-init` logs: `/var/log/cloud-init-output.log`.
* If workers cannot join manager, ensure security group allows ports 2377, 7946, 4789 within VPC. Use `nc -zv <ip> 2377` for quick test.
* If plan shows resources to be recreated unexpectedly, check provider version & data sources (AMI most_recent may change).

---
