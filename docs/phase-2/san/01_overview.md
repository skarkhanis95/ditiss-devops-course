---
hide:
    - toc
---
# Storage Area Network (SAN) and Related Concepts

---
## What is SAN?

### What is it?
A **Storage Area Network (SAN)** is a specialized, high-speed network that connects servers (often called **hosts**) to a centralized pool of storage devices.  
Unlike traditional setups where each server has its own directly attached storage (DAS – Direct Attached Storage), a SAN allows multiple servers to **share the same storage resources** over a dedicated network.

Think of SAN as creating a **separate highway for storage traffic** — independent of your normal LAN (Local Area Network) used for emails, web browsing, and applications. This ensures fast, reliable, and scalable access to data.

---

### Theoretical Definition
A SAN is a **dedicated, block-level storage network** that uses specialized protocols (such as Fibre Channel, iSCSI, or FCoE) to allow servers to access disks across the network as if they were **locally attached hard drives**.  

Key points in its definition:  
- **Dedicated network**: SAN traffic is kept separate from standard LAN traffic to prevent congestion.  
- **Block-level access**: Unlike file storage (NAS), SAN provides raw storage blocks, which servers can format and use as if they were physical disks.  
- **Scalability**: New storage arrays or servers can be added without major disruption.  
- **Flexibility**: Different servers (Windows, Linux, VMware hosts, etc.) can all use the same storage pool.  

---

### Why SANs Are Needed
1. **Centralized Storage Management**  
   Instead of managing disks inside each server, admins manage one large pool of storage.  

2. **Scalability**  
   As applications grow, you can add more storage devices to the SAN without changing servers.  

3. **Performance**  
   SANs use **high-speed networking (16–128 Gbps in Fibre Channel)** or optimized Ethernet (10/25/40/100 Gbps in iSCSI/FCoE).  

4. **High Availability**  
   SANs are built with redundancy (dual controllers, multiple network paths, RAID) to ensure zero downtime.  

---

### Real-World Example
Imagine a **bank’s data center**:  
- Hundreds of servers handle ATM transactions, online banking, and customer databases.  
- Instead of each server having its own disks, the bank uses a SAN.  
- All servers connect to a **shared storage pool** that is reliable, fast, and secure.  
- If one server fails, another can immediately take over and access the same data through the SAN.  

---

### Types of SAN (Overview)
- **Fibre Channel SAN (FC-SAN):** Uses Fibre Channel switches and HBAs; offers very high speed and reliability.  
- **iSCSI SAN:** Runs on standard Ethernet networks; more cost-effective, good for small/medium businesses.  
- **Fibre Channel over Ethernet (FCoE):** Combines Fibre Channel frames over Ethernet networks, reducing infrastructure needs.  

---

!!! tip "WOW Tip"
    SANs became popular in the late 1990s because they allowed organizations to **separate compute and storage**. This separation is the foundation of modern cloud and hyper-converged infrastructures.

---

### DAS vs NAS vs SAN

| Feature              | DAS (Direct Attached Storage)          | NAS (Network Attached Storage)                | SAN (Storage Area Network)                   |
|----------------------|----------------------------------------|-----------------------------------------------|----------------------------------------------|
| **Definition**       | Storage directly attached to a single server | File-level storage accessed over LAN           | Block-level storage accessed over a dedicated network |
| **Access Method**    | Server sees storage as local disks     | Clients access files via protocols (NFS, SMB) | Servers access raw blocks via FC, iSCSI, FCoE |
| **Network Used**     | No network (local bus, e.g., SATA/SAS) | LAN (Ethernet)                                | Dedicated storage network (Fibre Channel or IP-based) |
| **Performance**      | High (limited to one server)           | Moderate (depends on LAN traffic)             | Very high (dedicated high-speed network)      |
| **Scalability**      | Limited to server capacity             | Easy to scale by adding NAS devices           | Highly scalable with storage arrays and switches |
| **Data Sharing**     | Not shared (local to one server)       | Shared at file level                          | Shared at block level across multiple servers |
| **Use Cases**        | Personal PCs, small servers            | File sharing, backups, media servers          | Datacenters, virtualization, databases, enterprise apps |
| **Example**          | Internal hard drives, external HDDs    | Synology/QNAP NAS devices                     | EMC, NetApp, Dell, HP SAN solutions           |

---

### Understanding SAN

<iframe width="560" height="315" src="https://www.youtube.com/embed/3yZDDr0JKVc?si=f2OMRl19CoT8CUh4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## SAN Expanded

### Types of SAN
1. **Fibre Channel SAN**  
   
    - Uses Fibre Channel switches and host bus adapters (HBAs).  
    - High-speed (16–128 Gbps).  
    - Traditionally the most common in enterprise data centers.  

2. **iSCSI SAN**  
   
    - Uses IP networks (Ethernet) to send SCSI commands.  
    - More cost-effective than Fibre Channel.  
    - Easier to set up for small and medium businesses.  

3. **Fibre Channel over Ethernet (FCoE)**  
   
    - Combines Fibre Channel traffic over Ethernet.  
    - Reduces the need for separate cabling.  

### Advantages of SAN

- High performance and reliability.  
- Centralized storage management.  
- Scalability (easy to add more storage).  
- Supports **High Availability** through redundancy.  

---
