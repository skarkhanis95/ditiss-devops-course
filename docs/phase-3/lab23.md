# Lab 23: Connecting to Docker Swarm Manager & Workers and Joining the Cluster

---

!!! tip "Objective"

    By the end of this section you will:

    * Initialize Docker Swarm on the **manager node**.
    * Connect **worker nodes** to the manager.
    * Verify that the cluster is up and running.
    * Continue with service creation, scaling, and updating.

---

## Initialize the Swarm on the Manager Node

=== "Using **PuTTY** (Windows)"

    1. Open **PuTTY**.
    2. In the **Host Name (or IP address)** box, enter the **Public IP of the Manager node**.

       * Example: `3.110.25.200`
    3. In **Connection → Data**, set the login username to `ubuntu` (for Ubuntu AMI).
    4. In **Connection → SSH → Auth**, browse to your **private key (.ppk)** file.

       * If you only have `.pem` from AWS, first convert it to `.ppk` using **PuTTYgen**.
    5. Click **Open** → accept the warning → log in.
    6. Once logged in, run:

       ```bash
       docker swarm init --advertise-addr <manager_private_ip>
       ```

       Replace `<manager_private_ip>` with the **private IP address** of the manager (shown in AWS console). Example:

       ```bash
       docker swarm init --advertise-addr 10.0.1.10
       ```

=== "Using **Windows Terminal (OpenSSH)**"

    1. Open **Windows Terminal**
    2. Navigate to the folder with your AWS key (`.pem`). Example:

       ```powershell
       cd C:\Users\YourName\Downloads
       ```
    3. Connect to the Manager using SSH:

       ```powershell
       ssh -i mykey.pem ubuntu@<manager_public_ip>
       ```

       Example:

       ```powershell
       ssh -i mykey.pem ubuntu@3.110.25.200
       ```
    4. Once logged in, run:

       ```bash
       docker swarm init --advertise-addr <manager_private_ip>
       ```

       Example:

       ```bash
       docker swarm init --advertise-addr 10.0.1.10
       ```

---

✅ Output: You will see a message like this:

```
Swarm initialized: current node (abcd1234...) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-xyz <manager_private_ip>:2377
```

👉 **Copy the entire `docker swarm join` command**. You’ll use it on the worker nodes.

---

## Add Worker Nodes to the Swarm

=== "Using **PuTTY**"

    1. Open **PuTTY** again.
    2. Enter the **Public IP of Worker 1**.
    3. Set username to `ubuntu`.
    4. Load the same private key `.ppk` as before.
    5. Connect and log in.
    6. Run the **join command** you copied from the Manager:

    ```bash
    docker swarm join --token SWMTKN-1-xyz 10.0.1.10:2377
    ```

    Repeat the same process for **Worker 2** (and any additional workers).



=== "Using **Windows Terminal (OpenSSH)**"

    1. From PowerShell, connect to Worker 1:

    ```powershell
    ssh -i mykey.pem ubuntu@<worker1_public_ip>
    ```
    2. Run the join command:

    ```bash
    docker swarm join --token SWMTKN-1-xyz 10.0.1.10:2377
    ```
    3. Repeat for Worker 2:

    ```powershell
    ssh -i mykey.pem ubuntu@<worker2_public_ip>
    docker swarm join --token SWMTKN-1-xyz 10.0.1.10:2377
    ```

---

## Verify Nodes on the Manager

Reconnect to the **Manager node** (PuTTY or SSH) and run:

```bash
docker node ls
```

✅ You should see:

* 1 Manager (Leader).
* 2 Workers (Ready).

Example:

```
ID                            HOSTNAME   STATUS   AVAILABILITY   MANAGER STATUS   ENGINE VERSION
abcd1234efgh                  manager1   Ready    Active         Leader           24.0.7
ijkl5678mnop                  worker1    Ready    Active                          24.0.7
qrst9012uvwx                  worker2    Ready    Active                          24.0.7
```

---
