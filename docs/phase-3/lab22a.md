# Lab: Deploy a simple EC2 instance with Terraform (Optional)

!!! tip "Lab Info"
    **Duration:** 2–4 hours (recommended for beginners)
    **Session mapping:** IaC & Terraform labs (PG-DITISS) — hands-on practice after theory.
    **Goal:** Install Terraform & AWS CLI on Windows/Linux/macOS, configure AWS credentials, write Terraform to provision an EC2 instance (with SSH access and NGINX installed via `user_data`), verify the web page, then destroy the resources.

---

!!! info "Learning objectives"

    * Install Terraform and AWS CLI on Windows, macOS and Linux.
    * Create an AWS IAM user (programmatic access) and configure credentials locally.
    * Author Terraform files (`provider`, `data`, `resource`, `variables`, `outputs`) to provision:

    * an EC2 instance (Amazon Linux 2)
    * a security group opening SSH (22) and HTTP (80)
    * an AWS key pair (from a local public key)
    * Run the standard Terraform workflow: `terraform init`, `terraform plan`, `terraform apply`, `terraform destroy`.
    * SSH to the instance and validate NGINX is serving the test page.
    * Clean up resources and understand cost considerations.

> **Warning (cost):** Although this lab uses small instance types (e.g., `t2.micro` / `t3.micro`) which may be in AWS Free Tier, **you may still incur charges** for non-free resources. Always `terraform destroy` when finished.

---

## A. Pre-requisites

* AWS account with permission to create IAM users, EC2 instances, key pairs, and security groups (or an instructor pre-created IAM credentials for the lab).
* Local machine (Windows / macOS / Linux) with:

  * shell (bash, PowerShell or Git Bash)
  * internet access
  * text editor (VS Code recommended)
* Basic Linux shell familiarity (ssh, chmod).

---

## B. Install tools

### 1) Terraform — quick install per OS

=== "macOS (recommended: Homebrew)"

    ```bash
    # if Homebrew installed:
    brew tap hashicorp/tap
    brew install hashicorp/tap/terraform
    terraform -version
    ```

=== "Ubuntu / Debian Linux"

    ```bash
    # download latest zip (replace <VERSION> with desired release if you want)
    VERSION=1.8.5   # example — you can use latest
    wget https://releases.hashicorp.com/terraform/${VERSION}/terraform_${VERSION}_linux_amd64.zip
    sudo apt-get update && sudo apt-get install -y unzip
    unzip terraform_${VERSION}_linux_amd64.zip
    sudo mv terraform /usr/local/bin/
    terraform -version
    ```

    *(Alternative: use distro packages or HashiCorp apt repo — both are fine. If using cloud VMs you can often use package managers.)*


