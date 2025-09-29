# Lab 27: Ansible - Managing Inventory & Roles

---

!!! tip "Objective"

    * Use static inventory with multiple nodes.
    * Create a **role** for database installation.
    * Apply the role via a playbook.

---
### Step 0: Deploy another VM

Setup SSH Key Authentication same as before for new VM

On **control node**:

```bash
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

### Step 1: Create Static Inventory with Groups

File: `inventory.ini`

```ini
[web]
192.168.1.20 ansible_user=ubuntu

[db]
192.168.1.30 ansible_user=ubuntu
```

---

### Step 2: Create a Role for Database Server

Use Ansible Galaxy init:

```bash
ansible-galaxy init roles/dbserver
```

This creates:

```
roles/dbserver/
├── defaults/main.yml
├── handlers/main.yml
├── tasks/main.yml
├── templates/
├── vars/main.yml
└── ...
```

---

### Step 3: Define Database Tasks

Edit `roles/dbserver/tasks/main.yml`:

```yaml
---
- name: Install MySQL
  apt:
    name: mysql-server
    state: present
    update_cache: yes

- name: Ensure MySQL service is running
  service:
    name: mysql
    state: started
    enabled: yes
```

---

### Step 4: Create Playbook to Use Role

File: `dbserver.yml`

```yaml
---
- name: Configure Database Server
  hosts: db
  become: yes
  roles:
    - dbserver
```

Run:

```bash
ansible-playbook -i inventory.ini dbserver.yml
```

---

### Step 5: Verify Database Setup

On DB node:

```bash
systemctl status mysql
mysql --version
```

Expected: MySQL running.

---

