# Lab 06: Advanced ZFS Configuration and Data Protection

**File:** Lab_06_ZFS_Advanced.md  
**UUID:** 8d3f9a4d-f61e-4425-bb8c-f71d35b98a91

---

## Introduction
In this lab, you will build on the **TechOpsPool** you created in **Lab 05**. You will learn how to configure advanced **ZFS features** for data protection and reliability, and you will also connect your **Lubuntu VM (from Lab 03)** to test access to the storage.

By the end of this lab, you will:
- Work with datasets inside the existing **TechOpsPool**.
- Create multiple **datasets** for different use cases.
- Configure **snapshots** and test restoring from one.
- Configure **replication** between datasets.
- Mount an NFS share on your Lubuntu VM to verify access to ZFS datasets.

---

## Step 1: Verify TechOpsPool
1. Log in to the **TrueNAS Web Interface** (use the IP noted in Lab 05).
2. Go to **Storage → Pools**.
3. Confirm that `TechOpsPool` exists and is healthy.
   - If not, repeat Lab 05 steps to create it with Disks 2–4.

✅ You will continue using this pool for all advanced ZFS tasks.

---

## Step 2: Creating Datasets
Datasets are like specialized folders inside a ZFS pool.

1. Navigate to **Datasets**.
2. Select `TechOpsPool`
3. Click on `Add Dataset`
4. Create the following:
   
    - `WindowsData` (for development files)
    !!! warning "Warning"
        Remember to click on `TechOpsPool` again before creating 2nd Dataset
    - `UnixData` (for testing snapshot/replication)
    
  
1. Accept default options (compression enabled, share type generic).

✅ You now have two new datasets under `TechOpsPool`.

---

## Step 3: Creating an SMB User
SMB Users are the local users in FreeNAS using which you access the storage blocks or disks on client machines

1. Navigate to **Credentials → Users**.
2. Click the **Add** button located at top right corner.
3. Enter the following:
   - **Full Name:** `SMB User`
   - **Username:** `smb_user`
   - **Password & Confirm Password:** `*EnterStrongPassword*`
   - **Home Directory:** `/mnt/TechOpsPool/WindowsData`
   - **Shell:** `nologin`
   - **Home Directory Permissions:** 
     - Select Read, Write, Execute for **User** & **Group**
     - Select Read, Execute for **Other** 
   - **Creaet Home Directory:** `Unselect the Checkbox`
4. Click on Save

✅ You now have created new user `smb_user` which we will use in next step

---

## Step 4: Creating an SMB Share for Windows
SMB Shares allow clients (virtual machines, servers, apps, etc) to access the ZFS storage and its pools to store and retrieve their data

1. Click on `Shares` from the side menu
2. In `Windows (SMB) Shares` click on `Add` button
3. Enter following details:
    - **Path:** `/mnt/TechOpsPool/WindowsData`
    - **Name:** `WindowsData`
    - Leave other fields as defaul
    - Click on `Save`
4. If Promted to Start or Restart Service, click OK or Restart Service
5. Configure ACL -> Click on `Configure`
6. In the ACL Editor enter following details:
    - **Owner:** `smb_user`
    - **Owner Group:** `smb_user`
7. Click on `Save ACL` button


✅ You have now created an SMB Share Drive which can be accessed on any Windows Machine inside the network.

---

## Step 5: Accessing the Pool Storage from Windows
Now since you have created the Pool Storage, we will now access that storager and use that storage inside our Windows Device

1. Go to your Windows 10/11 Desktop or anywhere
2. Press `CMD + R` or Click on Search -> Type `Run` -> and Open Run Application
3. Type: `\\<ip of your FreeNAS-Server>\TechOpsPool\WindowsData`
4. Press `Enter`
5. When prompted enter the following credentials:
    - Username: `smb_user`
    - Password: `Enter the password from Step 3`
6. You should see the `WindowsData` Folder on your Windows 11
7. Right click inside the folder and create new Text Document (name it anything)
8. Open the newly created documented and wirte somethign inside that, save the file and exit

✅ You have now accessed the storage created in FreeNAS on your Windows Machine and you can use it as normal file system. So in future if you Windows gets corrupted, your data is always secred on FreeNAS!

---

## Step 6: Configuring Snapshots
1. Go to **DataSets → WindowsData**.
2. On the right side you will see the card/window called **Data Protection**
3. Inside that card, click on `Create Snapshot`
4. Choose dataset: `WindowsData`.
5. Name: `Initial Backup`
6. Click on `Save`
7. Go the same file that you created in Step 5, open it and change the contents of the same file.
8. Take another snapshot after changes → name it `BackupData_Snap2`.

👉 Later, you will roll back to `BackupData_Snap1` and verify that changes are undone.

---

