# Lab 19: Clone and Containerize Flask Web App

!!! tip "Objective"
    By the end of this lab, you will be able to:
    - Clone a Flask app from GitHub
    - Understand the app’s folder structure
    - Add a Dockerfile
    - Build and run the Flask app as a container

---

!!! info "Prerequisites"
    - Docker installed (Lab 17)
    - Git configured (Lab 18)

---

## Step 1: Clone the Flask Web App Repo

### 1.1 Navigate to workspace directory
```bash
cd ~
mkdir devops-labs && cd devops-labs
```

### 1.2 Clone the Repository
```bash
git clone https://github.com/Sid-Trainings/flask-sample-webapp.git
cd flask-sample-webapp
```

---

## Step 2: Review App Structure

You should see:
```
-README.md
-app.py
-app.yaml
-app_test.py
-requirements-test.txt
-requirements.txt
-templates/
  -index.html
```

- `app.py`: Main Flask app entry point
- `requirements.txt`: Python dependencies
- `templates/index.html`: The HTML5 Bootstrap page

---

## Step 3: Create Dockerfile

### 3.1 Create File
```bash
nano Dockerfile
```

### 3.2 Paste Below Content
```Dockerfile
# Use Python base image
FROM python:3.9-slim

# Set work directory
WORKDIR /app

# Copy files
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
```

**Save and exit**.

>Press **Crtl+O** --> **Enter** and **Crtl+X** to save the file in nano editor

---

## Step 4: Build Docker Image
```bash
docker build -t flask-demo-app .
```

---

## Step 5: Run Flask App Container
```bash
docker run -d -p 5000:5000 flask-demo-app
```

Access the app in browser:
```
http://localhost:5000
```

---

## ✅ Verification
If the app loads with your styled HTML page and sections (Welcome, Docker Ready, etc.), you’ve successfully containerized and deployed it locally.

---

## 🚀 What’s Next?
In [Lab 20](../phase-3/lab20.md), you'll push this Docker image to Docker Hub.