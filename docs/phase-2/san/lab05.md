# Lab 05: Installing and Configuring FreeNAS (TrueNAS CORE) in VirtualBox

---

## Introduction
In this lab, you will learn how to set up **FreeNAS (now called TrueNAS CORE)** inside a virtual machine using VirtualBox. TrueNAS is an open-source storage operating system widely used to build **NAS (Network Attached Storage)** and **SAN (Storage Area Network)** systems.

By the end of this lab, you will:
- Install FreeNAS/TrueNAS CORE in VirtualBox.
- Add virtual disks to simulate enterprise storage.
- Create and configure a **ZFS storage pool**.
- Create a basic **dataset** to be later used by your Lab 03 Linux VM (Lubuntu).

This lab introduces you to the role of a **Storage Administrator** in a company like *TechOps Inc.*, where servers rely on centralized storage.

---

## Step 1: Downloading FreeNAS (TrueNAS CORE)
1. Open a browser on your **Windows Host Machine**.
2. Go to the official TrueNAS download page:  
   👉 [https://www.truenas.com/download-truenas-core/](https://www.truenas.com/download-truenas-core/)
3. Download the **latest stable ISO** (as of September 2025: TrueNAS CORE 13.x).
4. Save the ISO file to your computer.

---

## Step 2: Creating a New Virtual Machine for FreeNAS
1. Open **VirtualBox** on your Windows 11 host.
2. Click **New** → Fill in details:

    - **Name:** `FreeNAS-Server`
    - **Type:** BSD
    - **Version:** FreeBSD (64-bit)

3. Assign resources:
   
    - **RAM:** 4096 MB (4 GB)
    - **CPU:** 2 processors (minimum)

4. Do **not** create a hard disk yet (we will add disks manually).

---

## Step 3: Adding Virtual Disks
FreeNAS requires storage disks to create pools.

1. Select your `FreeNAS-Server` VM → **Settings → Storage**.
2. Add a **Controller: SATA** if not already present.
3. Add multiple virtual hard disks:

    - Disk 1: 20 GB (System Disk, where FreeNAS OS will install).
    - Disk 2: 10 GB (Data Disk 1).
    - Disk 3: 10 GB (Data Disk 2).
    - Disk 4: 10 GB (Data Disk 3).

    👉 The extra disks (2–4) will simulate a storage array for ZFS.

4. Attach the downloaded **TrueNAS ISO** as a virtual optical disk.

!!! info "GUI method (VirtualBox Manager) for Step 4"
      1. Open **Oracle VirtualBox** on your host machine.
      2. Select the VM you created (e.g. `FreeNAS-Server`) in the left VM list — **do not start it** yet.
      3. Click the **Settings** (⚙️) button in the toolbar (or right-click the VM → Settings).
      4. In the Settings window choose **Storage** from the left menu.
      5. Look at the **Storage Tree** panel in the middle:
         - You will see one or more controllers (e.g., `Controller: SATA`, `Controller: IDE`) and attached devices underneath.
         - If there is an entry labeled **Controller: IDE** with an item `Empty` that has a little CD icon, select that `Empty` entry.
         - If you don’t see an IDE controller or an Empty optical drive, select a controller (IDE or SATA) and use the small **CD icon with a +** (or the little disk icon on the right) to **Add Optical Drive**.
      6. With the optical drive (the `Empty` item) selected, look at the right-hand **Attributes** area. Click the small CD icon next to **Optical Drive** and choose **Choose a disk file...**
      7. In the file chooser dialog, navigate to the folder where you saved the TrueNAS ISO (e.g., `C:\Users\YourName\Downloads\TrueNAS-CORE-13.x.iso` on Windows or `/home/you/Downloads/TrueNAS-CORE-13.x.iso` on Linux), select the ISO and click **Open**.
      8. You should now see the ISO filename displayed under the controller in the Storage Tree (instead of `Empty`).
      9. (Important) Optional: verify boot order — go to **System → Motherboard** and ensure **Optical** is checked and listed above **Hard Disk** in the Boot Order so the VM boots from the ISO first.
      10. Click **OK** to save and close Settings.

---

## Step 4: Installing FreeNAS/TrueNAS CORE
1. Start the VM → The TrueNAS installer should boot.
2. Select **Install/Upgrade**.
3. Choose the **20 GB system disk** as the installation target.
4. Set a **root password** (remember this carefully).
5. Choose **Boot via BIOS** (default) or UEFI if prompted.
6. Complete installation and reboot. Remove the ISO after reboot.

When the VM restarts, you will see a **console setup screen** with network details (IP address).

---

## Step 5: Accessing the TrueNAS Web Interface
1. From the console screen, note the **IP address** assigned to the FreeNAS VM.
   Example: `http://192.168.1.120`

2. On your **Windows Host machine**, open a web browser and type the IP address.

3. Log in with:

    - **Username:** `root` OR `truenas_admin` (depending upon what you see during installation)
    - **Password:** (the one you set during installation)

You are now inside the **TrueNAS Web Interface**.

---

## Step 6: Creating a ZFS Storage Pool
1. Go to **Storage → Pools** in the web interface.
2. Click **Add → Create new pool**.
3. Name the pool: `TechOpsPool`
4. Select the **3 data disks (10 GB each)** you created earlier.
5. Choose a **RAID-Z1** configuration (similar to RAID-5).

    - This provides redundancy: the pool can survive one disk failure.
6. Confirm and create the pool.

✅ You now have a ZFS storage pool.

---

## Step 7: Creating a Dataset
Datasets are like folders within a ZFS pool, optimized for different use cases.

1. In the TrueNAS web interface → **Storage → Pools → TechOpsPool**.
2. Click the 3-dot menu → **Add Dataset**.
3. Name it: `ProjectData`
4. Accept defaults (compression on, share type: generic).

✅ You now have a dataset inside your ZFS pool.

---

## Step 8: Preparing for Client Access
In later labs, we will:

- Connect the **Lab 03 Lubuntu VM** to this dataset using **NFS/iSCSI**.
- Configure multipath I/O for HA.
- Add file and object storage layers (SMB, MinIO).

For now, ensure your FreeNAS VM is running and your pool + dataset exist.

---

## Troubleshooting Tips
- **No network/IP shown:** Change VM network to **Bridged Adapter** in VirtualBox settings.
- **VM too slow:** Increase RAM to 6 GB if your host allows.
- **Can’t access web interface:** Check firewall on host, or try a different browser.

---

✅ Congratulations! You have successfully installed TrueNAS CORE in VirtualBox, created a ZFS storage pool, and added a dataset. This forms the foundation of your SAN environment.

