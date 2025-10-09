# Lab 12 (B): Multi-OS Apache Installation + Bootstrap Web Page Deployment via Ansible

---

## 🎯 Objectives

* Install Apache automatically across Ubuntu, RedHat, and Amazon Linux systems.
* Detect OS family dynamically.
* Deploy a custom **Bootstrap “Welcome” web page** that confirms Ansible deployment.

---


## Pre-Reqs

### 1. Deploy Nodes
1. Deploy either Ubuntu/AMI node in Public Subnet give it a name `control-node`.
2. Deploy 1 Ubunut Node again in Public Subnet
3. Deploy 1 Amazon Linux node again in Public Subnet

---


### 2. Install Ansible 

=== "🐧 For Ubuntu / Debian Control Node"

    ```bash
    # Update your system
    sudo apt update -y

    # Install dependencies
    sudo apt install -y software-properties-common

    # Add the official Ansible PPA
    sudo add-apt-repository --yes --update ppa:ansible/ansible

    # Install Ansible
    sudo apt install -y ansible

    # Verify installation
    ansible --version
    ```

    Expected output example:

    ```
    ansible [core 2.16.5]
    python version = 3.10.12
    jinja version = 3.1.2
    ```

=== "☁️ For Amazon Linux (or RHEL / CentOS)"

    ```bash
    # Update system
    sudo yum update -y

    # Install Python and pip if not already installed
    sudo yum install -y python3 python3-pip

    # Install Ansible via pip (recommended for latest version)
    sudo pip3 install ansible

    # Verify installation
    ansible --version
    ```

---

### 3. Copy your keys

Your `.pem` file (e.g., `aws_key.pem`) is required by Ansible to connect securely to AWS EC2 instances.
Here’s how to safely transfer it to your **Ansible control node** (Ubuntu or Amazon Linux) from **Windows** or **macOS**.

=== "🪟 If You’re Using Windows (PowerShell)"

      1. **Open PowerShell** in the folder where your `.pem` file is located, for example:

         ```
         cd "C:\Users\<YourUsername>\Downloads"
         ```

      2. **Use `scp` (Secure Copy)** to copy your key to the control node:

         ```powershell
         scp -i C:\Users\<YourUsername>\.ssh\lab-key.pem aws_key.pem ubuntu@<CONTROL_NODE_IP>:/home/ubuntu/.ssh/
         ```

         Replace:

         * `<CONTROL_NODE_IP>` → public or private IP of your Ansible control node.
         * `lab-key.pem` → the key used to access the control node itself.
         * `aws_key.pem` → the key file you want to copy.

      3. **Set proper permissions** once inside the control node:

         ```bash
         chmod 600 ~/.ssh/aws_key.pem
         ```

      > ⚠️ If PowerShell says "`scp` not recognized", install it by:
      >
      > * Installing **Git for Windows** and using its **Git Bash** terminal, **or**
      > * Installing **OpenSSH Client** via:
      >   `Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0`

=== "🍎 If You’re Using macOS or Linux Terminal"

      1. **Navigate to where your `.pem` file is located:**

         ```bash
         cd ~/Downloads
         ```

      2. **Copy the file to your control node using `scp`:**

        * In the below command `lab-key.pem` is the key which you will use to connect to your control node and `aws_key.pem` is the key for the new nodes that you deployed. You can use the same keys if you prefer but in enterprise all nodes will have different keys.

        * I have deployed ansible on my ubuntu VM, if you have deployed on AMI Node then use `ec2-user@<Control-Node-IP>`

         ```bash
         scp -i ~/.ssh/lab-key.pem aws_key.pem ubuntu@<CONTROL_NODE_IP>:/home/ubuntu/.ssh/
         ```

      3. **SSH into the control node** and adjust permissions:

         ```bash
         ssh -i ~/.ssh/lab-key.pem ubuntu@<CONTROL_NODE_IP>
         chmod 600 ~/.ssh/aws_key.pem
         ```


---



## Your Directory Structure on Control Node

```
ansible-lab-apache/
├── ansible.cfg
├── inventory.ini
├── site.yml
└── templates/
    └── index.html.j2
```

---

## 0. Create `ansible-lab-apache` directory

```bash
sudo mkdir ansible-lab-apache

# Move into the directory
cd ansible-lab-apache
```

## 1. Create `inventory.ini`

