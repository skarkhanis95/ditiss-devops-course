---
hide:
    - toc
---
# Microservice Deployment

## 🧠 Objectives

By the end of this session, students will:

* Understand monolithic vs. microservices architecture.
* Learn how containers enable microservices.
* Explore deployment strategies like rolling updates, blue-green, canary.

---

## 📖 Monolith vs. Microservices

* **Monolithic app** = One big application, tightly coupled.
* **Microservices** = Multiple smaller services, loosely coupled, each responsible for one function.

**Example**:

* Monolith = single e-commerce app.
* Microservices = independent services (cart, payments, search, user auth).

---

## 🐳 Why Containers for Microservices?

* Encapsulate dependencies.
* Ensure consistency across environments.
* Easy scaling (scale only the service you need).

---

## 🚀 Deployment Strategies

* **Rolling Update**: Replace old pods with new gradually.
* **Blue-Green Deployment**: Run two environments (blue = current, green = new). Switch traffic once tested.
* **Canary Release**: Release to a small % of users first, then expand.

---

## ⚠️ Challenges in Microservices

* Service discovery: How do services find each other?
* Networking: Secure and efficient communication.
* Monitoring & Logging: Observability across multiple services.
* Data consistency: Distributed databases.

---

## 🔧 Tools for Microservices

* **Kubernetes** → Orchestration platform.
* **Istio/Linkerd (Service Meshes)** → Advanced routing, observability, security.
* **Prometheus + Grafana** → Monitoring.
* **Elastic Stack (ELK)** → Logging and search.

---

## 📊 Microservices Deployment Flow

```mermaid
flowchart LR
    A[Developer builds microservice] --> B[Container Image Built]
    B --> C[Push to Docker Hub]
    C --> D[Kubernetes Cluster]
    D --> E[Pods Running Microservice]
    E --> F[Service Mesh/Ingress]
    F --> G[End User Access]
```

---

## 🌍 Real-World Example

* **Netflix**:

    * Runs thousands of microservices for streaming, recommendations, payments.
    * Uses Kubernetes + custom orchestration.

* **Amazon**:

    * Each service (cart, payments, suggestions) runs as microservices.
    * Independent teams manage each service.

---
