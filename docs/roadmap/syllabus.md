# Syllabus

## Phase 0 - Sessions & Labs

### Session 1: Agile
**Objectives**

- Understand the principles of Agile.
- Explore the Agile Manifesto and its 12 principles.
- Compare Agile with traditional (waterfall) methodologies.
  
**Topics**

- Origins and need for Agile.
- Agile Manifesto values.
- Benefits and challenges in adopting Agile.

---

### Session 2: Agile Methodologies
**Objectives**

  - Learn different Agile frameworks and practices.
  - Distinguish between Scrum, Kanban, and Extreme Programming (XP).
  - Understand where and how to apply each methodology.

**Topics**


  - Scrum roles, ceremonies, and artifacts.
  - Kanban principles and visual workflow.
  - XP practices (pair programming, TDD, continuous integration).
  - Agile at scale (SAFe, LeSS).

---

### Session 3: Lean in DevOps
**Objectives**

  - Connect Lean principles to Agile and DevOps practices.
  - Understand waste reduction and continuous improvement.
  - Apply Lean thinking to IT and software delivery.

**Topics**

  - The 5 Lean principles.
  - Eliminating waste in software processes.
  - Value stream mapping for DevOps pipelines.
  - Case studies: Lean transformation in IT.

---

### Session 4: Understanding Labs
**Objectives**

  - Familiarize with lab environment, tools, and submission workflow.
  - Learn how labs integrate into Agile and DevOps practices.

**Topics**

  - Lab submission via GitHub.
  - Lab evaluation process (peer + instructor review).
  - Setting up collaboration tools (Slack/Taiga).

---


### Lab 00: Environment Setup
**Goal**: Set up collaboration and task management tools.

**Tasks**

  - Join TechOps Inc. Slack workspace.
  - Set up Taiga board for Agile project management.
  - Create GitHub repo for lab submissions.
- **Expected Outcome**
  - Students onboarded with communication and project tracking tools.

---

### Lab 01: Agile Project Simulation
**Goal**: Simulate a Scrum sprint using Taiga.

**Tasks**

  - Define product backlog with at least 5 user stories.
  - Create sprint backlog and assign tasks.
  - Run a sprint planning session.
  - Conduct a daily standup (mock).
- **Expected Outcome**
  - Students experience Agile ceremonies and backlog management.

---

### Lab 02: Kanban Workflow
**Goal**: Implement a Kanban workflow.

**Tasks**

  - Set up Kanban board in Taiga.
  - Define WIP (Work In Progress) limits.
  - Track at least one feature from “To Do” → “In Progress” → “Done.”
- **Expected Outcome**
  - Students understand flow-based Agile execution and bottleneck visualization.

---

### Checkpoints & Quizzes
- **Checkpoint 1**: Submit GitHub repo link and Taiga board screenshot after Lab 00.
- **Quiz 1**: Multiple-choice on Agile Manifesto values and Lean principles.
- **Checkpoint 2**: Peer review of Lab 01 backlog and sprint plan.
- **Quiz 2**: Scenario-based questions on choosing Scrum vs Kanban.

---

## Phase 1 – Data Center Management

## Part A: Data Center Management

### Session 1: Overview
**Objectives**

  - Define the role and importance of data centers in IT infrastructure.
  - Understand types of data centers (enterprise, colocation, cloud).

**Topics**

  - What is a Data Center?
  - Evolution of data centers.
  - Core functions and services.

---

### Session 2: Data Center Architecture
**Objectives**

  - Learn the high-level architecture of a data center.
  - Identify tiers of components (compute, storage, networking).

**Topics**

  - Logical vs. physical design.
  - Standard reference architectures.
  - Redundancy and fault tolerance.

---

### Session 3: Physical Area
**Objectives**

  - Understand space requirements for servers, racks, and facilities.
  - Plan floor layouts for scalability and safety.

