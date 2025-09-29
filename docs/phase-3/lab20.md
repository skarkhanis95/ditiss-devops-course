# Lab 20: Push Docker Image to Docker Hub

!!! tip "Objective"
    By the end of this lab, you will be able to:

    - Tag and push a Docker image to Docker Hub
    - Verify the image on your Docker Hub profile

---

!!! info "Prerequisites"
    - Docker installed and image built (Lab 19)
    - Docker Hub account

---
## Docker Hub Account Creation
In your desktop go to following address:

- `https://hub.docker.com/`
- Click on `Sign Up`
- Select **Personal Tab**
- Enter your email address
- Put your desired Username
- Enter your password
- Click on `Sign Up`

## Step 1: Login to Docker Hub
```bash
docker login -u <your_username>
```
Enter your Docker Hub **username and password** when prompted.

---

## Step 2: Tag Your Docker Image
Replace `<your_dockerhub_username>` with your actual Docker Hub username:
```bash
docker tag flask-demo-app <your_dockerhub_username>/flask-demo-app:v1
```

Example:
```bash
docker tag flask-demo-app sidtrainings/flask-demo-app:v1
```

>***What are Docker Tags?*** Docker tags are used to assign a unique identifier to a Docker image, allowing you to manage and organize different versions of your images. Tags are essentially aliases for image IDs and can be used to specify versions, variants, or other distinguishing characteristics of an image.

>***Tagging an Image*** To tag an image in Docker, you can use the ```docker tag``` command. This command creates a new tag for an existing image, allowing you to reference the image by the new tag. The general syntax for the docker tag command is:
```
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

---

## Step 3: Push the Image to Docker Hub
```bash
docker push <your_dockerhub_username>/flask-demo-app:v1
```

---

## Step 4: Verify on Docker Hub
- Go to [https://hub.docker.com](https://hub.docker.com)
- Login to your account
- Navigate to **Repositories** and confirm your image `flask-demo-app:v1` is listed

---
## (OPTIONAL) Step 5: Pull and Run the Image from Docker Hub
Now that your image is on Docker Hub, you (or anyone) can use it anywhere Docker is installed.

🔽 To pull the image:
```
docker pull your-dockerhub-username/flask-demo-app:v1
```
Replace ```your-dockerhub-username``` with your actual Docker Hub username.

▶️ To run the container:
```
docker run -d -p 8081:5000 your-dockerhub-username/flask-demo-app:v1
```
Now, visit http://localhost:8081 (or VM-IP:8081 if running on a remote machine) to see your Flask app in action!

## 🚀 What’s Next?
In [Lab 21](../phase-3/lab21.md), you will write a Jenkins pipeline to automate image build and deployment.