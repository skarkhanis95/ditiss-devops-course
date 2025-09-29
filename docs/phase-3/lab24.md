# Lab 24: Build, Push, and Orchestrate NGINX with Docker Swarm

## 🧠 Objective

By the end of this lab, you will be able to:

* Build a custom Docker image with NGINX and a custom homepage.
* Push the image to Docker Hub.
* Deploy and manage the image as a **Swarm service** on the Manager node.
* Scale replicas up and down, and update the service with a new version.

---

## 🔧 Prerequisites

* Docker Swarm initialized with **1 Manager** and **2 Workers** (from Lab 23).
* A **Docker Hub account**.
* Internet access from the Manager node.

---

## 🖥️ Step 1: Create a Project Folder on Manager Node

SSH into the **Manager node** (using PuTTY or Windows Terminal + SSH). Then run:

```bash
mkdir ~/nginx-lab
cd ~/nginx-lab
```

---

## 📝 Step 2: Create Custom `index.html`

Create a simple homepage file:

```bash
cat > index.html <<'EOF'
<!doctype html>
<html>
  <head><title>Lab 24 - NGINX v1</title></head>
  <body>
    <h1>Welcome to Lab 24!</h1>
    <p>This is Version 1 of our NGINX service running on Docker Swarm.</p>
  </body>
</html>
EOF
```

---

## ⚙️ Step 3: Create Dockerfile

```bash
cat > Dockerfile <<'EOF'
FROM nginx:stable-alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
EOF
```

---

## 🏗️ Step 4: Build Docker Image

Replace `yourhubuser` with your actual Docker Hub username:

```bash
docker build -t yourhubuser/lab24-nginx:v1 .
```

Verify the image:

```bash
docker images | grep lab24-nginx
```

---

## 🚀 Step 5: Push Image to Docker Hub

Login and push:

```bash
docker login
docker push yourhubuser/lab24-nginx:v1
```

Check on Docker Hub → you should see `lab24-nginx` repo with tag `v1`.

---

## 🌐 Step 6: Deploy Service on Docker Swarm

On Manager:

```bash
docker service create \
  --name lab24-service \
  --replicas 2 \
  --publish published=8080,target=80 \
  yourhubuser/lab24-nginx:v1
```

Check status:

```bash
docker service ls
docker service ps lab24-service
```

Test in browser:

```
http://<manager_public_ip>:8080
```

---

## 📈 Step 7: Scale Service

Scale up to 5 replicas:

```bash
docker service scale lab24-service=5
```

Check distribution:

```bash
docker service ps lab24-service
```

Scale down to 2 replicas:

```bash
docker service scale lab24-service=2
```

---

## 📝 Step 8: Update Homepage and Create v2 Image

Edit `index.html`:

```bash
cat > index.html <<'EOF'
<!doctype html>
<html>
  <head><title>Lab 24 - NGINX v2</title></head>
  <body>
    <h1>Welcome back to Lab 24!</h1>
    <p>This is Version 2, showing a rolling update in Docker Swarm.</p>
  </body>
</html>
EOF
```

Build & push new version:

```bash
docker build -t yourhubuser/lab24-nginx:v2 .
docker push yourhubuser/lab24-nginx:v2
```

---

## 🔄 Step 9: Rolling Update Service

Update service to new version:

```bash
docker service update --image yourhubuser/lab24-nginx:v2 lab24-service
```

Check update status:

```bash
docker service ps lab24-service
```

Refresh browser → you should now see **Version 2** homepage.

---

## 🧹 Step 10: Cleanup

```bash
docker service rm lab24-service
docker image rm yourhubuser/lab24-nginx:v1 yourhubuser/lab24-nginx:v2
```

---

## Terraform Clean up

!!! danger "IMPORTANT CLEAN UP AWS USING TERRAFORM"
    Complete the next lab to destroy all AWS resources to avoid cost on your credit cards

## Troubleshooting tips

* If you entered wrong `yourhubuser` during lab copy/paste then 
    * `docker service ls` *You’ll see your service (e.g., lab24-service) with replicas 0/2 or stuck in Pending state.*
    * `docker service rm lab24-service`
    * Verify: `docker service ls`


---

## 🔎 What You Learned

* How to build Docker images directly on the Manager node.
* How to push images to Docker Hub for use across the Swarm cluster.
* How to orchestrate services with scaling and rolling updates.

---