**Topics**

  - Rack layout and hot/cold aisles.
  - Raised floor vs slab floor.
  - Floor space utilization metrics.

---

### Session 4: Power
**Objectives**

  - Learn power distribution in data centers.
  - Identify redundancy strategies (UPS, generators).

**Topics**

  - Power Usage Effectiveness (PUE).
  - UPS systems, backup generators.
  - Dual power feeds and fault tolerance.

---

### Session 5: Cooling
**Objectives**

  - Explore cooling mechanisms and efficiency.
  - Design airflow for optimal performance.

**Topics**

  - CRAC units and liquid cooling.
  - Hot aisle/cold aisle containment.
  - Cooling efficiency metrics.

---

### Session 6: Networks
**Objectives**

  - Understand networking inside a data center.
  - Design connectivity and traffic flow.

**Topics**

  - LAN and SAN.
  - Top-of-rack vs. end-of-row switches.
  - Core, aggregation, and access layers.

---

### Session 7: Weight Considerations
**Objectives**

  - Learn about structural load constraints in data centers.
  - Plan safe rack and equipment placement.

**Topics**

  - Floor loading capacities.
  - Equipment weight distribution.

---

### Session 8: Geo-Location
**Objectives**

  - Evaluate site selection criteria for data centers.
  - Understand geographic, climatic, and risk factors.

**Topics**

  - Seismic zones, flood zones.
  - Connectivity to ISPs.
  - Proximity to users and compliance regulations.

---

### Session 9: Budget
**Objectives**

  - Understand CAPEX vs OPEX in data center design.
  - Balance cost with performance and redundancy.

**Topics**

  - Budgeting for facilities, equipment, staff.
  - ROI considerations.

---

### Session 10: Good Design
**Objectives**

  - Apply design best practices.
  - Evaluate trade-offs in design choices.

**Topics**

  - Modularity and scalability.
  - Efficiency vs redundancy.
  - Emerging design trends.

---

### Session 11: Classification & Ratings
**Objectives**

  - Learn about data center standards and tiers.
  - Classify data centers based on uptime and resilience.

**Topics**

  - Uptime Institute Tier I–IV.
  - ISO/IEC standards.
  - Energy Star and green data center metrics.

---

### Session 12: Knowledge Check
- **Format**: Quiz / checkpoint on Sessions 1–11.
- **Objective**: Reinforce understanding of architecture, power, cooling, and design principles.

---

## Part B: Infrastructure in a Data Center

### Session 13: Infrastructure Overview
**Objectives**

  - Identify key infrastructural elements inside a data center.

**Topics**

  - Compute, storage, and networking infrastructure.

---

### Session 14: Modular Cabling Design
**Objectives**

  - Understand structured cabling principles.

**Topics**

  - Cable management systems.
  - Fiber vs copper.
  - Scalability and modularity.

---

### Session 15: Points of Distribution
**Objectives**

  - Learn cabling distribution methods.

**Topics**

  - Main Distribution Area (MDA).
  - Horizontal and Vertical Distribution Areas.

---

### Session 16: ISP WAN Links
**Objectives**

  - Plan WAN connectivity for redundancy.

**Topics**

  - ISP diversity.
  - Bandwidth provisioning.
  - SLAs and peering.

---

### Session 17: Network Operations Center (NOC)
**Objectives**

  - Role of NOC in monitoring and management.

**Topics**

  - Incident management.
  - Performance monitoring.
  - 24x7 operations.

---

### Session 18: Physical & Logical Security + Cleaning
**Objectives**

  - Apply security best practices in data centers.

**Topics**

  - Physical access controls (biometrics, CCTV).
  - Logical access controls.
  - Facility maintenance and cleaning.

---

### Session 19: Reasons for Consolidation
**Objectives**

  - Understand drivers for data center consolidation.

**Topics**

  - Cost efficiency.
  - Energy savings.
  - Simplified management.

---

### Session 20: Consolidation Opportunities
**Objectives**

  - Explore real opportunities to consolidate infrastructure.

