# Lab 09: Deploying Object Storage with MinIO

---

## Introduction

In this lab, you will deploy **MinIO**, an open-source, high-performance object storage server. MinIO is compatible with the **Amazon S3 API**, making it perfect for learning modern cloud-native storage concepts.

By the end of this lab, you will:

* Install MinIO inside your Lubuntu VM (Lab 03).
* Run the MinIO server with local storage.
* Access the MinIO **web interface**.
* Create a bucket, upload/download objects.
* Configure access policies.

This simulates how enterprises use **object storage** for unstructured data like images, videos, and backups.

---

## Step 1: Preparing Lubuntu VM

1. Ensure your **Lubuntu VM** (Lab 03) is running.
2. Open a **terminal** inside Lubuntu.
3. Update packages:

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

## Step 2: Installing MinIO

1. Download MinIO server binary:

   ```bash
   wget https://dl.min.io/server/minio/release/linux-amd64/minio -O minio
   ```
2. Make it executable:

   ```bash
   chmod +x minio
   ```
3. Move it to a system-wide location:

   ```bash
   sudo mv minio /usr/local/bin/
   ```

✅ MinIO server is now installed.

---

## Step 3: Running MinIO Server

1. Create a directory for MinIO data:

   ```bash
   mkdir ~/minio-data
   ```
2. Run the MinIO server:

   ```bash
   minio server ~/minio-data --console-address ":9001"
   ```
3. On first run, MinIO will display **Access Key** and **Secret Key**. Copy these values (you will need them to log in).

---

## Step 4: Accessing the MinIO Web Interface

1. On your **Windows Host PC**, open a browser.
2. Go to:

   ```
   http://<lubuntu-ip>:9001
   ```

   Example: `http://192.168.1.130:9001`
3. Log in with the **Access Key** and **Secret Key** provided by MinIO.

✅ You are now inside the MinIO Web Console.

---

## Step 5: Creating a Bucket

1. In the MinIO console, click **Buckets → Create Bucket**.
2. Name the bucket: `techops-bucket`.
3. Keep default settings and save.

✅ A bucket is like a folder for storing objects.

---

## Step 6: Uploading and Downloading Objects

1. Inside the `techops-bucket`, click **Upload**.
2. Upload a simple text file or image (e.g., `hello.txt`).
3. Verify the object appears in the bucket.
4. Click on the object → Download to confirm you can retrieve it.

✅ You have successfully uploaded and downloaded objects.

---

## Step 7: Sharing the files

1. In the `techops-bucket` that you created, select the file you just uploaded by selecting checkmark on the left side of the file name.
2. In the sub-menu on right side, you will find the **Share** button, click on it.
3. Accept the default values for sharing time or add as per your needs.
4. Copy the link and share to your instructor on Slack and updte your Jira Card for the lab.

✅ You can now access the file directly via URL now.

⚠️ **Note:** In production, access policies should be restricted for security.

---

## Step 8: (Optional) Using MinIO Client (mc)

1. Download MinIO client:

   ```bash
   wget https://dl.min.io/client/mc/release/linux-amd64/mc -O mc
   chmod +x mc
   sudo mv mc /usr/local/bin/
   ```
2. Configure alias:

   ```bash
   mc alias set local http://localhost:9000 <ACCESS_KEY> <SECRET_KEY>
   ```
3. List buckets:

   ```bash
   mc ls local
   ```

✅ MinIO client provides powerful command-line management.

---

## Troubleshooting Tips

* **Can’t access web console:** Ensure Lubuntu VM uses **Bridged Adapter** networking.
* **Port blocked:** Verify firewall rules, allow TCP ports `9000` and `9001`.
* **Forgot access key/secret key:** Restart the MinIO server — new keys will be generated.
* **MinIO crashes on low RAM:** Allocate at least **2 GB RAM** to Lubuntu VM.

---

✅ Congratulations! You have successfully deployed **MinIO object storage**, created a bucket, uploaded files, and configured access policies. You now understand how object storage works in modern cloud environments.
