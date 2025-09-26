# Lab 07: Configuring iSCSI Targets and Multipath I/O (High Availability Simulation)

**File:** Lab\_07\_iSCSI\_MPIO.md
**UUID:** 02a9a72e-61d6-47f8-9f4c-749ae6eaf0e2

---

## Introduction

In this lab, you will simulate a **high availability (HA) SAN setup** by configuring **iSCSI targets** in TrueNAS and enabling **Multipath I/O (MPIO)** on your **Lubuntu VM (from Lab 03)**. This demonstrates how enterprise servers connect to centralized block storage with redundancy.

By the end of this lab, you will:

* Enable and configure the iSCSI service in TrueNAS.
* Create an iSCSI target backed by a ZFS dataset.
* Simulate multiple network paths to the same target.
* Configure Multipath I/O (MPIO) on the Lubuntu VM.
* Verify redundancy and failover.

---

## Step 1: Preparing the Environment

1. Ensure your **TrueNAS VM (FreeNAS-Server)** is running with the **TechOpsPool** from Lab 05.
2. Ensure your **Lubuntu VM (from Lab 03)** is running and connected to the same network (Bridged Adapter).
3. Make sure both VMs can ping each other:

   ```bash
   ping <truenas-ip>
   ping <lubuntu-ip>
   ```

---

## Step 2: Configuring an iSCSI Target in TrueNAS

1. Log in to the **TrueNAS Web Interface**.
2. Go to **Sharing → Block Shares (iSCSI)**.
3. Click **Wizard**.

### iSCSI Wizard Steps

1. **Portal Setup**

   * Add Portal → IP: `<truenas-ip>`
   * Save.

2. **Initiators**

   * Leave default (allow all).

3. **Targets**

   * Name: `TechOpsTarget`
   * Group ID: 1

4. **Extents**

   * Type: `File` or `Device`
   * Path: `/mnt/TechOpsPool/iscsi_extent.img`
   * Size: 2 GB

5. **Associated Targets**

   * Link `TechOpsTarget` with the extent.

6. Save and restart the iSCSI service when prompted.

✅ You have now created an iSCSI target backed by your ZFS pool.

---

## Step 3: Simulating Multiple Network Paths

To simulate **multipathing** in VirtualBox:

1. In **TrueNAS VM → Settings → Network**:

   * Add a **second network adapter** (also set to Bridged Mode).
2. Restart the TrueNAS VM.
3. Assign an IP address to the second NIC inside TrueNAS (use the console menu if needed).
   Example:

   * NIC1: 192.168.1.120
   * NIC2: 192.168.1.121

✅ Now the same iSCSI target is reachable through two network paths.

---

## Step 4: Connecting Lubuntu to iSCSI Target

1. On Lubuntu VM, install iSCSI initiator tools:

   ```bash
   sudo apt update && sudo apt install open-iscsi multipath-tools -y
   ```

2. Discover iSCSI targets from TrueNAS:

   ```bash
   sudo iscsiadm -m discovery -t sendtargets -p <truenas-ip>
   sudo iscsiadm -m discovery -t sendtargets -p <second-truenas-ip>
   ```

3. Log in to discovered targets:

   ```bash
   sudo iscsiadm -m node -l
   ```

4. Verify with:

   ```bash
   lsblk
   ```

   You should see a new disk (e.g., `/dev/sdb`).

---

## Step 5: Configuring Multipath I/O (MPIO)

1. Enable multipath service:

   ```bash
   sudo systemctl enable multipath-tools
   sudo systemctl start multipath-tools
   ```

2. Check multipath configuration:

   ```bash
   sudo multipath -ll
   ```

   You should see both paths listed to the iSCSI target.

3. Create a filesystem and mount it:

   ```bash
   sudo mkfs.ext4 /dev/mapper/mpatha
   sudo mkdir /mnt/iscsi
   sudo mount /dev/mapper/mpatha /mnt/iscsi
   ```

4. Verify:

   ```bash
   df -h
   ls /mnt/iscsi
   ```

---

## Step 6: Testing High Availability

1. From VirtualBox, temporarily **disable one network adapter** of the TrueNAS VM.
2. On Lubuntu, run:

   ```bash
   multipath -ll
   ```

   You should still see one active path.
3. Access `/mnt/iscsi` and create a file:

   ```bash
   echo "HA Test File" | sudo tee /mnt/iscsi/test.txt
   ```
4. Re-enable the network adapter and verify both paths are restored.

✅ This confirms that multipath I/O maintains connectivity even if one path fails.

---

## Troubleshooting Tips

* **Target not visible:** Ensure iSCSI service is enabled on TrueNAS.
* **No multipath device:** Restart multipath service and check discovery commands.
* **Login errors:** Verify firewall rules and that both NICs are on the same subnet.
* **Performance issues:** Allocate more RAM/CPU to TrueNAS VM.

---

✅ Congratulations! You have successfully configured **iSCSI targets** on TrueNAS and set up **Multipath I/O** on Lubuntu to simulate high availability in a SAN environment.
