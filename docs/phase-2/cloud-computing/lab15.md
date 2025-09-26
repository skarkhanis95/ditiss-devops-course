## Lab 2: Configuring Nagios on Linux Server and Adding Windows Client

---

=== "**Option A: Local (VirtualBox)**"

    #### **1. Setup Windows Client VM**

    1. Download **Windows Server 2019/2022 Evaluation ISO** (from Microsoft).
    2. In VirtualBox → **New → Name: WindowsClient → Type: Windows (64-bit)**.
    3. Assign: 4096 MB RAM, 40 GB disk.
    4. Install Windows → create admin account `student`.
    5. Enable **Remote Desktop** for convenience.

    #### **2. Install NSClient++**

    1. Download from [NSClient++ website](https://nsclient.org).
    2. Install with options:

          * Enable NRPE Server.
          * Enable CheckHelpers.
  
    3. Edit config file:

          * Allow Nagios server IP under `allowed hosts`.
          * Enable NRPE.

    #### **3. Verify NRPE**

    * From Nagios server:

    ```bash
    /usr/lib/nagios/plugins/check_nrpe -H <windows-client-ip>
    ```

    #### **4. Add Windows Client to Nagios**

    ```bash
    sudo nano /etc/nagios4/conf.d/windowsclient.cfg
    ```

    Example config:

    ```
    define host {
        use             windows-server
        host_name       windows-client
        address         <windows-client-ip>
        check_period    24x7
        max_check_attempts  5
        notification_interval 30
        notification_period   24x7
    }
    ```

    Restart Nagios and check web UI.

    ---

=== "**Option B: AWS Setup (EC2 with Windows Server)**"

    #### **1. Launch Windows Server EC2**

    1. AWS Console → EC2 → Launch Instance.
    2. AMI: **Microsoft Windows Server 2019 Base**.
    3. Instance type: `t2.micro` (not free tier, may incur cost).
    4. Security Group: Allow **RDP (3389)** from your IP, and allow Nagios server IP on NRPE port.
    5. Download password → Decrypt with `.pem` key → RDP into server.

    #### **2. Install NSClient++**

    (Same as VirtualBox instructions).

    #### **3. Configure Nagios Server**

    (Same host config as above).

    ✅ Check Windows client appears in Nagios web UI.

    ---

