---
hide:
    - toc
---
# 📘 Capstone Project — TechOps Inc. Cloud-Native Build

## 🚀 Project Introduction

Welcome to your **final capstone project**!  
Over three days (22 hours), you and your team will function as a **mini company inside TechOps Inc.**.  
Each team receives its **own AWS account** and must collaboratively design, provision, configure, deploy, and operate a **cloud-native application pipeline** with real-world tools.

Unlike earlier labs, this project is **end-to-end**:  
You will build everything from infrastructure to application monitoring while working in assigned **roles** (IAM, Architect, Network, SysAdmin, Storage, Monitoring, Developers, DevOps, Scrum Master).  

The ultimate goal:  
Deliver a **working web application** running in both **staging** and **production**, deployed via **Jenkins pipelines**, containerized with **Docker**, monitored with **Prometheus/Grafana or Nagios**, and backed up with **runbooks and recovery plans**.

---

## 🎯 Learning Objectives

By the end of this Capstone, you will be able to:

- Provision **infrastructure as code** using Terraform Cloud.  
- Manage **users, roles, and permissions** with AWS IAM.  
- Build and configure a **self-hosted Jenkins server**.  
- Create **CI/CD pipelines** that build Docker images, push them to Docker Hub, and deploy to staging & production.  
- Deploy a **containerized web application** on EC2.  
- Implement **monitoring & alerting** with Prometheus/Grafana or Nagios.  
- Configure **backup & restore** workflows for Jenkins.  
- Write **runbooks** for incidents, outages, and recovery.  
- Collaborate as a real DevOps team using **GitHub + Jira under Scrum practices**.  

---

## 🏗️ Project Architecture

Your system will include:

- **IAM & Governance**: Roles for each function, least-privilege policies.  
- **Networking**: VPC, subnets, routing, security groups.  
- **Infrastructure**: EC2 instances for Jenkins, staging app, production app, monitoring server.  
- **Configuration Management**: Ansible for Jenkins and host setup.  
- **Application Layer**: Sample web app (frontend + backend + SQLite DB).  
- **CI/CD**: Jenkins pipelines (checkout → test → build → push → deploy).  
- **Container Registry**: Docker Hub (team namespace).  
- **Monitoring**: Prometheus + Grafana (or Nagios) with dashboards and alerts.  
- **Storage**: S3 buckets for backups and (optionally) Terraform state.  
- **Collaboration**: GitHub repo for code + Jira for agile tracking.  

---

## 👥 Roles & Responsibilities

Each student assumes a **dedicated role**, simulating how real small companies work:

- **Project Owner / IAM Engineer** — Sets up AWS account, IAM policies, Terraform Cloud workspace.  
- **Architect** — Designs repo structure, ensures staging/prod separation, defines standards.  
- **Network Engineers** — Build VPC, subnets, and SGs with Terraform.  
- **SysAdmin / Infra** — Provision EC2 (Jenkins, apps, monitoring), bootstrap with Ansible.  
- **Storage** — Manage S3 buckets, EBS volumes, and backup workflows.  
- **Monitoring** — Deploy Prometheus/Grafana (or Nagios), configure exporters & alerts.  
- **Developers** — Write app code, Dockerfiles, and unit tests.  
- **DevOps** — Create Jenkins pipelines, integrate GitHub & Docker Hub, manage staging → prod rollout.  
- **Scrum Master** — Manage Jira board, coordinate tasks, ensure team velocity.  

---

## 🔧 Tools You Will Use

- **AWS** — EC2, IAM, S3, VPC  
- **Terraform Cloud** — Infrastructure as Code (IaC)  
- **Ansible** — Configuration management  
- **Jenkins** — CI/CD orchestrator  
- **Docker + Docker Hub** — Containerization and registry  
- **Prometheus + Grafana / Nagios** — Monitoring and dashboards  
- **SQLite** — Lightweight DB for app  
- **GitHub** — Version control  
- **Jira** — Agile project tracking  

