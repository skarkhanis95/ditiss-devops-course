# Lab 13: AWS CLI/SDK Configuration Guide

A comprehensive, step-by-step guide to configure AWS CLI/SDK on your laptop and start using it.

---

## Step 1: Install AWS CLI

=== "**Windows**"

    1. **Download the installer**: [AWS CLI Download](https://aws.amazon.com/cli)
    2. **Run the installer**:

    ```powershell
    msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
    ```
    3. **Verify installation**:

    ```powershell
    aws --version
    ```

=== "**macOS**"

    1. **Download and install**:

    ```bash
    curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
    sudo installer -pkg AWSCLIV2.pkg -target /
    ```
    2. **Verify installation**:

    ```bash
    aws --version
    ```

=== "Linux (Amazon Linux)"

    ```bash
    sudo yum -y update
    sudo yum -y install aws-cli
    aws --version
    ```

=== "**Linux (Ubuntu/Debian)**"

    ```bash
    sudo apt update
    sudo apt install -y awscli
    aws --version
    ```

---

## Step 2: Create AWS Access Keys

1. **Sign in to AWS Console**: [AWS Console](https://console.aws.amazon.com)
2. **Navigate to IAM**: Search for *IAM* in the Services menu.
3. **Create or select a user**:

    - New user → *Users → Create user*
    - Existing user → Click the username
  
4. **Create access keys**:

    * Go to **Security credentials** tab
   * Click **Create access key**
   * Choose **Command Line Interface (CLI)**
   * Save credentials securely (CSV download or copy Access Key ID/Secret Key).

---

## Step 3: Configure AWS CLI

Run:

```bash
aws configure
```

Enter the following when prompted:

* **AWS Access Key ID**
* **AWS Secret Access Key**
* **Default region name** (e.g., `us-east-1`)
* **Default output format** (`json` recommended)

**Example:**

```
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

---

## Step 4: Verify Configuration

```bash
# Check identity
aws sts get-caller-identity

# List config
aws configure list

# Test with S3
aws s3 ls
```

---

## Step 5: Using Named Profiles (Optional)

For multiple AWS accounts:

```bash
# Create a named profile
aws configure --profile myprofile

# Use the profile
aws s3 ls --profile myprofile

# Set default profile
export AWS_PROFILE=myprofile
```

---

## Step 6: Basic AWS CLI Usage Examples

### **S3 Operations**

```bash
# List buckets
aws s3 ls

# Create bucket
aws s3 mb s3://my-unique-bucket-name

# Upload file
aws s3 cp myfile.txt s3://my-unique-bucket-name/

# Download file
aws s3 cp s3://my-unique-bucket-name/myfile.txt ./downloaded-file.txt
```

### **EC2 Operations**

```bash
# List instances
aws ec2 describe-instances

# List available AMIs
aws ec2 describe-images --owners self

# Create key pair
aws ec2 create-key-pair --key-name MyKeyPair
```

### **IAM Operations**

```bash
# List users
aws iam list-users

# List policies
aws iam list-policies --scope Local
```

---

## Step 7: AWS SDK Setup

### **Python (boto3)**

```bash
pip install boto3
```

### **Node.js**

```bash
npm install aws-sdk
```

### **Java (Maven dependency)**

```xml
<dependency>
  <groupId>software.amazon.awssdk</groupId>
  <artifactId>aws-sdk-java</artifactId>
  <version>2.x.x</version>
</dependency>
```

---

## Troubleshooting Tips

* Verify credentials: `aws configure list`
* Check permissions in IAM
* Ensure system clock is synchronized
* Watch for conflicting environment variables
* Clear and reconfigure if needed: delete `~/.aws`

---

## Security Best Practices

* Never share or commit access keys
* Prefer **IAM roles** over static keys
* Rotate access keys regularly
* Follow **least privilege principle**
* Enable **MFA**
* Use **AWS SSO** for multiple accounts

---

## Configuration File Locations

* **Windows**: `%USERPROFILE%\.aws\`
* **macOS/Linux**: `~/.aws/`

Files created:

* `credentials` → Contains access keys
* `config` → Region and output format

---

✅ You are now ready to use **AWS CLI and SDKs** to manage AWS resources from your laptop!

---