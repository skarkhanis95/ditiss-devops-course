# Tools & Setup Guide

This course relies on a mix of **open-source tools** and **cloud free tiers**.  
Follow this guide to prepare your workstation and accounts.

---

## Core Tools

- **Python 3 + venv** → for MkDocs & site builds  
- **Git & GitHub** → version control, submissions  
- **Slack** → team communication, ChatOps  
- **Taiga** → Agile project management (Scrum/Kanban boards)  

---

## Infrastructure & Virtualization

- **VirtualBox** (free) or **VMware Workstation Player** → VM hosting  
- **Ubuntu LTS ISO** → baseline Linux VM  
- **Windows ISO (optional)** → baseline Windows VM  
- **TrueNAS CORE** → NAS & SAN labs  

---

## Cloud

- **AWS Free Tier account** → EC2, S3, VPC labs  
- **MinIO** → local S3-compatible object storage  

---

## Containers & DevOps

- **Docker Desktop / Docker Engine**  
- **Minikube + kubectl** → local Kubernetes cluster  
- **Helm (optional)** → package manager for Kubernetes  
- **Jenkins** → CI/CD pipelines (or GitHub Actions alternative)  
- **Ansible** → configuration management, automation  
- **Terraform** → Infrastructure as Code for cloud provisioning  

---

## Monitoring & Logging

- **Prometheus** → metrics collection  
- **Grafana** → dashboards & visualizations  
- **ELK Stack (optional)** → logs aggregation  

---

## Security

- **AWS IAM** → users, roles, policies  
- **Vault (HashiCorp)** (optional) → secrets management  
- **OpenVAS or similar (optional)** → vulnerability scanning  

---

## Suggested Folder Structure (per team repo)
```
team-repo/
├── infra/ # VM configs, Terraform, Ansible playbooks
├── app/ # Sample app (containerized)
├── cicd/ # Jenkins pipelines, workflows
├── monitoring/ # Prometheus, Grafana configs
├── security/ # IAM policies, hardening scripts
└── docs/ # Lab notes, screenshots, diagrams
```

---

## Pre-course Checklist

- [ ] Install VirtualBox (or VMware Workstation)  
- [ ] Download Ubuntu LTS ISO  
- [ ] Create GitHub account  
- [ ] Create Slack account (invite link will be provided)  
- [ ] Create Taiga account (invite link will be provided)  
- [ ] Register AWS Free Tier account  
- [ ] Install Docker + Minikube + kubectl  