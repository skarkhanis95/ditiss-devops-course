# Session 6 — IT Infrastructure Overview

!!! info "Session format"
    **2h theory + 2h lab** · Team size: 10 (TechOps Inc. simulation) · Tools: VirtualBox/VMware, Slack, Taiga, GitHub

## Objectives
- Map components of IT infrastructure (compute, network, storage, virtualization).
- Prepare a base VM image for all future labs.
- Document decisions on OS baseline, package strategy, and snapshots.

## Theory Summary
- *Concise 500–800 words here, aligned to syllabus & Cloud Computing Black Book (add page refs).*

## Practical Application (TechOps Inc.)
- **Scenario:** Your company must standardize developer workstations and lab VMs.
- **Task:** Create a baseline Linux VM (Ubuntu LTS) and a Windows VM with snapshots.

## Lab Guide
=== "Linux VM"
    1. Download Ubuntu LTS ISO.
    2. Create VM (2 vCPU, 4GB RAM, 40GB disk).
    3. Post-install: `curl`, `git`, `docker` (optional), SSH, updates.
    4. Snapshot: `baseline-v1`.

=== "Windows VM"
    Steps, drivers, WinRM/PowerShell remoting, snapshot.

## Checkpoints
- [ ] VM boots cleanly and updates applied  
- [ ] Snapshot created and named correctly  
- [ ] README with credentials and IPs committed to GitHub

## Quiz (quick check)
??? question "Which layer provides block-level storage to servers?"
    - [ ] NAS
    - [x] SAN
    - [ ] CDN
    - [ ] Object Storage

## Deliverables
- `infra/VM-baseline/README.md` in your team repo.
- Screenshot(s) of snapshots in Taiga story.

## Rubric (10 pts)
- Functionality (4), Documentation (3), Reproducibility (2), Cleanliness (1)

## Diagram
```mermaid
flowchart LR
  Dev[Developers] -->|Access| VM[(Baseline VM)]
  VM -->|Snapshots| Repo[(GitHub Docs)]