=== "Windows (PowerShell, Chocolatey or Scoop)"

    * With Chocolatey (run as Admin PowerShell):

    ```powershell
    choco install terraform -y
    terraform -version
    ```

    * Or download the Windows zip from [https://developer.hashicorp.com/terraform/downloads](https://developer.hashicorp.com/terraform/downloads) and add the terraform.exe to your PATH.

---

### 2) AWS CLI

=== "macOS (Homebrew)"

    ```bash
    brew install awscli
    aws --version
    ```

=== "Ubuntu / Debian"

    ```bash
    sudo apt-get update
    sudo apt-get install -y awscli
    aws --version
    ```

    *(If you want AWS CLI v2, follow AWS docs to install the v2 bundle for your OS.)*

=== "Windows"

    * Use Chocolatey:

    ```powershell
    choco install awscli -y
    aws --version
    ```

    * Or download the MSI installer from AWS.

---

### 3) SSH keypair (create locally)

You will create an SSH key pair to access the EC2 instance.

=== "Linux / macOS"

    ```bash
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/techops_key -N ""
    # This creates:
    #  - private: ~/.ssh/techops_key
    #  - public : ~/.ssh/techops_key.pub
    ```

=== "Windows" 

    (PowerShell / Git Bash / WSL): use the same `ssh-keygen` command in Git Bash or WSL, or use PuTTYgen and export OpenSSH public key.

    > Keep the **private key** secure and set permissions:

    ```bash
    chmod 600 ~/.ssh/techops_key
    ```

---

## C. Create an IAM user for the lab (console steps)


1. Sign in to AWS Console → **IAM** → **Users** → **Add user**.
2. Enter username (e.g., `terraform-lab-user`). Choose **Programmatic access** checkbox (creates access key / secret).
3. **Permissions**: For a simple lab, attach the AWS managed policy **AmazonEC2FullAccess** and **AmazonS3ReadOnlyAccess** if you plan to use S3 backend later.
   *Note:* For production / least privilege, create a narrower policy (allow `ec2:*` only as necessary).
4. Create user, copy **Access key ID** and **Secret access key** (or download `.csv`). Keep them safe.

---

## D. Configure AWS credentials locally

```bash
aws configure --profile techops
# Enter Access Key ID, Secret Access Key, default region (e.g., ap-south-1), default output json
```

This stores credentials in `~/.aws/credentials` and `~/.aws/config`.


---

## E. Terraform project — files & code

Create a folder for the lab:

```bash
mkdir terraform-ec2-lab && cd terraform-ec2-lab
```

Create these files:

### 1. `variables.tf`

```hcl
variable "region" {
  description = "AWS Region to deploy to"
  type        = string
  default     = "ap-south-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Name for AWS key pair to create/use"
  type        = string
  default     = "techops-key"
}

variable "public_key_path" {
  description = "Path to local public key file (ssh public key)"
  type        = string
  default     = "~/.ssh/techops_key.pub"
}

variable "my_ip_cidr" {
  description = "CIDR to allow SSH from — set to your IP (e.g. 203.0.113.5/32) or 0.0.0.0/0 for demo"
  type        = string
  default     = "0.0.0.0/0"
}
```

### 2. `provider.tf`

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0" # optional
    }
  }
  required_version = ">= 1.4.0"
}

provider "aws" {
  region  = var.region
  # If you configured a profile with `aws configure --profile techops`, uncomment:
  # profile = "techops"
}
```

### 3. `data.tf` — look up latest Amazon Linux 2 AMI (region agnostic)

```hcl
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}
```

### 4. `resources.tf`

```hcl
# Security group for SSH and HTTP
resource "aws_security_group" "web_sg" {
  name        = "techops-web-sg"
  description = "Allow SSH and HTTP"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip_cidr]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "techops-web-sg"
  }
}

# Create/import key pair using local public key
resource "aws_key_pair" "deployer" {
  key_name   = var.key_name
  public_key = file(var.public_key_path)
}

# EC2 instance
resource "aws_instance" "web" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.web_sg.id]
  key_name               = aws_key_pair.deployer.key_name

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y nginx
              systemctl enable nginx
              systemctl start nginx
              echo "Hello from TechOps Inc. - $(hostname -f)" > /usr/share/nginx/html/index.html
              EOF

  tags = {
    Name = "TechOps-Web-Instance"
  }
}
```

### 5. `outputs.tf`

```hcl
output "instance_id" {
  value = aws_instance.web.id
}

output "instance_public_ip" {
  value = aws_instance.web.public_ip
}

