---
hide:
    - toc
---
# 🧩 TechOps Inc. Mini Projects – 2-Day DevOps Challenges

---

## **Project 1: Flask WebApp with CI/CD to AWS EC2**

**Theme:** Continuous Deployment of a Python-based WebApp

### 🎯 Objective

Deploy an open-source Python Flask application to an AWS EC2 instance using GitHub Actions CI/CD pipeline.

### 🧠 Key Learning Areas

* AWS EC2 provisioning and IAM permissions
* GitHub Actions CI/CD pipeline
* Docker containerization
* Infrastructure monitoring

### 🧰 Tools

* AWS EC2, S3 (for artifacts), IAM, CloudWatch
* GitHub, Docker, GitHub Actions
* Nginx as reverse proxy

### 👥 Roles

| Role            | Responsibility                                   |
| --------------- | ------------------------------------------------ |
| Project Owner   | Defines success criteria and AWS cost boundaries |
| Scrum Master    | Ensures sprint completion in 2 days              |
| DevOps Engineer | Creates CI/CD pipeline with GitHub Actions       |
| Developer       | Customizes the Flask app and Dockerfile          |
| SysAdmin        | Configures EC2 instance, installs Docker, Nginx  |
| Networking      | Sets up VPC, Security Groups, key pairs          |
| IAM             | Manages GitHub OIDC IAM role for GitHub Actions  |
| Monitoring      | Sets up CloudWatch metrics and logs              |
| Storage         | Configures S3 bucket for build artifacts         |

### 🧪 Suggested App

🔗 [Open Source Flask Blog App](https://github.com/CoreyMSchafer/code_snippets/tree/master/Python/Flask_Blog)

---

## **Project 2: Node.js REST API with Docker Compose and Jenkins**

**Theme:** Microservice CI/CD Automation

### 🎯 Objective

Deploy a simple Node.js REST API using Docker Compose via Jenkins on AWS EC2.

### 🧠 Key Learning Areas

* Jenkins CI/CD pipeline
* Docker Compose orchestration
* Secrets management and role-based access
* AWS networking for multi-container apps

### 🧰 Tools

* AWS EC2, IAM, Jenkins, Docker, Docker Compose
* GitHub repository integration
* Prometheus for container monitoring

### 👥 Roles

| Role            | Responsibility                                    |
| --------------- | ------------------------------------------------- |
| Project Owner   | Defines service endpoints and uptime requirements |
| Scrum Master    | Facilitates progress check-ins                    |
| DevOps Engineer | Builds Jenkins pipeline                           |
| Developer       | Works on Node.js app code and Dockerfiles         |
| SysAdmin        | Prepares Jenkins EC2 instance                     |
| IAM             | Configures Jenkins service role                   |
| Networking      | Defines subnet and SG rules for microservices     |
| Storage         | Manages EBS volume for persistent data            |
| Monitoring      | Integrates Prometheus and basic alert rules       |

### 🧪 Suggested App

🔗 [Simple Node.js REST API](https://github.com/typicode/json-server)

---

## **Project 3: WordPress + MySQL on AWS using Terraform and Ansible**

**Theme:** Infrastructure as Code (IaC) + Configuration Management

### 🎯 Objective

Deploy WordPress with MySQL backend using Terraform for provisioning and Ansible for configuration.

### 🧠 Key Learning Areas

* IaC with Terraform
* Configuration management with Ansible
* AWS networking and security
* Automated provisioning

### 🧰 Tools

* AWS EC2, RDS/MySQL, S3, IAM
* Terraform, Ansible, GitHub

### 👥 Roles

| Role            | Responsibility                                            |
| --------------- | --------------------------------------------------------- |
| Project Owner   | Defines uptime and deployment policies                    |
| Scrum Master    | Tracks Terraform and Ansible progress                     |
| DevOps Engineer | Writes Terraform scripts and Ansible playbooks            |
| SysAdmin        | Validates configuration and performs manual verifications |
| IAM             | Creates least-privilege roles for Terraform and Ansible   |
| Networking      | Sets up VPC, subnets, SGs                                 |
| Storage         | Configures S3 for backups                                 |
| Monitoring      | Configures CloudWatch alarms for CPU/memory               |
| Developer       | Tweaks WordPress UI                                       |

### 🧪 Suggested App

🔗 [WordPress Terraform + Ansible Example](https://github.com/wardviaene/terraform-course/tree/master/wordpress)

---

## **Project 4: Static Website on S3 + CloudFront + CI/CD**

**Theme:** Serverless Website Hosting

### 🎯 Objective

Host a static website using AWS S3 and CloudFront with GitHub Actions CI/CD to automatically sync content.

### 🧠 Key Learning Areas

* AWS S3 hosting and CloudFront CDN setup
* GitHub Actions for content sync
* IAM and OIDC integration
* Monitoring edge delivery and logs

### 🧰 Tools

* AWS S3, CloudFront, IAM, Route53 (optional)
* GitHub Actions, HTML/CSS/JS
* CloudWatch or AWS Console metrics

### 👥 Roles

| Role            | Responsibility                             |
| --------------- | ------------------------------------------ |
| Project Owner   | Defines web structure and brand guidelines |
| Scrum Master    | Manages delivery milestones                |
| DevOps Engineer | Builds CI/CD for S3 deployment             |
| Developer       | Customizes HTML/CSS content                |
| IAM             | Manages access to S3 and CloudFront        |
| Networking      | Configures CloudFront and DNS              |
| Storage         | Handles S3 bucket lifecycle and logging    |
| Monitoring      | Tracks CloudFront distribution metrics     |
| SysAdmin        | Verifies public access and caching         |

### 🧪 Suggested App

🔗 [Open Source HTML Template](https://github.com/startbootstrap/startbootstrap-resume)

---

## **Project 5: Containerized Monitoring Stack (Prometheus + Grafana)**

**Theme:** Observability and Infrastructure Monitoring

### 🎯 Objective

Deploy a Docker-based monitoring stack for an application using Prometheus and Grafana on AWS.

### 🧠 Key Learning Areas

* Monitoring and visualization setup
* Docker Compose orchestration
* EC2 instance and IAM configuration
* CI/CD for monitoring updates

### 🧰 Tools

* AWS EC2, IAM, Docker, Prometheus, Grafana, Jenkins/GitHub Actions
* GitHub for code and config versioning

### 👥 Roles

| Role            | Responsibility                            |
| --------------- | ----------------------------------------- |
| Project Owner   | Defines key metrics and reporting KPIs    |
| Scrum Master    | Coordinates timelines                     |
| DevOps Engineer | Sets up Prometheus and Grafana containers |
| SysAdmin        | Configures EC2 and installs Docker        |
| Monitoring      | Creates dashboards and alert rules        |
| IAM             | Manages credentials for data sources      |
| Networking      | Opens necessary ports securely            |
| Storage         | Persists Grafana and Prometheus data      |
| Developer       | Creates test apps generating metrics      |

### 🧪 Suggested Stack

🔗 [Prometheus + Grafana Docker Compose Example](https://github.com/stefanprodan/dockprom)

---

## 🏁 Submission & Evaluation

| Criteria                            | Weightage |
| ----------------------------------- | --------- |
| Architecture Design & Documentation | 25%       |
| CI/CD Implementation                | 25%       |
| Cloud Infrastructure Setup          | 25%       |
| Monitoring & Reporting              | 15%       |
| Collaboration & Role Clarity        | 10%       |

Each team will submit:

* Architecture diagram (Lucidchart / draw.io)
* GitHub repo with code + pipeline YAMLs
* AWS screenshots or resource summaries
* Short 3-min demo video or presentation

---

