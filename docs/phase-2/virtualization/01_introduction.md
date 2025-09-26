---
hide:
    - toc
---
# Virtualization

## So What is Virtualization?
<!-- Google Slides -->
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTY3jSX9YmER9a08LKVjeoY2n8MB-mVxbUXCZy2Qnw2fCgI4xwyBIudMPSiQSB5U2dhBj-J3544nuOc/pubembed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

---

# Virtualization and Cluster Basics

---

## 1. Introduction of Virtualization

### What is it?
Virtualization is the process of creating a **virtual version of a physical resource** such as a server, operating system, storage device, or network. It allows multiple virtual environments to run on the same physical machine.

### Theoretical Definition
According to the *Cloud Computing Black Book (2024)*, virtualization is the technology that abstracts computing resources from the underlying hardware and makes them available as software-defined instances.  
For example, instead of running one operating system on one physical server, we can run multiple OS instances (called **virtual machines**) on the same hardware using a hypervisor.

### Example
- A single physical server in a data center can host multiple virtual machines, each running different operating systems (e.g., Windows, Linux).  

!!! info "WOW Tip"
    Virtualization is one of the key technologies that made **cloud computing possible**, because it enabled resource pooling and efficient hardware utilization.

---

## 2. Virtualization Types: Type 1 and Type 2

### What is it?
There are two main types of virtualization based on how the hypervisor interacts with hardware.

### Theoretical Definition
- **Type 1 Hypervisor (Bare-metal)**: Runs directly on the hardware without needing an operating system. It provides better performance and efficiency.  
- **Type 2 Hypervisor (Hosted)**: Runs on top of a host operating system, making it easier to set up but with slightly less performance.

### Example
- **Type 1**: VMware ESXi, Microsoft Hyper-V, Citrix XenServer  
- **Type 2**: Oracle VirtualBox, VMware Workstation  

### WOW Tip
Type 1 hypervisors are commonly used in **enterprise data centers** where performance and reliability are critical.

---



## 5. Cluster Architecture

### What is it?
A cluster is a group of interconnected computers (or nodes) that work together as a single system to provide high availability, performance, and scalability.

### Theoretical Definition
Cluster architecture distributes workloads across multiple nodes. If one node fails, others continue to provide services, ensuring reliability.

### Example
- A **web server cluster** can have multiple servers hosting the same website. If one fails, traffic is redirected to another server.  
- Hadoop clusters are used for big data processing.

### WOW Tip
Google built its early search engine on **clusters of commodity servers**, proving that clusters can outperform supercomputers at scale.

---

## 6. Cluster Requirements

### What is it?
For a cluster to work effectively, certain hardware, software, and network requirements must be met.

### Theoretical Definition
A cluster requires:  
- **Nodes** (servers with adequate CPU, memory, and storage)  
- **Networking** (high-speed interconnects like Gigabit or InfiniBand)  
- **Shared Storage** (SAN, NAS, or distributed file systems)  
- **Cluster Management Software** (e.g., Kubernetes, Hadoop YARN, or Windows Failover Clustering)  

### Example
- A database cluster may need **redundant storage** and a reliable network to avoid single points of failure.  

---
