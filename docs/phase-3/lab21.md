# Lab 21: Jenkins Pipeline for Local CI

!!! tip "Objective"
    By the end of this lab, you will be able to:
    - Create a Jenkins Pipeline for building, testing, and deploying a Dockerized app
    - Deploy the app locally using Docker via Jenkins

---

!!! info "Prerequisites"
    - Jenkins is up and running (from Lab 18)
    - Flask app is built (Lab 19)
    - Docker installed on the host machine (Lab 17)

---

## Step 1: Prepare GitHub Repository

### 1.1 Fork or clone the Flask app repository
```bash
git clone https://github.com/Sid-Trainings/flask-sample-webapp.git
cd flask-sample-webapp
```

### 1.2a Push it to your own GitHub repo

=== "Using SSH"
    ```bash
    git remote rename origin upstream
    git remote add origin git@github.com:<your_username>/flask-sample-webapp.git
    git add .
    git commit -m "added Dockerfile"
    git push -u origin main
    ```

=== "Using HTTP(S)"
    ```bash
    git remote rename origin upstream
    git remote add origin https://github.com/skarkhanis95/flask-sample-webapp.git
    git add .
    git commit -m "added Dockerfile"
    git push -u origin main
    ```


---

## Step 2: Configure GitHub Credentials in Jenkins

1. Go to **Manage Jenkins > Credentials**
2. Under **(global)**, click **Add Credentials**
3. Choose **Username and Password**
4. Add your GitHub username and **Personal Access Token (PAT)**
5. Save it with an ID like `github-creds`

---

## Step 3: Recreate Jenkins Container with Docker Access

If Jenkins is running inside Docker, stop and recreate the container with required permissions:

### 3.1 Stop and remove Jenkins
```bash
docker stop jenkins
docker rm jenkins
```

### 3.2 Run Jenkins as root and mount Docker socket
```bash
docker run -d \
  --name jenkins \
  -u root \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

### 3.3 Remove your local python app from Docker socket
```bash
docker ps
```

Note the Container ID or Container Name of your local python app. At this point you should have 2, one for Jenkins and one for your local Python Flask App

```bash
docker stop <your_flask_app_container_id_or_name>
docker rm <your_flask_app_container_id_or_name>
```

---

## Step 4: Install Docker CLI Inside Jenkins Container

### 4.1 Enter the container as root
```bash
docker exec -u 0 -it jenkins bash
```

### 4.2 Install Docker
```bash
apt update
apt install -y docker.io
```

### 4.3 Verify Docker is working
```bash
docker version
```
>This should show both Docker client and server info (the server comes from host)

Type `exit` to leave the container.

---

## Step 5: Create Jenkins Pipeline Job

1. Go to Jenkins Dashboard > **New Item**
2. Enter job name, select **Pipeline**, click OK
3. Scroll to **Pipeline section**
4. Choose **Pipeline script from SCM**
5. Select **Git**, and enter your GitHub repo URL
6. Use `github-creds` if prompted for credentials
7. Set the branch to `main`
8. Save the job

---

## Step 6: Add Jenkinsfile to GitHub Repo

In the root of your Flask repo, create a file named `Jenkinsfile`:

1. nano ```Jenkinsfile```
2. Copy the below code and paste into Nano editor

>Modify the file below to replace <your-github-username> with your actual GitHub username

```groovy
pipeline {
  agent any

  stages {
    stage('Clone Repository') {
      steps {
        git url: 'https://github.com/<your-github-username>/flask-sample-webapp.git', branch: 'main'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t flask-demo-app .'
      }
    }

    stage('Run Container') {
      steps {
        sh 'docker stop flask-container || true'
        sh 'docker rm flask-container || true'
        sh 'docker run -d --name flask-container -p 5000:5000 flask-demo-app'
      }
    }
  }
}
```

!!! warning "Replace your username"
    Replace `<your-github-username>` with your actual GitHub username.

3. Save and Exit the nano editor using **Ctrl+O** --> press **Enter** --> **Crtl+X**

### 6.1 Push Jenkinsfile to GitHub
```bash
git add Jenkinsfile
git commit -m "Add Jenkins pipeline"
git push origin main
```

---

## Step 7: Run Your Pipeline

1. Open Jenkins
2. Go to your pipeline job
3. Click **Build Now**
4. Monitor output in the **Console Output** tab

---

## Verification
- In your host browser, visit:
  ```
  http://<VM-IP>:5000
  ```
- You should see your Flask web app running via a container created by Jenkins

> 💡 Make sure your Flask app uses `app.run(host='0.0.0.0', port=5000)` to allow external access

---
