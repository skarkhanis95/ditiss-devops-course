# Lab 07: Configuring iSCSI Targets and Multipath I/O (High Availability Simulation)

!!! danger "Alert"
      This lab is not tested and may result in unexpected outcomes. The idea is to show how iSCSI is configured on TrueNAS


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


## Step 2: Create a Zvol

1. Browse to **Datasets** → Click on your **TechOpsPool**
2. Click **Add Zvol** → Zvol name: `iscsi_zvol`, Size for this zvol: `10 GiB`.
3. Leve all other fields as default
4. Click on **Save**

## Step 3: Enable iSCSI Service

* Go to **System → Services**
* **iSCSI** → Running (Select) + Start Automatically (Select).


## Step 4: Configure iSCSI Target Wizard

Go to **Shares → Block Shares (iSCSI) → Wizard**. 

1. **Target**

      * Target → *Create New*.

2. **Extent**

      * Name: `extent0`.
      * Extent Type: **Device**.
      * Device: Select the Zvol (`iscsi_zvol`).
      * All other settings as default.

3. **Portal Options**

      * **Portal:** `Create New`
      * **IP Address:** `Add`
        * IP Address: 0.0.0.0   
      * **Initiators:** `Leave Blank`
  
4. Click on `Save`

---



## Step 5: Adding a 2nd NIC in VirtualBox


=== "If you are on bridged mode"

      **Power Down TrueNAS VM**

      * In VirtualBox main window → **select TrueNAS VM**
      * Click **Close → Power Off** (or shut down gracefully inside TrueNAS).


       **2. Open VM Settings **

      * Highlight your TrueNAS VM.
      * Click **⚙️ Settings** on the toolbar.



      **Go to Network**

      * In the left menu → click **Network**.
      * You’ll see **Adapter 1** already enabled (your current NIC).



      **Enable Adapter 2**

      * Click the **Adapter 2** tab.
      * Tick ✅ **Enable Network Adapter**.



      **Configure Adapter 2**

      * **Attached to:** `Bridged Adapter`
      * **Name:** Select your host’s actual physical network interface (e.g. Wi-Fi card or Ethernet port).
      * **Promiscuous Mode:** `Allow All` (recommended for iSCSI multipath so no weird filtering happens).
      * **Cable Connected:** ✅ checked.


      **Save & Boot**

      * Click **OK**.
      * Start the TrueNAS VM.

=== "If you are on NAT + Host Only Network"

      **Change your network settings for `192.x.x.x`**

      * Go to **Networks** from right side menu
      * Under the **Interfaces** -> Note down your both of the IPs that are listed
      * Click on **Pencil** icon of the interface which has IP starting from `192.168.x.x`
      * Unselect **DHCP**
      * Unselect **Autoconfigure IPv6**
      * Under the **Aliases**
          * Enter the IP that you have noted down which started from `192.168.x.x` and `/24`
      * Click on `Save`
      * On the `Networks` page you will see `Test Changes` button
      * Above the said button you will see `Test network interace changes for **60** seconds`
      * Click on the `60` and change to `10`
      * Click on 'Test Changes`
      * Click on `Confirm` and `Save Changes`
      * **Immediately you will see another button on page saying `Save Changes` click on that within **10** seconds.

      **Change your network settings for NAT network**

      * Go to **Networks** from right side menu
      * Under the **Interfaces** -> Note down your both of the IPs that are listed
      * Click on **Pencil** icon of the interface which has IP starting from `10.0.x.x`
      * `Unselect` **DHCP**
      * `Unselect` **Autoconfigure IPv6**
      * Under the **Aliases**
          * Enter the IP that you have noted down which started from `10.0.x.x` and `/24`
      * Click on `Save`
      * On the `Networks` page you will see `Test Changes` button
      * Above the said button you will see `Test network interace changes for **60** seconds`
      * Click on the `60` and change to `10`
      * Click on 'Test Changes`
      * Click on `Confirm` and `Save Changes`
      * **Immediately you will see another button on page saying `Save Changes` click on that within **10** seconds.

      **Add additonal portal**

      * In the search above, type `portals` and select **Shares -> iSCSI -> Portals**
      * Click on the pencil icon of on the existing portal which will start from `0.0.0.0`
      * In the **IP Address** section:
          * Click on drop down which says 0.0.0.0 and select the IP which you have configured in previous step starting from `10.0.x.x`
          * Click on `Save`
      * Click on `Add` button:
          * In IP Address section again click on `Add`
          * Select the IP from drop down which starts from `192.168.x.x`
          * Click on `Save`
  


---

## Step 6: Connecting Lubuntu to iSCSI Target

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

## Step 7: Configuring Multipath I/O (MPIO)

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
