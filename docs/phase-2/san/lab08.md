# Lab 08: Configuring File-Based Storage with NFS and SMB (OPTIONAL)

---

## Introduction

In this lab, you will configure **file-based storage protocols** using **TrueNAS**. Specifically, you will set up:

* **NFS (Network File System)** for Linux clients (Lubuntu VM).
* **SMB (Server Message Block/CIFS)** for Windows clients (your Host PC).

This demonstrates how SAN/NAS systems also provide **file-level storage** in addition to block-level (iSCSI) access.

By the end of this lab, you will:

* Enable and configure NFS shares.
* Enable and configure SMB shares.
* Access NFS shares from your **Lubuntu VM**.
* Access SMB shares from your **Windows Host PC**.

---

## Step 1: Preparing the Environment

1. Ensure your **TrueNAS VM** is running and `TechOpsPool` exists.
2. Ensure your **Lubuntu VM (Lab 03)** is running.
3. Ensure your **Windows Host** is connected to the same bridged network.

---

## Step 2: Configuring an NFS Share in TrueNAS

1. Log in to the **TrueNAS Web Interface**.
2. Go to **Sharing → Unix Shares (NFS)**.
3. Click **Add**.
4. Path: `/mnt/TechOpsPool/DevTeam`
5. Allow network: `192.168.0.0/24` (adjust for your subnet).
6. Save and start the **NFS service**.

✅ NFS share is now active.

---

## Step 3: Accessing NFS Share from Lubuntu VM

1. On Lubuntu, open the terminal.
2. Install NFS client tools:

   ```bash
   sudo apt update && sudo apt install nfs-common -y
   ```
3. Create a mount point:

   ```bash
   sudo mkdir /mnt/devteam
   ```
4. Mount the NFS share:

   ```bash
   sudo mount <truenas-ip>:/mnt/TechOpsPool/DevTeam /mnt/devteam
   ```
5. Verify:

   ```bash
   ls /mnt/devteam
   ```
6. Test by creating a file:

   ```bash
   echo "Hello from Lubuntu" | sudo tee /mnt/devteam/lubuntu_test.txt
   ```

✅ The file is now stored on TrueNAS and accessible from other clients.

---

## Step 4: Configuring an SMB Share in TrueNAS

1. In the TrueNAS web interface, go to **Sharing → Windows Shares (SMB)**.
2. Click **Add**.
3. Path: `/mnt/TechOpsPool/DevTeam`
4. Name: `DevShare`
5. Save and enable the SMB service.

✅ SMB share is now active.

---

## Step 5: Accessing SMB Share from Windows Host

1. On your **Windows 11 Host**:

   * Open **File Explorer**.
   * In the address bar, type:

     ```
     \\<truenas-ip>\DevShare
     ```

     Example: `\\192.168.1.120\DevShare`
2. Enter credentials:

   * Username: `root`
   * Password: (set during TrueNAS installation)
3. You should now see the share contents.
4. Test by creating a text file (`windows_test.txt`) inside the share.

✅ Both Lubuntu and Windows can now access the same dataset over different protocols.

---

## Step 6: Verifying Cross-Access

1. On Lubuntu VM, check if the Windows file is visible:

   ```bash
   ls /mnt/devteam
   ```

   You should see `windows_test.txt`.

2. On Windows Host, refresh the SMB share — you should see `lubuntu_test.txt` created earlier.

✅ This confirms that multiple clients can access the same dataset using different file-sharing protocols.

---

## Troubleshooting Tips

* **NFS mount fails:** Ensure NFS service is running and subnet is correctly set in TrueNAS.
* **Windows cannot access share:** Enable SMB1/SMB2 in Windows features if needed.
* **Authentication issues:** Use the `root` account or create a dedicated SMB user in TrueNAS.
* **Firewall issues:** Allow SMB/NFS ports (111, 2049, 445) on your network.

---

✅ Congratulations! You have successfully configured **NFS and SMB shares** on TrueNAS, and accessed them from both **Lubuntu** and **Windows Host**. This simulates real-world **file sharing** in mixed environments.
