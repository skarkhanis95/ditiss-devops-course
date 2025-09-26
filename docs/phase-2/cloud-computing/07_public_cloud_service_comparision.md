---
hide:
    - toc
---

# Different Names of Services Provided by Public Cloud Providers

!!! tip "Learning Goal"
    Understand that **all major cloud providers offer similar services**, but each uses different names.  
    This chapter helps students quickly map services between **AWS, Azure, and GCP**, so they don’t get confused when switching providers.

---

## 🔑 Why this matters
- When you move between providers (or read documentation), you’ll encounter **different terms** for the **same concept**.  
- Knowing this mapping makes it easier to learn once and apply everywhere.  
- Example: AWS **S3** = Azure **Blob Storage** = GCP **Cloud Storage** → all are **object storage services**.  

---

## 📊 Service Name Comparison Table

| Category               | AWS                        | Azure                        | GCP                          |
|-------------------------|----------------------------|------------------------------|------------------------------|
| **Compute (VMs)**       | EC2 (Elastic Compute Cloud) | Virtual Machines             | Compute Engine               |
| **Serverless Functions**| Lambda                    | Azure Functions              | Cloud Functions              |
| **Containers (K8s)**    | Elastic Kubernetes Service (EKS) | Azure Kubernetes Service (AKS) | Google Kubernetes Engine (GKE) |
| **Object Storage**      | S3 (Simple Storage Service) | Blob Storage                 | Cloud Storage                |
| **Block Storage**       | EBS (Elastic Block Store)  | Managed Disks                | Persistent Disk              |
| **File Storage**        | EFS (Elastic File System)  | Azure Files                  | Filestore                    |
| **Relational DB**       | RDS (Relational Database Service) | Azure SQL Database          | Cloud SQL                    |
| **NoSQL DB**            | DynamoDB                  | Cosmos DB                    | Firestore / Bigtable         |
| **Data Warehouse**      | Redshift                  | Synapse Analytics            | BigQuery                     |
| **Networking (VPC)**    | VPC                       | Virtual Network (VNet)       | VPC (same name)              |
| **Load Balancing**      | Elastic Load Balancer (ELB)| Azure Load Balancer / App Gateway | Cloud Load Balancing      |
| **DNS**                 | Route 53                  | Azure DNS                    | Cloud DNS                    |
| **CDN**                 | CloudFront                | Azure CDN                    | Cloud CDN                    |
| **Identity & Access**   | IAM (Identity & Access Mgmt) | Azure Active Directory (Azure AD) | IAM (same name)          |
| **Key Management**      | KMS                       | Key Vault                    | Cloud KMS                    |
| **Monitoring & Logging**| CloudWatch + CloudTrail   | Azure Monitor + Log Analytics| Cloud Monitoring + Logging   |
| **Serverless Messaging**| SQS/SNS/EventBridge       | Service Bus / Event Grid      | Pub/Sub                      |
| **Big Data / Analytics**| EMR (Elastic MapReduce)   | HDInsight / Synapse          | Dataproc / Dataflow          |
| **AI/ML**               | SageMaker                 | Azure Machine Learning        | Vertex AI                    |
| **Migration Tools**     | Database Migration Service (DMS) | Azure Migrate               | Migrate for Compute / Database Migration Service |
| **Cost Management**     | Cost Explorer             | Cost Management + Billing     | Billing Reports / Cost Tools |

---

## 🧭 Key Takeaway
- The **services are almost the same** — what changes is the **branding**.  
- If you know how to use one, learning the equivalent in another provider is much easier.  
- Focus on **concepts like compute, storage, networking, databases, identity, serverless**.  
