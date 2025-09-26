# Lab 03: Create and Configure a Virtual Machine Using VirtualBox
---

## Introduction to VirtualBox
Oracle VirtualBox is a free and open-source virtualization software that allows you to run multiple operating systems on your computer. Instead of using multiple physical machines, VirtualBox lets you create **Virtual Machines (VMs)** — software-based computers that run like real ones. It is widely used for testing, learning, and development because it is lightweight and easy to use.

---

## Step 1: Downloading and Installing VirtualBox
1. Open a web browser and go to the official VirtualBox download page:  
   👉 [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)

2. Download the **latest stable version** for Windows hosts.

3. Once the installer is downloaded, double-click the file to begin installation.

4. Installation steps:

    - Click **Next** through the setup wizard.
    - Keep the default options.
    - Allow installation of network adapters when prompted.
    - Click **Install** and wait for the process to finish.

5. After installation, launch VirtualBox from the Start Menu.

---

## Step 2: Downloading a Lightweight Linux OS
For this lab, we will use **Lubuntu** — a lightweight, beginner-friendly Linux distribution.

1. Go to the official Lubuntu downloads page:  
   👉 [https://lubuntu.me/downloads/](https://lubuntu.me/downloads/)

2. Download the **latest LTS ISO** (as of September 2025: **Lubuntu 24.04 LTS**).

3. Optional: Verify the download integrity by checking the checksum provided on the website.

---

## Step 3: Navigating VirtualBox Interface
When you open VirtualBox, you will see:
- **Toolbar:** Create, Start, Settings, and other VM management options.
- **Main Window:** List of all created VMs.
- **Details Panel:** Shows the configuration of the selected VM.

---

## Step 4: Creating a New Virtual Machine
1. Click **New** in VirtualBox.
2. Enter the following details:
   
    - **Name:** `Lubuntu_VM`
    - **Type:** Linux
    - **Version:** Ubuntu (64-bit)

3. Assign hardware resources:

    - **RAM:** 2048 MB (2 GB)
    - **CPU:** 2 processors

4. Create a virtual hard disk:
   
    - Select **VDI (VirtualBox Disk Image)**
    - Choose **Dynamically allocated**
    - Set size to **20 GB**

5. Attach the downloaded Lubuntu ISO:
   
    - Go to **Settings → Storage**
    - Under Controller: IDE, click the **Empty disk icon**
    - Choose **Optical Disk → Select a disk file**
    - Browse and select the downloaded `lubuntu-24.04.iso`

---

## Step 5: Deploying the ISO and Installing Linux
1. Start the VM.
2. The Lubuntu installer will appear.
3. Follow these beginner-friendly steps:
   
    - Select **Language**: English (default)
    - Choose **Install Lubuntu**
    - Select **Erase disk and install** (safe inside VM)
    - Set a username and password
    - Continue installation until finished
4. Restart the VM and log in to your new Linux desktop.

---

## Step 6: Networking Configuration
VirtualBox provides different networking modes:

- **NAT:** Default; allows internet but VM is hidden from local network.
- **Bridged Adapter:** VM appears as another device on the same network (recommended).
- **Host-Only:** VM communicates only with host.
- **Internal:** VM communicates only with other VMs.
- **NAT Network:** Like NAT, but supports multiple VMs.

👉 For this lab, select **Bridged Adapter**:

1. Go to **Settings → Network**
2. Change **Attached to**: `Bridged Adapter`
3. Select your active network adapter (e.g., Wi-Fi or Ethernet).

---

## Step 7: Accessing the VM
### Logging in

- Use the credentials you created during installation.
- You can interact with the desktop interface.

### Terminal Access from Windows 11
1. Find the VM’s IP address:
   ```bash
   ip addr
   ```
   Look for an entry like `192.168.x.x`

2. Using Windows Terminal:
   ```bash
   ssh username@192.168.x.x
   ```

3. If SSH is not installed, run inside the VM:
   ```bash
   sudo apt update && sudo apt install openssh-server
   ```

4. Using PuTTY (optional):

    - Download PuTTY from: [https://www.putty.org/](https://www.putty.org/)
    - Enter the VM’s IP address in PuTTY.
    - Login with your username and password.

---

## Troubleshooting Tips
- **Black screen at boot:** Ensure virtualization is enabled in BIOS/UEFI.
- **No internet:** Switch between NAT and Bridged mode.
- **Cannot SSH:** Check if OpenSSH is installed and running with:
  ```bash
  sudo systemctl status ssh
  ```
- **Slow performance:** Increase RAM/CPU allocation in VirtualBox settings.

---

✅ You have successfully created and configured a Virtual Machine using VirtualBox!

---
## Video Walk Through

### Installing an Oracle VirtualBox

<iframe width="560" height="315" src="https://www.youtube.com/embed/a3QPTgIFS_Y?si=ZSlOjLCe65jB9_L5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

### Installing Lubuntu on VirtualBox

<iframe width="560" height="315" src="https://www.youtube.com/embed/KV1nKFQctNI?si=dCLmo6SYNlt0iXU6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

