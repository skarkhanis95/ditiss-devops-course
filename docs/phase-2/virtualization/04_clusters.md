---
hide:
    - toc
---
## Cluster Architecture

## What is it?
A **cluster** is a group of interconnected computers (called nodes) that operate together as if they were a single system.  
The goal of a cluster is to improve **availability, performance, and scalability** by combining the resources of multiple machines.

---

## Theoretical Definition
Cluster architecture is the design and arrangement of multiple nodes that share workloads to provide seamless services.  
Key idea: If one node fails, others in the cluster continue the work, ensuring **fault tolerance** and **high availability**.  

Clusters can be designed for:
- **Load Balancing**: Distributing requests across multiple nodes (e.g., web server farms).  
- **High Availability (HA)**: Ensuring uptime by having standby nodes ready to take over.  
- **High Performance (HPC)**: Using parallel computing across nodes for tasks like scientific research or big data.  

---

## Examples
- **Web Server Cluster**: Multiple servers host the same website. A load balancer distributes user requests across them. If one server fails, traffic goes to others.  
- **Hadoop Cluster**: Used in big data, it distributes data and computations across many machines.  
- **Database Cluster**: Ensures redundancy and faster read/write operations by replicating data across nodes.  

---

!!! tip "WOW Tip"
    Google’s early search engine ran on **clusters of inexpensive commodity hardware** instead of supercomputers.  
    This proved that clusters could deliver **world-class scalability at low cost**, shaping the future of cloud computing.  

---

# Cluster Requirements

## What is it?
For a cluster to function properly, it must meet certain **hardware, networking, and software requirements**.  
If these are not fulfilled, the cluster may suffer from performance bottlenecks or single points of failure.

---

## Theoretical Definition
A cluster requires the following components:  

1. **Nodes**  
   
    - The physical or virtual servers that form the cluster.  
    - Each should have adequate CPU, RAM, storage, and compatible operating systems.  

2. **Networking**  

    - High-speed communication is critical.  
    - Typically Gigabit Ethernet or **InfiniBand** for faster data transfer.  

3. **Shared Storage** 
 
     - Centralized storage (SAN, NAS, or distributed file systems like HDFS) ensures all nodes can access the same data.  
    - Redundancy (RAID, replication) is essential to prevent data loss.  

4. **Cluster Management Software**  

    - Software that monitors and coordinates the cluster.  
    - Examples: **Kubernetes** (containers), **Hadoop YARN** (big data), **Windows Server Failover Clustering**, **Red Hat Pacemaker** (Linux HA).  

---

## Examples
- A **database cluster** needs redundant storage and reliable networking to avoid downtime.  
- A **Kubernetes cluster** requires multiple master and worker nodes, with etcd for configuration and state management.  
- A **scientific HPC cluster** may require specialized interconnects like InfiniBand for parallel computing speed.  

---

!!! tip "WOW Tip"
    Modern **cloud-native clusters** (like Kubernetes) can **self-heal**: if one container or node fails, the cluster automatically restarts or reassigns workloads, often without human intervention.  

---