**Topics**

  - Virtualization.
  - Storage consolidation.
  - Cloud migration.

---

### Session 21: Data Center Servers
**Objectives**

  - Understand server roles and configurations.

**Topics**

  - Rack servers, blade servers.
  - High-density configurations.

---

### Session 22: Server Capacity Planning
**Objectives**

  - Forecast compute needs effectively.

**Topics**

  - CPU, memory, and storage planning.
  - Workload analysis.
  - Capacity planning tools.

---

### Session 23: Disaster Recovery
**Objectives**

  - Implement disaster recovery in data centers.

**Topics**

  - RPO and RTO.
  - Backup strategies.
  - DR sites and replication.

---

### Session 24: Data Center Security Guidelines
**Objectives**

  - Learn security frameworks and guidelines.

**Topics**

  - ISO 27001.
  - NIST Cybersecurity Framework.
  - Vendor security practices.

---

### Session 25: Internet Security Guidelines
**Objectives**

  - Address security for data center internet access.

**Topics**

  - Firewalls and IDS/IPS.
  - DDoS protection.
  - Zero trust.

---

### Session 26: Source Security Issues
**Objectives**

  - Identify common security issues in data centers.

**Topics**

  - Insider threats.
  - Malware and vulnerabilities.
  - Supply chain risks.

---

### Session 27: Best Practices in System Administration
**Objectives**

  - Apply administration best practices.

**Topics**

  - Patch management.
  - Backup/restore.
  - Documentation and change management.

---

### Session 28: System Administration Automation
**Objectives**

  - Automate routine system administration tasks.

**Topics**

  - Scripting basics.
  - Tools for automation (Ansible, Puppet, Chef).
  - Automation benefits and risks.

---

## Phase 2 – Virtualization & Cloud

## Part A: Virtualization

### Session 1: Overview
**Objectives**

  - Understand the role of virtualization in IT infrastructure.
  - Learn how virtualization underpins cloud computing.

**Topics**

  - Definition and benefits of virtualization.
  - Types: server, storage, network, desktop virtualization.

---

### Session 2: Introduction to Virtualization
**Objectives**

  - Explore historical context and evolution of virtualization.

**Topics**

  - From mainframes to hypervisors.
  - Virtualization use cases in enterprises.

---

### Session 3: Virtualization Concepts
**Objectives**

  - Master key technical concepts of virtualization.

**Topics**

  - Hypervisors: Type 1 vs Type 2.
  - VM lifecycle and snapshots.
  - Resource sharing and overhead.

---

### Session 4: OS Virtualization
**Objectives**

  - Learn how OS-level virtualization differs from hardware virtualization.

**Topics**

  - Containers vs VMs.
  - Namespace and cgroups.
  - Use cases: Docker, LXC.

---

### Session 5: Virtual Clusters
**Objectives**

  - Understand virtualization in clustered environments.

**Topics**

  - High availability clusters.
  - Load balancing.
  - Resource pooling.

---

### Lab 03: Install and Configure VirtualBox
**Goal**: Set up VirtualBox on host system.

**Tasks**

  - Install VirtualBox.
  - Create a Linux VM.
  - Test VM networking.
- **Expected Outcome**
  - Working VM ready for labs.

---

### Lab 04: Deploy Multiple VMs
**Goal**: Practice managing multiple virtual machines.

**Tasks**

  - Deploy 2+ VMs.
  - Configure networking between them.
- **Expected Outcome**
  - Students can simulate cluster basics.

---

## Part B: Storage Area Network (SAN)

### Session 6: SAN Overview
**Objectives**

  - Understand what SAN is and why it is used.

**Topics**

  - SAN vs NAS vs DAS.
  - Enterprise storage challenges.

---

### Session 7: SAN High Availability
**Objectives**

  - Explore redundancy and failover in SAN.

**Topics**

  - Multipathing.
  - Failover clustering.
  - RAID levels.