```ini
[webservers]
ubuntu-web ansible_host=10.0.1.10 ansible_user=ubuntu
rhel-web ansible_host=10.0.1.11 ansible_user=ec2-user
amazon-web ansible_host=3.12.45.67 ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/aws_key.pem
```

---

## 2. Create `ansible.cfg`

```ini
[defaults]
inventory = ./inventory.ini
host_key_checking = False
retry_files_enabled = False
timeout = 30
forks = 10
```

---

## 3. Create `site.yml` — Main Playbook

```yaml
---
- name: Deploy Apache with custom Bootstrap index page
  hosts: webservers
  become: true
  gather_facts: true

  vars:
    apache_map:
      Debian:
        pkg: apache2
        service: apache2
        webroot: /var/www/html
      RedHat:
        pkg: httpd
        service: httpd
        webroot: /var/www/html
      Amazon:
        pkg: httpd
        service: httpd
        webroot: /var/www/html

  tasks:
    - name: Fail if OS not supported
      fail:
        msg: "Unsupported OS family: {{ ansible_os_family }}"
      when: ansible_os_family not in apache_map.keys()

    - name: Display detected OS family
      debug:
        msg: "Installing Apache on {{ ansible_distribution }} ({{ ansible_os_family }})"

    - name: Update package cache (Debian)
      apt:
        update_cache: yes
      when: ansible_os_family == 'Debian'

    - name: Install Apache package
      package:
        name: "{{ apache_map[ansible_os_family].pkg }}"
        state: present

    - name: Ensure Apache is enabled and started
      service:
        name: "{{ apache_map[ansible_os_family].service }}"
        state: started
        enabled: yes

    - name: Deploy Bootstrap-based index.html
      template:
        src: templates/index.html.j2
        dest: "{{ apache_map[ansible_os_family].webroot }}/index.html"
        mode: '0644'

    - name: Verify Apache webroot ownership
      file:
        path: "{{ apache_map[ansible_os_family].webroot }}"
        owner: root
        group: root
        state: directory

    - name: Restart Apache after deployment
      service:
        name: "{{ apache_map[ansible_os_family].service }}"
        state: restarted

    - name: Test page availability
      uri:
        url: "http://127.0.0.1"
        return_content: yes
      register: webpage

    - name: Display page title from Apache
      debug:
        msg: "{{ webpage.content | regex_search('<title>(.*?)</title>', '\\1') }}"
```

---

## 4. Create `templates/index.html.j2` template file

This Jinja2 template creates a **clean Bootstrap 5 landing page** with a message that it was deployed via Ansible.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Ansible Deployed Web Server</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(135deg, #007BFF, #6610f2);
      color: #fff;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: 'Segoe UI', sans-serif;
    }
    .card {
      background: rgba(255,255,255,0.1);
      border: none;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1 class="display-4 mb-3">🚀 Welcome to {{ ansible_distribution }} Web Server!</h1>
      <p class="lead">This page was <strong>automatically deployed by Ansible</strong> from control host <em>{{ ansible_hostname }}</em>.</p>
      <hr class="my-4">
      <p>Managed Node: <strong>{{ inventory_hostname }}</strong><br>
         OS Family: <strong>{{ ansible_os_family }}</strong><br>
         Deployment Time: <strong>{{ ansible_date_time.date }} {{ ansible_date_time.time }}</strong></p>
      <a href="https://www.ansible.com/" class="btn btn-light mt-3">Learn More about Ansible</a>
    </div>
  </div>
</body>
</html>
```

---

## 5. Run the playbook

```bash
ansible-playbook -i inventory.ini site.yml
```

Sample output:

```
TASK [Display detected OS family] *****************************************
ok: [ubuntu-web] => {
    "msg": "Installing Apache on Ubuntu (Debian)"
}
ok: [amazon-web] => {
    "msg": "Installing Apache on Amazon Linux (Amazon)"
}
```

---

## 6. Verify

From your control node or browser:

```bash
curl http://<webserver-ip>
```

Or open in browser:

```
http://10.0.1.10
http://3.12.45.67
```

Expected:
A Bootstrap “Welcome” page showing OS name, hostname, and “Deployed by Ansible Host”.

---

## Learning Outcomes

✅ Configure multi-OS automation logic using `ansible_os_family`
✅ Deploy dynamic templates using `template` module
✅ Understand inventory grouping and privilege escalation
✅ Automate service installation and configuration idempotently

---