## Step 7: Replication Setup
Replication copies data from one dataset to another for protection.

1. Go to **Data Protection → Replication Tasks → Add**.
2. Source Location: `On this System`
3. Source: `WindowsData`. (Select by using drop down menu)
4. Destination Location: `On this System`
5. Destination: `ProjectData` (Select by using drop down menu)
6. Click on `Next`
7. Replication Schedule: **Run Once**.
8. **Uncheck** Make Destination Read-Only?
9. Keep other details as default
10. Click on `Save`

✅ You have now created a replication system. Meaning if one of your Harddisk is corrupted, your data is always there on other Harddisk on different location

---

## Step 8: Create user for NFS
NFS User is required to access and store the data on NFS Shares. 

!!! info "Important"
    Before proceeding further, log in to your Lubuntu VM, and run the command `id <your-username>`. This will return the output as example (e.g., `uid=1000(username)`, `gid=1000(username)`).

    Note down the `uid` and `gid`

1. Navigate to **Credentials → Users**.
2. Click the **Add** button located at top right corner.
3. Enter the following:
   - **Full Name:** `NFS User`
   - **Username:** `nfs_user`
   - **Select the option to `Disable Password`. (This is required for Unix System mount, we can use SSH keys as well)
   - **Home Directory:** `/mnt/TechOpsPool/UnixData`
   - **UID:** Enter UID you received from your **Lubuntu** Usere above.
   - **Shell:** `nologin`
   - **Home Directory Permissions:** 
     - Select Read, Write, Execute for **User** & **Group**
     - Select Read, Execute for **Other** 
   - **Creaet Home Directory:** `Unselect the Checkbox`
 - - **Uncheck** `SMB User` 
4. Click on Save

✅ You now have created new user `nfs_user` which we will use in next step

✅ You have now created a replication system. Meaning if one of your Harddisk is corrupted, your data is always there on other Harddisk on different location

---
## Step 8: Connecting Lubuntu VM via NFS
Now let’s make your **Lubuntu VM from Lab 03** act as a client.

### On TrueNAS (server):
1. Go to **Shares → Unix Shares (NFS)**.
2. Click **Add**.
3. Path: `/mnt/TechOpsPool/UnixData`.
4. Allow network: `192.168.0.0/24` (adjust to your local subnet).
5. Hosts: **Authrorised Hosts and IP Addresss**: `Enter the IP of your Lubnutu VM`
6. Click on `Advanced Options`
7. **Mapall User:** `nfs_user`
8. **Mapall Group:** `nfs_user`
9.  Save and enable the NFS service.

### On Lubuntu (client):
1. Start your Lubuntu VM.
2. Open the terminal.
3. Install NFS client tools:
   ```bash
   sudo apt update && sudo apt install nfs-common -y
   ```
4. Create a mount point:
   ```bash
   sudo mkdir /mnt/unixdata
   ```
5. Mount the NFS share (replace `<truenas-ip>` with actual IP):
   ```bash
   sudo mount <truenas-ip>:/mnt/TechOpsPool/UnixData /mnt/unixdata
   ```
6. Verify:
   ```bash
   ls -ltr /mnt/unixdata
   ```
   It should list files/datasets from the TrueNAS server. Currently it should be blank

---

## Step 9: Testing Snapshots (Rollback)
1. On Lubuntu, create a test file in the mounted directory:
   ```bash
   echo "Test File" | sudo tee /mnt/unixdata/testfile.txt
   ```
2. On TrueNAS, take a snapshot of `UnixData` dataset as mentioned in Step 6.
3. Delete the file from Lubuntu:
   ```bash
   sudo rm /mnt/unixdata/testfile.txt
   ```
4. Roll back the dataset to the snapshot in TrueNAS web interface.
    - Go to DataSets
    - Select `UnixData`
    - In Data Protection Card, click on `Manage Snapshots`
    - Click on the snap shot created in Step 2 of this Step
    - Click on `Rollback`
5. Refresh the mount on Lubuntu:
   ```bash
   ls /mnt/unixdata
   ```
   ✅ The file should reappear — restored by ZFS snapshot rollback.

---

## Troubleshooting Tips
- **NFS share not visible:** Ensure NFS service is enabled on TrueNAS and firewall is off on host.
- **Mount error in Lubuntu:** Double-check IP and path. Use `ping <truenas-ip>` to verify connectivity.
- **Low performance:** Assign more RAM (6 GB) to the FreeNAS VM.
- **Replication failed:** Ensure both datasets exist and have enough space.

---

✅ Congratulations! You’ve now configured **advanced ZFS features**, tested **snapshots & replication**, and connected your **Lubuntu VM** to access the storage via NFS. This demonstrates how SAN integrates with client servers in real-world setups.

