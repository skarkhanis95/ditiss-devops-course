# Lab 18: Setting Up Jenkins using Docker

!!! info "Learning Objectives"
    By the end of this lab, you will be able to:

    * Set up a Jenkins server using Docker
    * Access Jenkins from the browser
    * Prepare Jenkins for CI/CD with plugins

---

!!! warning "Prerequisites"

    * Docker must be installed (from Lab 17)
    * Internet connection

> ⚠️ Note: Use the same CentOS/RHEL VM from Lab 17 where Docker is already installed. No need to create a new VM.

---

## Step 1: Pull Jenkins Docker Image

```bash
docker pull jenkins/jenkins:lts
```

> 💡 `lts` means Long-Term Support, a stable Jenkins version recommended for production.

---

## Step 2: Create a Docker Volume for Jenkins Data

```bash
docker volume create jenkins_home
```

> 💡 This ensures Jenkins data (plugins, jobs, users) persists even if the container is removed.

---

## Step 3: Run Jenkins Container

```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

* `-p 8080:8080`: Maps Jenkins web UI to port 8080.
* `-p 50000:50000`: Required for Jenkins agents (slaves).
* `-v jenkins_home:/var/jenkins_home`: Persists Jenkins data.
* `-v /var/run/docker.sock:/var/run/docker.sock`: Allows Jenkins to use Docker inside the container.

---

## Step 4: Access Jenkins in Browser

Open your browser and go to:

```
http://localhost:8080
```

If accessing from a host machine, first find the VM IP:

```bash
ip addr
```

Look under your active network interface (`eth0`, `ens33`, etc.) for the IP address.
Example: `http://192.168.1.100:8080`

---

## Step 5: Unlock Jenkins

Retrieve the initial admin password:

```bash
docker exec -it jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Copy this password and paste it into the Jenkins web prompt.

---

## Step 6: Install Suggested Plugins

* Choose **Install suggested plugins**
* Wait for installation to complete

> 💡 Jenkins plugins add features like GitHub integration, Docker pipelines, etc.

---

## Step 7: Create Admin User

Fill in the details:

* Username
* Password
* Full Name
* Email Address

Click **Save and Continue**.

---

## Step 8: Verify Jenkins is Ready

You should now see the **Jenkins Dashboard**. 🎉

---

## 🚀 What’s Next?

In the [Lab 19](../phase-3/lab19.md), you’ll:

* Connect Jenkins with GitHub
* Create your first Jenkins pipeline
* Run a CI/CD workflow for a sample application

---