---

### Session 8: SAN Components
**Objectives**

  - Identify SAN hardware and software components.

**Topics**

  - HBAs, switches, storage arrays.
  - Fibre Channel, iSCSI protocols.

---

### Labs 05–09: SAN Hands-On
- **Lab 05**: Configure FreeNAS storage.  
- **Lab 06**: Connect host to SAN using iSCSI.  
- **Lab 07**: Configure multipath and redundancy.  
- **Lab 08**: Test high availability failover.  
- **Lab 09**: Benchmark SAN performance.  

**Expected Outcome**: Students gain practical SAN setup and troubleshooting experience.

---

## Part C: Cloud Computing

### Session 9: Introduction to Cloud Computing
**Objectives**

  - Define cloud computing models and services.

**Topics**

  - NIST definition of cloud.
  - Service models: IaaS, PaaS, SaaS.
  - Deployment models: Public, Private, Hybrid.

---

### Session 10: Hyper-Converged Infrastructure (HCI)
**Objectives**

  - Learn how compute, storage, and networking converge in HCI.

**Topics**

  - HCI vs traditional data centers.
  - Benefits and challenges.

---

### Session 11: OpenStack
**Objectives**

  - Explore OpenStack as an open-source cloud platform.

**Topics**

  - Keystone, Nova, Glance, Swift, Neutron.
  - OpenStack architecture and use cases.

---

### Session 12: Software-Defined Networking (SDN)
**Objectives**

  - Understand SDN concepts in cloud environments.

**Topics**

  - Control plane vs data plane.
  - OpenFlow and network programmability.

---

### Lab 10: Deploy OpenStack with DevStack
**Goal**: Set up OpenStack on a VM.

**Tasks**

  - Install DevStack.
  - Configure Keystone and Nova.
  - Launch a VM instance.
- **Expected Outcome**
  - Students get exposure to cloud platform deployment.

---

### Session 13: Public Cloud Overview
**Objectives**

  - Explore major public cloud providers.

**Topics**

  - AWS, Azure, GCP basics.
  - Regional availability.

---

### Session 14: Services of Public Cloud
**Objectives**

  - Understand common cloud services.

**Topics**

  - Compute (EC2, VM), Storage (S3, Blob).
  - Networking, Databases.

---

### Session 15: Cloud Services Comparison
**Objectives**

  - Compare offerings across AWS, Azure, GCP.

**Topics**

  - Pricing.
  - Feature availability.
  - Strengths and limitations.

---

### Lab 11: Launch Instances in AWS Free Tier
**Goal**: Work with public cloud services.

**Tasks**

  - Create AWS Free Tier account.
  - Launch and connect to EC2.
- **Expected Outcome**
  - Students gain first exposure to cloud workloads.

---

### Session 16: Cloud API & SDK
**Objectives**

  - Learn programmatic access to cloud.

**Topics**

  - AWS SDK, Azure CLI, GCP SDK.
  - REST APIs and automation.

---

### Session 17: Cloud Migration & Disaster Recovery
**Objectives**

  - Understand cloud migration strategies.

**Topics**

  - Lift and shift vs re-architect.
  - Cloud-based DR solutions.

---

### Session 18: Configuration Management in Cloud
**Objectives**

  - Explore tools for managing cloud infra.

**Topics**

  - Ansible, Terraform, CloudFormation.
  - Infrastructure as Code.

---

### Session 19: Cloud Migration Deep Dive
**Objectives**

  - Execute migration planning and steps.

**Topics**

  - Assessment tools.
  - Data transfer methods.

---

### Labs 12–13: Cloud Migration Practice
- **Lab 12**: Simulate lift-and-shift migration.  
- **Lab 13**: Set up backup and restore for DR.  

---

### Session 20: Cloud Logging & Monitoring
**Objectives**

  - Monitor cloud resources effectively.