output "instance_public_dns" {
  value = aws_instance.web.public_dns
}
```

### 6. Optional: `dev.tfvars` (example variable values)

```hcl
region         = "ap-south-1"
instance_type  = "t2.micro"
key_name       = "techops-key"
public_key_path = "~/.ssh/techops_key.pub"
my_ip_cidr     = "0.0.0.0/0" # replace with your IP/cidr for better security
```

---

## F. Run the lab: Terraform commands (step-by-step)

1. **Init**

```bash
terraform init
```

* This downloads the AWS provider plugin and initializes the working directory.

2. **Format & Validate (optional but recommended)**

```bash
terraform fmt
terraform validate
```

3. **Plan**

```bash
terraform plan -var-file="dev.tfvars"
```

* Review the plan carefully. Terraform will show which resources will be created.

4. **Apply**

```bash
terraform apply -var-file="dev.tfvars"
# or with auto-approve (not recommended for beginners)
terraform apply -var-file="dev.tfvars" -auto-approve
```

* On success, Terraform will print outputs including the `instance_public_ip`.

5. **Verify**

* In terminal:

```bash
terraform output instance_public_ip
# Example output: 3.10.123.45
```

* Open `http://<instance_public_ip>/` in a browser — you should see the "Hello from TechOps Inc." page.

6. **SSH into the instance**

* For Amazon Linux 2 (ec2-user):

```bash
ssh -i ~/.ssh/techops_key ec2-user@<instance_public_ip>
```

* For Ubuntu AMIs (if used):

```bash
ssh -i ~/.ssh/techops_key ubuntu@<instance_public_ip>
```

* If "Permission denied (publickey)", check that:

  * The private key path is correct and file permissions are `chmod 600`.
  * The instance was launched with the same key name (check `aws ec2 describe-instances` or `terraform show`).

7. **Explore**

* Check nginx status on the instance:

```bash
sudo systemctl status nginx
curl http://localhost
```

---

## G. Tear down / Cleanup

1. **Destroy with Terraform**

```bash
terraform destroy -var-file="dev.tfvars"
# confirm when prompted; or:
terraform destroy -var-file="dev.tfvars" -auto-approve
```

* This attempts to remove all the resources Terraform created (EC2, SG, key pair created by Terraform).

2. **Manual cleanup (if needed)**

* If you created the key pair manually in AWS console, delete it there.
* Check IAM users / access keys created for the lab and rotate/delete them if they were temporary.

---

## H. Troubleshooting — common issues & fixes

* **Credentials / permission denied errors**

  * `Error: No valid credential sources found` → Ensure `aws configure` was run or environment vars are set.
  * `AuthFailure` or `AccessDenied` → The IAM user lacks required permissions (attach `AmazonEC2FullAccess` for the lab).

* **Invalid AMI / AMI not found**

  * AMI ids are region-specific. Using the `data "aws_ami"` data source solves this. If you hardcoded an AMI ID, choose the correct one for your selected region.

* **SSH: Permission denied (publickey)**

  * Wrong username (use `ec2-user` for Amazon Linux; `ubuntu` for Ubuntu).
  * Private key file permissions too open — run `chmod 600 ~/.ssh/techops_key`.
  * Key pair mismatch (instance was launched with a different key name).

* **Port 22 blocked**

  * Check the security group's ingress rules (allowed CIDR). Use `0.0.0.0/0` for testing (NOT recommended permanently). Better: restrict to your public IP, e.g. `203.0.113.5/32`.

* **State or backend lock errors (team scenarios)**

  * If using remote state in S3 with locking, a concurrent `terraform apply` may cause a lock. Wait, or consult `terraform force-unlock` (use with caution).

---

## I. Quick checklist for students (copy/paste)

1. Install Terraform & AWS CLI — verify `terraform -version` and `aws --version`.
2. Create SSH key pair locally: `ssh-keygen -t rsa -b 4096 -f ~/.ssh/techops_key`.
3. Create AWS IAM user with programmatic access, note access key & secret.
4. `aws configure --profile techops` (or set env vars).
5. Clone this lab folder and create/modify `dev.tfvars`.
6. `terraform init` → `terraform plan -var-file="dev.tfvars"` → `terraform apply -var-file="dev.tfvars"`.
7. `terraform output instance_public_ip` → visit web page → `ssh -i ~/.ssh/techops_key ec2-user@<ip>`.
8. `terraform destroy -var-file="dev.tfvars"` when done.
