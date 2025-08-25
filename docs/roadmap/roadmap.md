---
hide:
    - toc
---
# Course Roadmap — IT Infrastructure & DevOps (PG-DITISS Aug 2025)

Welcome to the **Course Roadmap**. This page gives you a **high-level overview** of all sessions (0–23), showing what you’ll learn in each, before diving into the detailed session pages.

---

## Session 0 · Agile Foundations & Tools
- **What you’ll learn:** Agile principles, Scrum vs Kanban, Lean, and how Agile + DevOps fit together.  
- **Hands-on:** Set up Slack workspace, Taiga boards, team roles, and plan Sprint-1 backlog.

---

## Phase 1 · Infrastructure Foundations (Sessions 6–9)
**Theme:** *Building the digital workplace*  
You’ll explore physical and virtual infrastructure, storage, and data center basics.

- **Session 6:** IT Infrastructure Overview  
  Learn the core building blocks of IT infrastructure (compute, storage, networking, virtualization).  
- **Session 7:** Data Center Management  
  Understand racks, servers, power, cooling, and design a data center with constraints.  
- **Session 8:** Storage Technologies  
  Explore DAS, NAS, SAN, RAID, ZFS, and set up a network-attached storage (NAS).  
- **Session 9:** Storage Area Network (SAN)  
  Discover SAN concepts (iSCSI, Fibre Channel) and configure shared block storage.

✅ **Checkpoint 1:** Infra Blueprint — baseline VMs, DC layout, NAS + SAN setup.

---

## Phase 2 · Virtualization & Cloud (Sessions 10–13)
**Theme:** *Scaling the enterprise*  
Learn how enterprises use virtualization and cloud to grow.

- **Session 10:** Server Virtualization  
  Understand hypervisors, VM lifecycle, snapshots, and multi-VM clusters.  
- **Session 11:** Cloud Computing Basics  
  Explore cloud models (IaaS, PaaS, SaaS) and launch an AWS EC2 instance.  
- **Session 12:** Cloud Storage & Databases  
  Learn object storage (S3/MinIO), block storage, and DBaaS.  
- **Session 13:** Virtual Private Cloud (VPC)  
  Build secure VPCs with subnets, routing, and security groups.

✅ **Checkpoint 2:** Hybrid Infra — VM cluster + AWS VPC + storage/database integration.

---

## Phase 3 · DevOps Foundations (Sessions 14–17)
**Theme:** *From manual to automated*  
Shift from manual system admin tasks to automated, containerized workflows.

- **Session 14:** DevOps Principles  
  Learn DevOps culture, CI/CD, automation, and collaboration models.  
- **Session 15:** Containers (Docker)  
  Build and run containerized apps; compare containers vs VMs.  
- **Session 16:** Container Orchestration (Kubernetes)  
  Deploy multi-container apps with scaling and service discovery.  
- **Session 17:** Infrastructure Automation (Ansible/Terraform)  
  Use Infrastructure as Code to automate provisioning.

✅ **Checkpoint 3:** CI/CD-ready Infra — Dockerized app, Kubernetes deployment, automation scripts.

---

## Phase 4 · CI/CD & Monitoring (Sessions 18–20)
**Theme:** *Continuous everything*  
Learn how modern teams ship changes fast and safely, with observability.

- **Session 18:** CI/CD Pipelines  
  Build pipelines using Jenkins or GitHub Actions for automated builds/deploys.  
- **Session 19:** Monitoring & Logging  
  Collect metrics and logs using Prometheus and Grafana dashboards.  
- **Session 20:** Configuration Management  
  Standardize environments using Ansible, Chef, or Puppet.

✅ **Checkpoint 4:** Ops Dashboard — functional CI/CD + monitoring setup.

---

## Phase 5 · Security & Enterprise Readiness (Sessions 21–23)
**Theme:** *Running like a real enterprise*  
Ensure your infra is secure, reliable, and resilient.

- **Session 21:** Security in Cloud & DevOps  
  IAM, secrets management, vulnerability scanning, and secure configurations.  
- **Session 22:** High Availability & Fault Tolerance  
  Load balancing, redundancy, multi-AZ deployments.  
- **Session 23:** Final Integration & Demo  
  Integrate everything; teams present their full infra with CI/CD, monitoring, security, and HA.

✅ **Final Deliverable:** TechOps Inc. Company Portfolio — GitHub repo, infra demo, and presentation.

---

## Key Checkpoints & Milestones
- **Checkpoint 1:** Infra Blueprint (end of Session 9)  
- **Checkpoint 2:** Hybrid Infra (end of Session 13)  
- **Checkpoint 3:** CI/CD-ready Infra (end of Session 17)  
- **Checkpoint 4:** Ops Dashboard (end of Session 20)  
- **Final Demo:** Integrated system with security + HA (Session 23)

---

## Evaluation (aligned with syllabus)
- **Theory exam:** 40%  
- **Lab exam:** 40%  
- **Internal assessment:** 20% (Slack + Taiga activity, team contributions)

---

## TL;DR
You’ll start with **Agile + collaboration tools**, then build step-by-step:
1. On-prem infra (VMs, DC, storage)  
2. Hybrid cloud (AWS + virtualization)  
3. Containers & automation (DevOps basics)  
4. CI/CD + monitoring (delivery pipelines & observability)  
5. Security + HA → full enterprise-ready demo  

