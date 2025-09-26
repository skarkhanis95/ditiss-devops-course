---
hide:
    - toc
---
# Migration of Physical Servers to Cloud

!!! info "Objectives"
    - What **physical-to-cloud migration** is and why organisations do it.  
    - Summarise common migration strategies and tools.  
    - Highlight main risks and mitigation approaches.  
    - Provide a compact planning checklist and validation criteria.

---

## What is physical → cloud migration?
Physical-to-cloud migration is the process of moving workloads that run on physical servers (bare-metal) or on-prem virtual machines into cloud environments (public or private). The goal may be cost reduction, scaling, improved reliability, disaster recovery, or modernization.

---

## Why organisations migrate physical servers to cloud
- **Operational cost reduction** — reduce datacenter CAPEX (power, space, hardware) and shift to OPEX.  
- **Elasticity & scaling** — on-demand compute and flexible sizing.  
- **Managed services** — replace self-managed components (DB, storage, monitoring) with managed cloud services.  
- **Business continuity & geographic reach** — easier multi-region deployment and DR capabilities.  
- **Faster provisioning & DevOps** — automation, CI/CD, and infrastructure-as-code support faster delivery.

---

## Common migration approaches (short)
1. **P2V (Physical to Virtual)**  
    - Convert physical disk to a virtual image (VMDK/OVA) and import to cloud VM. Good first step for legacy apps.
2. **Rehost (Lift-and-Shift)**  
    - Move application as-is to cloud VMs (minimal change). Fast, low-touch.
3. **Replatform**  
    - Make small changes (e.g., move database to managed RDS) to gain cloud benefits without full refactor.
4. **Refactor / Re-architect**  
    - Rebuild app to use cloud-native services (microservices, serverless). Higher payoff but higher effort.
5. **Agent-based continuous replication**  
    - Use migration agents to replicate disk/OS state continuously and cutover with minimal downtime (best for low-RTO).
6. **Hybrid / phased (wave)**  
    - Pilot → waves of similar workloads → full cutover; common at enterprise scale.

---

## Typical tools & services (examples)
- **VM Import/Export** — import VMDK/OVA into cloud as AMI/VM image.  
- **Agent-based migration services** (e.g., AWS Application Migration Service / MGN) — replicate, test, cutover.  
- **Database migration tools** (e.g., AWS DMS) — migrate databases with minimal downtime.  
- **Storage transfer** — rsync, DataSync, Storage Gateway, or physical devices (Snowball) for very large initial datasets.  
- **Configuration management & IaC** — Ansible, Packer, Terraform for environment build and image baking.

---

## Key risks & mitigations
- **Downtime & data loss**
    - Risk: inconsistent or long cutover windows.  
    - Mitigation: use continuous replication (agents), schedule maintenance windows, perform final delta sync and validation.
- **Compatibility & driver issues**
    - Risk: OS or hardware drivers on physical servers may not work in cloud images.  
    - Mitigation: test on small pilot VMs; use generic drivers; consider reinstallation of ephemeral drivers.
- **Licensing & compliance**
    - Risk: software licenses may not transfer or may incur extra cost.  
    - Mitigation: verify license portability and cloud licensing terms early.
- **Performance surprises**
    - Risk: wrong instance sizing leads to poor performance or cost blowouts.  
    - Mitigation: benchmark workloads; start with conservative sizes and right-size after monitoring.
- **Network & security differences**
    - Risk: IPs, firewall rules, IAM, and DNS differ in cloud.  
    - Mitigation: design VPC/subnet mapping, security groups, and IAM roles; update DNS and firewall rules in runbook.
- **Cost overruns**
    - Risk: unexpected egress, reserved instance misplanning, or persistent oversized instances.  
    - Mitigation: enable cost monitoring, tagging, and budget alerts; use spot/reserved sizing where appropriate.

---

## Practical planning checklist (concise)
1. **Discovery & inventory**
    - Identify OS, apps, dependencies, storage, IPs, backup windows, and RTO/RPO needs.
2. **Classify workloads**
    - Map criticality and pick migration approach per workload (rehost / replatform / refactor).
3. **Proof of Concept (PoC)**
    - Migrate one non-critical server and validate functionality and performance.
4. **Network & security design**
    - Design VPC layout, subnets, routing, NAT, and security groups; map firewall rules.
5. **Data transfer strategy**
    - Choose online replication, DataSync, or physical shipment for bulk data.
6. **Cutover plan & rollback**
    - Define final sync steps, DNS swap, verification checks, and rollback steps if validation fails.
7. **Testing & validation**
    - Functional tests, performance tests, security scans, and a runbook rehearsal (tabletop or partial drill).
8. **Automation & repeatability**
    - Use scripts/IaC for deployments, configuration management for post-migration state.
9. **Cost & license review**
    - Estimate ongoing costs, optimize instance types and storage classes, confirm license terms.
10. **Cleanup & optimization**
    - Post-migration, decommission on-prem resources and right-size cloud resources.

---

## Cutover & rollback essentials
- **Final sync**: stop writes or use delta replication to ensure consistent data.  
- **DNS & traffic switch**: plan TTLs and rollback DNS entries.  
- **Smoke tests**: scripted checks to validate service health post-cutover.  
- **Rollback triggers**: predefined failure criteria (e.g., >X% error rate) and procedures to revert traffic.

---

## Are organisations doing this at scale?
- Yes — many enterprises run multi-wave migration programs (hundreds to thousands of servers). Typical pattern:
    - Start with low-risk apps → migrate similar workloads in waves → automate and accelerate subsequent waves.  
    - Use professional services or migration tools for complex, high-criticality systems.  
    - Mature organisations move beyond lift-and-shift to replatform/refactor where business value justifies effort.

---

## Validation & success metrics (short)
- **Functional correctness** — app behaves as expected.  
- **Performance parity** — latency/throughput meets SLA.  
- **RTO/RPO met** — target recovery metrics satisfied.  
- **Cost target** — operating cost in cloud matches projected model.  
- **Security & compliance** — scans and audits pass.

---

## Short summary
Physical-to-cloud migration is a pragmatic blend of technical, process and business decisions. Pick the right migration pattern per workload, plan carefully (discovery, PoC, cutover), mitigate compatibility/licenses/cost risks, and validate through tests. For large-scale programs, automation, repeatable tooling and phased waves are essential to succeed without disrupting business.

