---
hide:
    - toc
---
# 🧑‍💻 Capstone Labs Guide — TechOps Inc.

This guide helps you navigate all Capstone labs with clarity.  
It shows **which role is responsible**, and **which labs can run in parallel** to optimize the 3-day schedule.  

---

## 📋 Labs Table

| Lab No. | Lab Name | Roles Responsible | Can Run in Parallel With |
|---------|----------|-------------------|--------------------------|
| [Lab 01](lab01.md) | Pre-Requisites & Local Setup | All Roles | — (must be first) |
| [Lab 02](lab02.md) | GitHub Repo & Project Structure | Architect | Lab 03 (IAM Setup) |
| [Lab 03](lab03.md) | AWS IAM Setup | IAM Engineer | Lab 02 (Repo Setup) |
| [Lab 04](lab04.md) | Terraform Cloud Setup & Workspace | IAM Engineer, Architect | After Lab 02 & 03 |
| [Lab 05](lab05.md) | Networking with Terraform (VPC, Subnets, SGs) | Network Engineers | — (infra dependency) |
| [Lab 06](lab06.md) | Provision Jenkins EC2 with Terraform | SysAdmin / Infra | Lab 09 (App Build) can start in parallel |
| [Lab 07](lab07.md) | Bootstrap Jenkins with Ansible | SysAdmin / Infra | Must follow Lab 06 |
| [Lab 08](lab08.md) | Configure Jenkins Credentials | SysAdmin / Infra, DevOps | Can overlap with Lab 09 |
| [Lab 09](lab09.md) | Build Sample App & Dockerize | Developers | Parallel to Lab 06/07 |
| [Lab 10](lab10.md) | Push Images to Docker Hub | Developers, DevOps | After Lab 09 |
| [Lab 11](lab11.md) | Jenkins Pipeline Setup (CI) | DevOps | Needs Lab 08 & 10 completed |
| [Lab 12](lab12.md) | Deploy to Staging (CD) | DevOps | Sequential after Lab 11 |
| [Lab 13](lab13.md) | Deploy to Production (CD) | DevOps | Sequential after Lab 12 |
| [Lab 14](lab14.md) | Monitoring Setup (Prometheus/Grafana or Nagios) | Monitoring | Can start after Lab 06 (infra ready) |
| [Lab 15](lab15.md) | Configure Alerts & Dashboards | Monitoring | After Lab 14 |
| [Lab 16](lab16.md) | Backup & Restore Jenkins | Storage, SysAdmin | Can run in parallel with Lab 14/15 |
| [Lab 17](lab17.md) | Incident Drill & Runbook Validation | All Roles | Final day (depends on 12, 15, 16) |
| [Lab 18](lab18.md) | Final Demo & Presentation Prep | All Roles | Last activity |

---

## ⚡ Parallelization Strategy

- **Day 1 (Setup):**  
  Labs 02 + 03 can run in parallel.  
  Labs 04 → 05 must follow sequentially.  

- **Day 2 (Build & Infra):**  
  Labs 06 (Jenkins EC2) and 09 (App build) can proceed in parallel.  
  Lab 07 (Jenkins Ansible) must wait for 06.  
  Lab 08 (Credentials) can overlap with app-related work (09 → 10).  

- **Day 3 (Integration & Monitoring):**  
  DevOps flows (11 → 12 → 13) are sequential.  
  Monitoring (14 → 15) can run parallel to deployments.  
  Backup (16) can run alongside monitoring tasks.  
  Incident Drill (17) only after deployments & monitoring.  

---

## ✅ Pro Tip
Use **Scrum-style coordination**:  
- Daily syncs (15 mins max).  
- Assign dependencies clearly.  
- Document everything in your repo as you go.  

---
