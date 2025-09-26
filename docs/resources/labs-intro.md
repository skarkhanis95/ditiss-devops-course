# Labs Introduction — IT Infrastructure & DevOps

Welcome to the **lab environment** of this course.  

Labs are the **core of your learning journey**: theory builds concepts, but labs build **skills and confidence**.  

In this course, you will not just complete exercises — you will **act as employees in a simulated tech company** called **TechOps Inc.**  

You’ll work in **teams of 8~10 (your own mini-company)**, but every student is required to complete **all labs individually** to master the skills.

---

## 🎭 Scenario Narrative

You have been hired into **TechOps Inc.** as part of the **Platform & DevOps Division**.  
TechOps Inc. provides IT infrastructure, cloud, and DevOps solutions to clients.  

Your mission:  
- **Individually:** Build your skills by completing every lab yourself.  
- **As a company (team):** Integrate individual work into **checkpoint deliverables** and, eventually, a **final enterprise-ready environment**.  

Think of it like this:

- **Individual labs = employee training & proof-of-skill.**  
- **Team checkpoints = project milestones delivered to management.**  

---

## 🧑‍🤝‍🧑 Team Composition

Each team = one **subsidiary company** of TechOps Inc. (10 members each).  

Roles give **special focus** during integration, but every student must do **all labs individually**.  

**Suggested roles:**

- Project Lead (Scrum Master) — manages Taiga board, sprint planning.  
- Cloud Architect — AWS infra (VPC, EC2, storage).  
- System Administrator — VM setup, baseline OS, security hardening.  
- DevOps Engineers (2x) — CI/CD pipelines, IaC automation.  
- Developers (2x) — containerize apps, basic testing.  
- Security Engineer — IAM, secrets, compliance.  
- Monitoring Specialist — Prometheus, Grafana dashboards.  
- Storage/Network Engineer — NAS, SAN, networking integration.  

!!! note
    Everyone completes **all labs individually**.  
    Roles matter only when your company integrates deliverables at checkpoints.  

---

## 🛠️ Lab Workflow

**Preparation**:  

- Read the session guide before class.  
- Install or update tools (VirtualBox, Docker, AWS CLI, etc.).  
  

**Execution**  

- Follow the lab guide.  
- Document steps, configs, and troubleshooting.  

**Documentation**  

- Maintain an **individual lab notebook** (Markdown/Google Doc).  
- Capture objectives, steps, screenshots, outputs, and reflections.  

**Integration (Team)**  

- At checkpoints, the company integrates work into a **unified deliverable**.  
- Example: Everyone builds a SAN individually → team Storage/Network Engineer ensures the company SAN integrates across all VMs.  

---

## 📊 Checkpoints & Milestones

Labs are grouped into **phases**, with checkpoints at the end:

1. **Checkpoint 1 (Session 9)**: *Infra Blueprint* — baseline VMs, data center design, NAS, SAN.  
2. **Checkpoint 2 (Session 13)**: *Hybrid Infra* — VM cluster + AWS VPC + storage integration.  
3. **Checkpoint 3 (Session 17)**: *CI/CD-ready Infra* — Docker app + Kubernetes + IaC.  
4. **Checkpoint 4 (Session 20)**: *Ops Dashboard* — CI/CD + monitoring.  
5. **Final Demo (Session 23)**: *Enterprise-ready infra* — integrated, secure, and highly available.  

---

## 📝 Lab Notebook Example

**Session 6: IT Infrastructure Overview**  
- Objective: Create baseline Ubuntu VM with snapshot.  
- Steps:
  1. Download Ubuntu LTS ISO.  
  2. Create VM (2 vCPU, 4GB RAM, 40GB disk).  
  3. Installed updates + curl, git, ssh.  
  4. Created snapshot `baseline-v1`.  
- Output:
  - Screenshot of VirtualBox VM summary.  
  - Config file: `/etc/os-release`.  
- Reflection:
  - First attempt failed due to missing ISO → fixed by verifying checksum.  

---

## 🏆 Evaluation

- **Individual labs:** checked via notebooks, spot checks, and lab exam.  
- **Team checkpoints:** graded as deliverables, demoed in class.  
- **Final demo:** team integration of all skills.  

---

## ✅ Key Takeaways

- You are now employees of **TechOps Inc.**  
- You’ll work in **teams of 10 (subsidiary companies)**.  
- Every student must complete **every lab individually**.  
- Roles = focus during integration, not excuses to skip labs.  
- Labs build progressively toward **checkpoint milestones** and the **final demo**.  