---

## 📅 Execution Plan (3-Day Intensive)

**Day 1 (4 hrs)**  
- Setup AWS account & Terraform Cloud workspace.  
- IAM roles/users created; team onboarded.  
- Provision networking (VPC, subnets, SGs).  
- Initialize GitHub repo with Terraform structure.  

**Day 2 (9 hrs)**  
- Provision EC2 hosts (Jenkins, staging app, prod app, monitoring).  
- Jenkins installed & configured (Ansible).  
- Developers build & dockerize app.  
- Jenkins credentials configured for Docker Hub.  
- First Jenkins build runs (build → push).  

**Day 3 (9 hrs)**  
- Extend pipelines: deploy to staging & production.  
- Deploy monitoring stack (Prometheus/Grafana or Nagios).  
- Configure alerts & dashboards.  
- Setup backup jobs (Jenkins → S3).  
- Conduct incident drill & finalize runbook.  
- Deliver final demo: app live in staging & production.  

---

## 📦 Deliverables

1. **GitHub Repo** containing:  
   - Terraform code (network, infra, Jenkins, monitoring).  
   - Ansible playbooks.  
   - Application code (frontend + backend + SQLite).  
   - Jenkinsfiles.  
   - Documentation (`architecture.md`, `runbook.md`, `README.md`).  

2. **Terraform Cloud Workspace** with remote state.  
3. **Working Jenkins Instance** with CI/CD pipelines.  
4. **Live App** in staging & production.  
5. **Monitoring Dashboard** (Grafana/Nagios).  
6. **Final Demo & Presentation**.  

---

## 📝 Evaluation Rubric

- **Infrastructure & IAM setup** — 20%  
- **Jenkins CI/CD pipelines** — 25%  
- **Application deployment (staging + prod)** — 20%  
- **Monitoring & backup/recovery** — 15%  
- **Team collaboration & documentation** — 20%  

---

## 📚 Labs — Table of Contents

```markdown
- [Lab 01: Pre-Requisites & Local Setup](lab01.md) — All Roles
- [Lab 02: GitHub Repo & Project Structure](lab02.md) — Architect
- [Lab 03: AWS IAM Setup](lab03.md) — IAM Engineer
- [Lab 04: Terraform Cloud Setup & Workspace](lab04.md) — IAM Engineer, Architect
- [Lab 05: Networking with Terraform (VPC, Subnets, SGs)](lab05.md) — Network Engineers
- [Lab 06: Provision Jenkins EC2 with Terraform](lab06.md) — SysAdmin / Infra
- [Lab 07: Bootstrap Jenkins with Ansible](lab07.md) — SysAdmin / Infra
- [Lab 08: Configure Jenkins Credentials](lab08.md) — SysAdmin / Infra, DevOps
- [Lab 09: Build Sample App & Dockerize](lab09.md) — Developers
- [Lab 10: Push Images to Docker Hub](lab10.md) — Developers, DevOps
- [Lab 11: Jenkins Pipeline Setup (CI)](lab11.md) — DevOps
- [Lab 12: Deploy to Staging (CD)](lab12.md) — DevOps
- [Lab 13: Deploy to Production (CD)](lab13.md) — DevOps
- [Lab 14: Monitoring Setup (Prometheus/Grafana or Nagios)](lab14.md) — Monitoring
- [Lab 15: Configure Alerts & Dashboards](lab15.md) — Monitoring
- [Lab 16: Backup & Restore Jenkins](lab16.md) — Storage, SysAdmin
- [Lab 17: Incident Drill & Runbook Validation](lab17.md) — All Roles
- [Lab 18: Final Demo & Presentation Prep](lab18.md) — All Roles
```

---

## ✅ Final Note

Think of yourself as an **engineer in a small DevOps company**.
Your team’s success depends on **collaboration, documentation, and working systems** — not just theory.
By the end, you’ll have **portfolio-ready, real-world DevOps experience**.

---



