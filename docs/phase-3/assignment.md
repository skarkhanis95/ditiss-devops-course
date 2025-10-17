# Assignment

## Objectives

* Stand up a basic two-subnet VPC in AWS (public + private).
* Launch:

  1. **Private EC2** (no public IP) — Ansible control node.
  2. **Jump host** in public subnet — for SSH into the private EC2.
  3. **Web server** in public subnet.
* From the **private EC2**, run the provided **Ansible playbook** to install Apache on the **public web server** and serve a page with **Name + Roll No.**
* Additionally, **containerize** a simple Apache site by building a basic **Docker image** that serves the same page.

## Deliverables (brief)

1. Public web server URL showing **Name + Roll No**.
2. One screenshot of Ansible run completion.
3. One screenshot of your Docker container serving the same page locally (`docker run …`).
4. One diagram or bullet list of your VPC + subnets + instances (very brief).

---

# Provided Files (only these)

## 1) `site.yml` (Ansible playbook)

Works on Ubuntu or Amazon Linux 2 targets. Run it **from the private EC2** against the public web server.

```yaml
---
- name: Bootstrap Apache and deploy Name/Roll page
  hosts: web
  become: true
  gather_facts: true

  vars:
    apache_pkg: "{{ 'httpd' if ansible_facts.os_family in ['RedHat','Amazon'] else 'apache2' }}"
    apache_svc: "{{ 'httpd' if ansible_facts.os_family in ['RedHat','Amazon'] else 'apache2' }}"
    doc_root: "/var/www/html"
    student_name: "{{ lookup('env','STUDENT_NAME') | default('Your Name', true) }}"
    roll_no: "{{ lookup('env','ROLL_NO') | default('0000', true) }}"

  tasks:
    - name: Ensure package cache is up to date (Debian/Ubuntu)
      apt:
        update_cache: yes
      when: ansible_facts.os_family == 'Debian'

    - name: Install Apache
      package:
        name: "{{ apache_pkg }}"
        state: present

    - name: Ensure Apache service is enabled and running
      service:
        name: "{{ apache_svc }}"
        state: started
        enabled: true

    - name: Deploy index.html with Name and Roll No
      copy:
        dest: "{{ doc_root }}/index.html"
        mode: '0644'
        content: |
          <!doctype html>
          <html>
            <head><meta charset="utf-8"><title>Student</title></head>
            <body style="font-family: system-ui; margin: 3rem;">
              <h1>{{ student_name }}</h1>
              <h2>Roll No: {{ roll_no }}</h2>
              <p>Deployed via Ansible ✅</p>
            </body>
          </html>
```

**How students run (example, from private EC2):**

```bash
# inventory.ini (example)
# [web]
# <public-web-server-ip> ansible_user=ubuntu   # or ec2-user for Amazon Linux 2

ansible -i inventory.ini web -m ping
ansible-playbook -i inventory.ini site.yml
```

---

## 2) `Dockerfile` (minimal Apache image)

Builds a tiny image that serves the same page. No external files needed.

```dockerfile
# Simple Apache image that serves Name + Roll No
FROM httpd:2.4-alpine

ARG STUDENT_NAME="Your Name"
ARG ROLL_NO="0000"

# Create a minimal index.html at container build time
RUN printf '<!doctype html><html><head><meta charset="utf-8"><title>Student</title></head><body style="font-family: system-ui; margin: 3rem;"><h1>%s</h1><h2>Roll No: %s</h2><p>Served from Docker ✅</p></body></html>' \
    "$STUDENT_NAME" "$ROLL_NO" \
    > /usr/local/apache2/htdocs/index.html

EXPOSE 80
CMD ["httpd-foreground"]
```

---

## 3) Installing Ansible (on the Private EC2)

Once your **private EC2** instance is reachable (via SSH from your jump host), install Ansible using the package manager for your OS:

### 🟢 For **Amazon Linux 2 / RHEL / CentOS**

```bash
sudo yum update -y
sudo yum install -y ansible
# or (if yum doesn’t have it)
sudo amazon-linux-extras install ansible2 -y
ansible --version
```

### 🔵 For **Ubuntu / Debian**

```bash
sudo apt update -y
sudo apt install -y ansible
ansible --version
```

✅ **Verify Installation**

```bash
ansible --version
```

You should see a version number (e.g. `ansible [core 2.17.x]`).

---



