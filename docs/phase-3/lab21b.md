# Lab 21(B) LAB: Deploy a Dockerized Application to AWS App Runner using GitHub Actions and ECR

---

## 🎯 **Learning Objectives**

By the end of this lab, students will:

1. Create an **ECR repository** to host container images.
2. Deploy an app on **AWS App Runner** from ECR.
3. Configure **GitHub Actions CI/CD** to auto-build and push images to ECR.
4. Enable **Auto Deployments** in App Runner for seamless updates.

---

## 🧰 **Pre-Requisites**

* ✅ AWS Account (free tier or student credits)
* ✅ GitHub Account
* ✅ Dockerfile & working app in GitHub repo
* ✅ Basic understanding of Docker

---

## 📋 **Lab Architecture**

```
GitHub Repo → GitHub Actions → Amazon ECR → AWS App Runner → Public URL
```

---

## 🪜 **Step-by-Step Guide**

---

### **Step 1: Verify your GitHub Repo**

1. Ensure your app runs locally:

   ```bash
   docker build -t flask-demo-app .
   docker run -p 5000:5000 flask-demo-app
   ```
2. Confirm you can access it at:
   👉 `http://localhost:5000`

✅ If that works, you’re ready for deployment.

---

### **Step 2: Create an ECR Repository in AWS**

1. Login to AWS Console → Search **ECR (Elastic Container Registry)**
2. Click **Create Repository**

   * Name: `flask-demo-app`
   * Visibility: **Private**
   * Leave other options default
   * Click **Create Repository**

Take note of:

```
Repository URI = <aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com/flask-demo-app
```

---

### **Step 3: Create an IAM Role for GitHub Actions (OIDC)**

We’ll allow GitHub to authenticate **securely without storing AWS keys**.

#### 3.1 Create OIDC Identity Provider

In AWS Console:

* Go to **IAM → Identity Providers → Add Provider**

  * Provider type: `OpenID Connect`
  * Provider URL: `https://token.actions.githubusercontent.com`
  * Audience: `sts.amazonaws.com`

✅ Done.

#### 3.2 Create Role for GitHub

You’ll create a role that GitHub Actions can assume via OIDC, scoped to your repo, and with ECR push permissions.

**A) Start role creation**

1. AWS Console → **IAM** → **Roles** → **Create role**
2. **Trusted entity type:** **Web identity**
3. **Identity provider:** `token.actions.githubusercontent.com`
4. **Audience:** `sts.amazonaws.com`
5. **GitHub organization:** enter your GitHub **username or org name**

   * Example: `sid-karkhanis3115`
6. **Repository filter (optional but recommended):** enter your repo name

   * Example: `flask-sample-webapp`
     This auto-generates the trust condition equivalent to
     `repo:sid-karkhanis3115/flask-sample-webapp:*`
7. Click **Next**

**B) Attach permission policies (pick from the list)**

On the **Add permissions** page, select one of the following:

* **Recommended Policy:**

    * **AmazonEC2ContainerRegistryPowerUser**
    (lets the workflow log in to ECR, create repo if missing, and push images)

Click **Next**.

**C) Name & create**

* **Role name:** `github-actions-ecr`
* (Optional) Description: “OIDC role for GitHub Actions to push to ECR”
* Click **Create role**.

**D) Copy the Role ARN (you’ll need it in GitHub Actions)**

Open the role you just created and copy the **Role ARN**, e.g.:

```
arn:aws:iam::123456789012:role/github-actions-ecr
```


---

### **Step 4: Create the GitHub Actions Workflow**

In your repo, create this file:
📁 `.github/workflows/deploy.yml`

```yaml
name: Build & Push to ECR

on:
  push:
    branches: [ main ]

env:
  AWS_REGION: ap-south-1
  ECR_REPO: flask-demo-app

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-ecr
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push image
        run: |
          IMAGE_TAG="${GITHUB_SHA::7}"
          ECR_URI="${{ steps.ecr.outputs.registry }}/${{ env.ECR_REPO }}"
          docker build -t "${ECR_URI}:${IMAGE_TAG}" -t "${ECR_URI}:latest" .
          docker push "${ECR_URI}:${IMAGE_TAG}"
          docker push "${ECR_URI}:latest"
```

✅ Commit and push this file to your repo.

---

### **Step 5: Create App Runner Service**

1. Go to **AWS Console → App Runner**
2. Click **Create Service**
3. Choose:

   * **Source:** Container registry
   * **Provider:** Amazon ECR
   * **Select Repository:** `flask-demo-app`
   * **Select Tag:** `latest`
4. Click **Next**

**Service Settings:**

* Port: `5000`
* Auto Deployments: ✅ **Enable auto deployment**
* Service name: `flask-app-runner`
* Click **Create & Deploy**

⏳ Wait a few minutes...

---

### **Step 6: Test the Deployed App**

Once status = **Running**, open the **default domain URL**, e.g.:

```
https://flask-app-runner-xyz123.ap-south-1.awsapprunner.com
```

✅ You should see your Flask app running live on AWS.

---

### **Step 7: Test CI/CD**

Make a small code change in your app (e.g., update a text or HTML).
Commit & push to the `main` branch.

GitHub Actions will automatically:

1. Build the new image
2. Push to ECR
3. App Runner will auto-deploy the new version 🎉

Check GitHub → **Actions tab** → verify workflow success.

---

## 🧹 **Step 8: Cleanup (Optional)**

To avoid charges:

```bash
aws apprunner delete-service --service-arn arn:aws:apprunner:ap-south-1:<acct>:service/flask-app-runner/<id>
aws ecr delete-repository --repository-name flask-demo-app --force
```

---


## 🏁 **End of Lab Summary**

You have successfully:

* Built a containerized app
* Stored it in AWS ECR
* Deployed it to App Runner
* Automated the CI/CD using GitHub Actions

---

