# Lab 26: Ansible Setup and Configuration Management - 1

---

!!! tip "Objective"

    * Install Ansible on the control node (local VM or cloud instance).
    * Configure passwordless SSH authentication.
    * Run first Ansible command.
    * Write and execute a simple playbook to deploy a web server.

---

### Step 1: Install Ansible on Control Node

=== "On Linux (Ubuntu)"

    ```bash
    sudo apt update
    sudo apt install ansible -y
    ansible --version
    ```

=== "On CentOS/RHEL"

    ```bash
    sudo yum install epel-release -y
    sudo yum install ansible -y
    ```

=== "On macOS (Homebrew)"

    ```bash
    brew install ansible
    ```
 
=== "On Windows"

    * Use **WSL2 (Ubuntu)** and follow Linux steps.
    * Or use **Docker container**:

    ```bash
    docker run -it --rm williamyeh/ansible ansible --version
    ```

---

### Step 2: Configure Target Node(s)

* Create a second VM (Ubuntu/EC2) as managed node.
* Ensure it has an SSH server installed:

  ```bash
  sudo apt install openssh-server -y
  ```

---

### Step 3: Setup SSH Key Authentication

On **control node**:

```bash
ssh-keygen -t rsa -b 4096
ssh-copy-id your_user_name@target-node-ip

# For Virtual Machines on AWS and using Amazon Linux the username is 'ec2-user`
# For Virtual Machines on AWS and using Ubunut the username is 'ubuntu'
```

Test:

```bash
ssh your_user_name@target-node-ip
```

(No password should be asked now ✅).

---

### Step 4: Verify Setup with Ansible Ad-hoc Command

Create an inventory file `inventory.ini`:

```ini
[web]
192.168.1.20 ansible_user=ubuntu
```

Run ping:

```bash
ansible -i inventory.ini all -m ping
```

Expected output:

```json
192.168.1.20 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

---

### Step 5: Write a Simple Playbook

File: `webserver.yml`

```yaml
---
- name: Install and start Apache web server
  hosts: web
  become: yes
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present
        update_cache: yes

    - name: Ensure Apache is running
      service:
        name: apache2
        state: started
        enabled: yes
```

Run it:

```bash
ansible-playbook -i inventory.ini webserver.yml
```

---

### Step 6: Verify Web Server

* On target node:

  ```bash
  systemctl status apache2
  ```
* From browser:
  `http://<target-node-ip>` → should show **Apache default page**.

✅ **Checkpoint:** Students must take a screenshot of the Apache welcome page.

---


