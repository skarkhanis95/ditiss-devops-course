# IT Infrastructure & DevOps — PG‑DITISS Aug 2025

Welcome! This course blends **real-world infrastructure** and **DevOps practice** using a company simulation: **TechOps Inc.**  
You’ll guide six teams (10 students each) through designing, building, automating, and operating production-like systems.

!!! info "How to use this site"
    - Start with **[Session 0 · Agile & Tools](00-session-0/README.md)** to set up Slack, Taiga, and plan the first sprint.  
    - Then follow **Phase 1 → Phase 5** in order.  
    - Each session page includes: Objectives · Theory summary · Practical scenario · Lab guide · Checkpoints · Quiz · Deliverables · Rubric.

---

## What students will build (end-to-end)
- **On‑prem lab** with VMs, NAS and SAN storage
- **AWS environment** (EC2, S3/MinIO, VPC with public/private subnets)
- **Containerized app** (Docker) orchestrated on **Kubernetes/Minikube**
- **Infrastructure as Code** (Ansible/Terraform) for repeatable provisioning
- **CI/CD pipeline** (Jenkins or GitHub Actions) with automated builds & deploys
- **Monitoring & logging** (Prometheus + Grafana) with useful dashboards
- **Security & HA** (IAM, secrets, hardened configs, load balancing/auto-scaling)

---

## Course phases & syllabus mapping

| Phase | Sessions | Theme | Key Deliverables |
|------:|:--------:|-------|------------------|
| Phase 0 | 0 | Agile & Tools | Slack workspace, Taiga project, Sprint plan |
| Phase 1 | 6–9 | Infrastructure Foundations | VM baseline, DC design, NAS, SAN |
| Phase 2 | 10–13 | Virtualization & Cloud | VM cluster, EC2, S3/MinIO, VPC |
| Phase 3 | 14–17 | DevOps Foundations | DevOps roadmap, Dockerized app, K8s, IaC |
| Phase 4 | 18–20 | CI/CD & Monitoring | Jenkins/GitHub Actions, Prometheus+Grafana |
| Phase 5 | 21–23 | Security & HA | IAM/secrets, hardening, HA deployment, final demo |

> Full session list: see left navigation or jump to  
> **Phase 1** → [S6](phase-1/session-06.md) · [S7](phase-1/session-07.md) · [S8](phase-1/session-08.md) · [S9](phase-1/session-09.md)

---

## Tools & platforms (mandated)

- **Slack** — team communication & incidents (ChatOps)  
- **Taiga** — Agile board (Scrum/Kanban), backlog, sprints, reviews  
- **GitHub** — version control & submissions (PRs)  
- **VirtualBox/VMware**, **TrueNAS CORE**, **Docker**, **Minikube/Kubernetes**  
- **AWS Free Tier** (EC2, S3, VPC), **Jenkins**, **Ansible**, **Terraform**, **Prometheus/Grafana**

See **[Tools & Setup](resources/tools.md)** for install links and quick-start notes.

---

## Evaluation & checkpoints

- **Theory exam:** 40%  
- **Lab exam:** 40%  
- **Internal assessment:** 20% (Taiga activity, Slack discipline, documentation quality)

**Phase checkpoints** (graded):
1. **Infra Blueprint** (after S9) — VM baseline, DC layout, NAS/SAN
2. **Hybrid Infra** (after S13) — VM cluster + AWS VPC + object store
3. **CI/CD‑ready Infra** (after S17) — Docker + K8s + IaC
4. **Ops Dashboard** (after S20) — CI/CD + monitoring in place
5. **Final Demo** (S23) — integrated system + security + HA

---

## Class workflow (every week)

1. **Before class**: Read the session page; prep tools & accounts.  
2. **In class**: 2h theory → 2h/4h lab with team roles.  
3. **After class**: Push commits/notes to GitHub; move Taiga stories to *Done*; post a short Slack update.  
4. **End of phase**: Submit checkpoint (repo link + screenshots + short readme).

!!! tip "Daily team habits (recommended)"
    - Quick async stand‑up in Slack (yesterday/today/blockers)  
    - Keep Taiga board updated (no secret work)  
    - Small, frequent commits and short PRs

---

## Getting started (instructor checklist)

- [ ] **Publish** this site (GitHub Pages/Netlify/Vercel)  
- [ ] Create **Slack** workspace & channels (`#general`, `#announcements`, `#helpdesk`, per‑team channels)  
- [ ] Create **Taiga** projects (one per team) & preload epics/stories for S6–S9  
- [ ] Share **starter team repo template** on GitHub (folders for infra/app/docs)  
- [ ] Verify **lab images** (Ubuntu LTS ISO, TrueNAS ISO, Minikube, kubectl)  
- [ ] Post **Session 0 brief** in Slack with links to this site

---

## Course policies

!!! warning "Collaboration & academic integrity"
    Work as a team, but credit sources and document who did what. Copy‑paste without understanding will hurt your lab exam.

!!! info "Submissions"
    - Everything via **GitHub PRs** to your team repo  
    - Include a short **README** with steps, configs, screenshots where needed  
    - Link the PR to the **Taiga story** and mention it in your **Slack** update

---

## References

- Primary text: *Cloud Computing Black Book* (Wiley India, 2024) — Kogent Learning Solutions Inc., Kailash Jayaswal  
- Official docs: AWS, Docker, Kubernetes, Ansible, Terraform, Jenkins, Prometheus, Grafana  
- See **[References](resources/references.md)** for a curated list.

---

## Quick links

- Start here → **[Session 0 · Agile & Tools](00-session-0/README.md)**  
- Ready for infra? → **[Session 6](phase-1/session-06.md)**  
- Tools install → **[Tools & Setup](resources/tools.md)**  
- About the course → **[Overview](about/overview.md)**

