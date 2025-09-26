
## Lab 14: Configuring Nagios on Linux Server and Adding Linux Client

---




=== "**Option A: Local Setup (VirtualBox)**"

    #### **1. Prerequisites**

    * Install **VirtualBox** (latest version).
  
    * Download:

        * **Ubuntu Server ISO** (22.04 LTS recommended).
        * **Debian/Ubuntu Minimal ISO** for client.

    #### **2. Create Nagios Server VM**

    1. Open **VirtualBox → New → Name: NagiosServer**.
    2. Choose:

          * Type: `Linux`
          * Version: `Ubuntu (64-bit)`
          * Memory: `2048 MB`
          * Disk: `20 GB (VDI, Dynamically allocated)`
    3. Attach the Ubuntu ISO to the VM and start installation.
    4. During install:

          * Set hostname: `nagios-server`
          * Username: `student` / Password: `student123`
          * Install **OpenSSH server** (select during setup).

    #### **3. Install Nagios Core on Server**

    ```bash
    sudo apt update
    sudo apt install -y nagios4 nagios-plugins nagios-nrpe-plugin apache2
    ```

    * Access web UI:

        * Open browser → `http://<server-ip>/nagios4`
        * Default user: `nagiosadmin` (create password with `htpasswd`).

    #### **4. Create Linux Client VM**

    1. In VirtualBox → **New → Name: LinuxClient**.
    2. Install minimal Ubuntu/Debian with hostname `linux-client`.
    3. Ensure network is **Bridged Adapter** so both VMs are in same LAN.

    #### **5. Install NRPE on Client**

    ```bash
    sudo apt update
    sudo apt install -y nagios-nrpe-server nagios-plugins
    ```

    * Edit config:

    ```bash
    sudo nano /etc/nagios/nrpe.cfg
    ```

    * Add server IP under:

    ```
    allowed_hosts=<nagios-server-ip>
    ```

    * Restart service:

    ```bash
    sudo systemctl restart nagios-nrpe-server
    ```

    #### **6. Add Client to Nagios Server**

    **On Nagios server**:

    ```bash
    sudo nano /etc/nagios4/conf.d/linuxclient.cfg
    ```

    Example config:

    ```
    define host {
        use             linux-server
        host_name       linux-client
        address         <client-ip>
        max_check_attempts  5
        check_period    24x7
        notification_interval 30
        notification_period   24x7
    }
    ```

    * Restart Nagios:

    ```bash
    sudo systemctl restart nagios4
    ```

    ✅ Check web UI → you should see `linux-client` as monitored host.

    ---

=== "**Option B: AWS Setup (EC2 Instances)**"

    #### **1. Setup EC2 Nagios Server**

    1. Login to **AWS Console → EC2 → Launch Instance**.
    2. Name: `NagiosServer`.
    3. AMI: **Ubuntu Server 22.04 LTS** (Free Tier).
    4. Instance type: `t2.micro`.
    5. Configure Security Group: Allow inbound **SSH (22)**, **HTTP (80)**.
    6. Download key pair → `nagios-key.pem`.
    7. Launch instance → Connect via SSH:

    ```bash
    chmod 400 nagios-key.pem
    ssh -i nagios-key.pem ubuntu@<public-ip>
    ```

    #### **2. Install Nagios Core**

    (Same commands as VirtualBox).

    #### **3. Setup EC2 Linux Client**

    8. Launch another EC2 instance: Name `LinuxClient`.
    9. Same AMI and type (`t2.micro`).
    10. Security group: Allow SSH, and allow Nagios server IP on port 5666 (NRPE).
    11. Install NRPE (same as VirtualBox client).

    #### **4. Add Client to Server**

    (Same Nagios config steps).

    ✅ Verify in web UI → client status visible.

    ---

