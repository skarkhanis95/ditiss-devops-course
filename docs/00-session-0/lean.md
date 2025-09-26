---
hide:
    - toc
---
## Lean

Lean focuses on **maximizing value while eliminating waste**.  
Originating in Toyota’s production system, it maps perfectly to IT and DevOps.

**Three enemies in Lean**

- **Muda (Waste)**: unnecessary work, delays, rework.
- **Mura (Unevenness)**: workload peaks/valleys causing churn.
- **Muri (Overburden)**: overloading people/systems.

**Five Lean Principles**

1. Specify value (from customer’s viewpoint).  
2. Map the value stream (all steps from request → delivery).  
3. Create flow (remove bottlenecks and stops).  
4. Establish pull (work only when demand exists).  
5. Seek perfection (continuous improvement).

**Common wastes in IT/DevOps**

- Waiting (e.g., PR sits 3 days unreviewed).  
- Rework (build breaks due to inconsistent environments).  
- Overprocessing (writing 30-page docs no one reads).  
- Overproduction (building features/scripts nobody uses).  
- Inventory/WIP (10 half-done tasks, nothing delivered).  
- Motion/context switching (jumping across 6 tools).  
- Unused talent (infra engineers excluded from design).

---

## Implementation of Lean (DevOps context)

1. **Define value** clearly (e.g., “a secure, ready-to-use VM by Friday”).
2. **Map the value stream** (all steps request → running system).
3. **Measure baseline** (lead time, cycle time, MTTR).
4. **Remove waste** (standard templates, automation, smaller batches).
5. **Introduce pull** (WIP limits, visualize queues).
6. **Make problems visible** (dashboards, blocked items).
7. **Continuous improvement** (small retrospectives after each delivery).

!!! example "Mini Case"
    Goal: Deliver a **sandbox VM** in 48 hours.  
    - Old: approval wait 2 days + manual provisioning → often rework.  
    - Lean: pre-approved hardened template + self-service request.  
    → Delivery in hours, fewer defects, happier devs.

---

## Lean and Agile in DevOps

- **Agile** = what to build next (short cycles, priorities).  
- **Lean** = how to deliver efficiently (cut waste, improve flow).  
- **DevOps** = culture + automation bridging Dev & Ops.

**Practical intersections**
- Agile sprints + Lean small batches → **CI/CD pipelines**.  
- Lean “reduce handoffs” + Agile “cross-functional teams” → fewer silos.  
- Limit WIP + short sprints → steadier throughput.  
- Retrospectives (Agile) + Kaizen (Lean) → continuous improvement.

**DevOps practices showing Lean + Agile**
- Small PRs + trunk-based development.  
- Automated testing & deployments.  
- Infrastructure as Code (standardization).  
- Feature flags (safe incremental releases).  
- Observability (metrics, logs, traces → faster recovery).  

!!! example "Real-world Outcome"
    A team moves from monthly deployments to **twice a week** by:  
    - Using Agile sprints (1 feature/week).  
    - Applying Lean (limit WIP, automate tests).  
    Result: smaller, safer deployments, faster recovery, less stress.

---

## Key Takeaways

- Agile = **deliver value in small increments, adapt quickly**.  
- Scrum = **structured sprints**, Kanban = **continuous flow**.  
- Lean = **maximize value, eliminate waste**.  
- Lean + Agile = **DevOps culture**, powered by automation and feedback.  

---