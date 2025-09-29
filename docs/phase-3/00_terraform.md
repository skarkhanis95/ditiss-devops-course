---
hide:
    - toc
---
# Infrastructure as Code (IaC) with Terraform

---

## Introduction to Infrastructure as Code (IaC) and Terraform

### What is Terraform?
<iframe width="560" height="315" src="https://www.youtube.com/embed/tomUWcQ0P3k?si=2gs24xDYJePO_mn_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Traditional Infrastructure vs IaC

**Traditional Model**

  * Manual provisioning → Admins log into servers, install OS, configure networks, deploy applications.
  * Problems:

    * **Time-consuming** (hours/days to set up infra)
    * **Error-prone** (manual steps differ across environments)
    * **Scalability issues** (hard to replicate for dev/test/prod)

**Infrastructure as Code (IaC)**

  * Infra is **defined using code** (YAML, JSON, or HCL).
  * Example: Instead of clicking buttons on AWS Console, you write `.tf` files that declare **what you want** (e.g., an EC2 VM).
  * Benefits:

    * **Versioning & Auditability** (Git tracks infra changes)
    * **Automation** (fast provisioning + rollback)
    * **Reproducibility** (same infra in dev/test/prod)
    * **Scalability** (templates can spin up 100s of servers in minutes)

**Terraform Overview**

  * Developed by **HashiCorp**.
  * **Cloud-agnostic**: Works with AWS, Azure, GCP, VMware, OpenStack, Kubernetes.
  * Uses **Declarative Configuration**:

    * You write **what** you need (desired state).
    * Terraform figures out **how** to achieve it.
  * Key Commands:

    * `terraform init` → Initialize project & download provider plugins.
    * `terraform plan` → Preview infra changes before applying.
    * `terraform apply` → Provision infra.
    * `terraform destroy` → Tear down infra.

---

## Setting Up the Terraform Environment

### Installation

1. Download Terraform binary from [terraform.io/downloads](https://developer.hashicorp.com/terraform/downloads).
2. Extract and move binary into PATH:

   ```bash
   unzip terraform_1.8.5_linux_amd64.zip
   sudo mv terraform /usr/local/bin/
   terraform -version
   ```

### Configuring a Cloud Provider (Example: AWS)

* Create **IAM user** with programmatic access.
* Generate Access Key + Secret Key.
* Configure credentials:

  ```bash
  aws configure
  ```
* Verify provider:

  ```hcl
  provider "aws" {
    region = "ap-south-1"
  }
  ```

### Terraform Project Directory

```
project/
├── main.tf
├── variables.tf
├── outputs.tf
├── terraform.tfstate
└── .terraform/
```

---

## Writing and Organizing Terraform Configuration Files

### HCL (HashiCorp Configuration Language)

**Blocks** are fundamental:

  * **provider** → Connects to a cloud
  * **resource** → Defines infra objects
  * **variable** → Input values
  * **output** → Exported values

### Example: Simple EC2 Deployment

```hcl
provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = var.instance_type
  tags = {
    Name = "TechOps-Web"
  }
}

variable "instance_type" {
  default = "t2.micro"
}

output "instance_ip" {
  value = aws_instance.web.public_ip
}
```

### Best Practices

**Separate concerns:**

* `main.tf` → infra definition
* `variables.tf` → input parameters
* `outputs.tf` → useful outputs
* Store configs in Git.
* Use `terraform fmt` to format code.

---

## Terraform State Management

### State File

* Stored as `terraform.tfstate`.
* Contains **current infra state** (resources, IDs, configs).
* Needed for Terraform to know *what already exists*.

### Problems with Local State

* Single-user access.
* File corruption risk.
* Not suitable for teams.

### Remote State

* Store in **S3, Azure Blob, GCS, Terraform Cloud**.
* Enables:

    * **Collaboration** (multiple users)
    * **State locking** (prevents concurrent writes)

### Example: AWS S3 Remote State

```hcl
terraform {
  backend "s3" {
    bucket = "techops-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "ap-south-1"
  }
}
```

### Important State Commands

* `terraform state list` → list resources tracked
* `terraform refresh` → sync state with real infra
* `terraform state rm <resource>` → remove resource from state

---

## Terraform Modules and Reusability

### Why Use Modules?

* Avoid duplicating code.
* Improve maintainability.
* Share infra templates across projects.

### Local Module Example

```
/modules
  └── ec2-instance
      ├── main.tf
      ├── variables.tf
      └── outputs.tf
/project
  └── main.tf
```

Calling the module:

```hcl
module "webserver" {
  source        = "./modules/ec2-instance"
  instance_type = "t2.micro"
}
```

### Public Registry Modules

* HashiCorp maintains a registry: [registry.terraform.io](https://registry.terraform.io).
* Example: VPC, RDS, Kubernetes cluster modules.

### Best Practices

* Parameterize with `variables.tf`.
* Output critical info (IP, DNS, credentials).
* Store reusable modules in a Git repo.

---

## Terraform Workflow Recap

1. **Write** config files (`.tf`).
2. **Initialize** project → `terraform init`.
3. **Plan** infra → `terraform plan`.
4. **Apply** infra → `terraform apply`.
5. **Check state** → `terraform show`.
6. **Destroy** when no longer needed → `terraform destroy`.

---

## Real-World Applications

* Automating AWS multi-tier VPC setups.
* Deploying Kubernetes clusters (EKS, GKE, AKS).
* Provisioning CI/CD runners.
* Managing DNS records, SSL certs.
* Hybrid infra (on-prem VMware + cloud AWS).

---

