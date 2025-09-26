# Lab 04: Deploying a Code on the Virtual Machine

---

## Introduction
In this lab, you will deploy a simple web application on the Linux Virtual Machine (VM) you created in **Lab 03**. We will use **Apache**, one of the most popular web servers, to host a “Hello World” HTML page.

By the end of this lab, you will:
- Understand what Apache is and why it is used.
- Learn where to run commands (inside the VM vs. outside on Windows).
- Install and configure Apache inside your Linux VM.
- Deploy and access a simple HTML web page from both inside the VM and your host machine.

---

## Step 1: What is Apache?
**Apache HTTP Server** is free and open-source software that delivers web pages to users. When someone types your VM’s IP address into a browser, Apache responds by sending back the web page files.

**Why Apache?**
- Easy to install and beginner-friendly.
- Stable and widely used across the world.
- Perfect for learning how web servers work.

---

## Step 2: Tools You Will Use
- **Inside the VM:** Linux Terminal (open from the VM’s desktop menu).
- **Outside the VM (Host Windows 11):** A web browser like Microsoft Edge or Chrome to test access from your PC.
- **Text Editor inside VM:** We will use `nano` (a simple text editor in Linux).

**Keyboard shortcuts in nano:**

- Save: `Ctrl + O`, then press Enter.
- Exit: `Ctrl + X`.

---

## Step 3: Creating a Sample Code
We will create a simple HTML file called `index.html`.

Here is the code:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a simple webpage deployed on Apache.</p>
</body>
</html>
```

Do not create it yet — we will add it later inside Apache’s web directory.

---

## Step 4: Setting Up Apache (Inside the VM)
1. Open a **Terminal** inside your VM.

2. Update package lists:
   ```bash
   sudo apt update
   ```

3. Install Apache:
   ```bash
   sudo apt install apache2 -y
   ```

4. Start Apache:
   ```bash
   sudo systemctl start apache2
   ```

5. Enable Apache to start automatically when the VM boots:
   ```bash
   sudo systemctl enable apache2
   ```

6. Verify Apache is running:
   ```bash
   systemctl status apache2
   ```
   If successful, open a browser **inside your VM** and go to:
   ```
   http://localhost
   ```
   You should see the Apache welcome page.

---

## Step 5: Deploying the Code (Inside the VM)
1. Navigate to Apache’s default web directory:
   ```bash
   cd /var/www/html
   ```

2. Remove the default `index.html`:
   ```bash
   sudo rm index.html
   ```

3. Create a new `index.html`:
   ```bash
   sudo nano index.html
   ```

4. Paste the HTML code (from Step 3). Save with `Ctrl+O`, press Enter, then exit with `Ctrl+X`.

5. Set proper permissions:
   ```bash
   sudo chown -R www-data:www-data /var/www/html
   sudo chmod -R 755 /var/www/html
   ```

---

## Step 6: Accessing the Webpage
### From Inside the VM
1. Open Firefox (or the browser installed in your VM).
2. Enter:
   ```
   http://localhost
   ```
   You should see your **Hello World** page.

### From the Host Machine (Windows 11)
1. Find your VM’s IP address inside the VM terminal:
   ```bash
   ip addr
   ```
   Look for a line like `inet 192.168.x.x` (not 127.0.0.1).

2. Open your browser on Windows 11 and type:
   ```
   http://<vm-ip>
   ```
   Example: `http://192.168.1.55`

   If your VM networking is set to **Bridged Adapter** (from Lab 03), you will see the webpage from your host machine.

---

## Troubleshooting Tips
- **Apache not running:** Restart with:
  ```bash
  sudo systemctl restart apache2
  ```
- **Permission denied error:** Check permissions on `/var/www/html`.
- **Page not opening on host:** Ensure VM network is set to **Bridged Adapter** in VirtualBox.
- **Firewall issues:** Allow Apache:
  ```bash
  sudo ufw allow 'Apache Full'
  ```

---

✅ You have now successfully deployed and accessed a simple HTML web page hosted on your VM using Apache!

---
## Video Walkthrough

### Installing Apache in Virtual Machine using Windows 11 Terminal
<iframe width="560" height="315" src="https://www.youtube.com/embed/Ru7mnJKEQ94?si=fHMo-c-alRfCS5Oh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