**Topics**

  - CloudWatch, Azure Monitor, GCP Stackdriver.
  - Logging and alerting.

---

### Labs 14–15: Cloud Monitoring
- **Lab 14**: Configure CloudWatch alarms.  
- **Lab 15**: Create monitoring dashboards.  

**Expected Outcome**: Students gain cloud operations and monitoring skills.

---

## Phase 3 – DevOps

## Part A: DevOps Foundations

### Session 1: DevOps Foundations
**Objectives**

  - Understand the principles and culture of DevOps.
  - Connect DevOps to Agile and Lean practices.

**Topics**

  - DevOps definition and goals.
  - Key benefits: faster delivery, collaboration, automation.
  - DevOps lifecycle stages (Plan → Code → Build → Test → Release → Deploy → Operate → Monitor).

---

### Session 2: DevOps Basic Tools
**Objectives**

  - Explore tools that form the DevOps ecosystem.
  - Learn categories: version control, CI/CD, monitoring, automation.

**Topics**

  - Git & GitHub.
  - Jenkins, Docker, Kubernetes.
  - Ansible, Terraform, Prometheus, Nagios.

---

### Labs 16–21: DevOps Foundations Tools
- **Lab 16**: Git Basics – Create repo, push/pull, branching.  
- **Lab 17**: GitHub Collaboration – Forking, pull requests, issues.  
- **Lab 18**: Jenkins Setup – Install and run a sample pipeline.  
- **Lab 19**: Docker Basics – Build and run containers.  
- **Lab 20**: Docker Compose – Multi-container application.  
- **Lab 21**: Kubernetes (Minikube) – Deploy containerized application.  

**Expected Outcome**: Students gain practical experience with the DevOps toolchain.

---

## Part B: Infrastructure as Code (IaC)

### Session 3: Infrastructure as Code
**Objectives**

  - Understand why IaC is critical for DevOps.
  - Compare declarative vs imperative approaches.

**Topics**

  - IaC benefits: consistency, speed, scalability.
  - Popular IaC tools.

---

### Session 4: Terraform
**Objectives**

  - Learn how to define and deploy infrastructure with Terraform.

**Topics**

  - Providers, resources, and state files.
  - Terraform workflow: init, plan, apply, destroy.
  - Modules and reusability.

---

### Labs 22–23: Terraform
- **Lab 22 (Optional)**: Install Terraform and explore CLI.  
- **Lab 22**: Deploy EC2 instance with Terraform (AWS Free Tier).  
- **Lab 23**: Manage multiple resources with Terraform (VPC, subnets, EC2).  

**Expected Outcome**: Students can provision cloud infrastructure declaratively.

---

## Part C: Container Orchestration & Microservices

### Session 5: Container Orchestration
**Objectives**

  - Explore orchestration tools and concepts.

**Topics**

  - Kubernetes architecture.
  - Pods, services, deployments.
  - Scaling and rolling updates.

---

### Session 6: Microservices Deployment
**Objectives**

  - Deploy microservices in containerized environments.

**Topics**

  - Microservices vs monoliths.
  - Deployment pipelines for microservices.
  - Service discovery and load balancing.

---

### Labs 24–25: Containers & Microservices
- **Lab 24**: Build custom Docker image for Nginx app and push to Docker Hub.  
- **Lab 25**: Deploy multi-service application on Kubernetes (Minikube).  

**Expected Outcome**: Students understand end-to-end container orchestration for microservices.

---

## Part D: Configuration Management with Ansible

### Session 7: Ansible
**Objectives**

  - Automate server configuration and application deployment.

**Topics**

  - Ansible architecture and inventory.
  - Playbooks and roles.
  - Common modules.

---

### Labs 26–27: Ansible
- **Lab 26**: Install Ansible and configure SSH for target nodes.  
- **Lab 27**: Write playbooks to install and start web servers (Apache/Nginx).  

**Expected Outcome**: Students automate infrastructure tasks with Ansible.

---
