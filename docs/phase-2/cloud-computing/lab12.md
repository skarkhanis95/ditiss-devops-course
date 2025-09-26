# Lab: Bootstrapping Nodes with Chef Server

## Objectives
- Launch and configure two EC2 instances in AWS and bootstrap them to a Chef Server.  
- Apply the `web` role to one node and the `app` role to another.  
- Install Chef Client on a VirtualBox VM and bootstrap it with a chosen role.  

---

=== "Part 1 — Bootstrapping EC2 Instances on AWS"

    ### Step 1: Launch two EC2 instances
    1. Log in to your AWS account.  
    2. Launch **two EC2 instances**:
          - AMI: Ubuntu 22.04 LTS (or Amazon Linux 2).  
          - Instance type: `t2.micro` (Free Tier eligible).  
          - Key pair: create or use an existing `.pem` key.  
          - Security group: allow **SSH (22)** and **HTTP (80)**.  
    3. Name the instances:
          - `web-node`  
          - `app-node`  

    ---

    ### Step 2: Install Chef Client
    SSH into each node and install Chef Client:

    ```bash
    curl -L https://omnitruck.chef.io/install.sh | sudo bash -s -- -P chef -c stable
    ```

    **Verify installation:**

    ```bash
    chef-client --version
    ```

    ---

    ### Step 3: Download the organization validator key

    The instructor has shared a validator PEM (`ditissorg-validator.pem`) via S3.
    Download it on each node and save it as `/etc/chef/validation.pem`:

    ```bash
    # replace URL with the one provided by instructor
    curl -o validation.pem "https://ditiss-lab-bucket-sid3315.s3.eu-north-1.amazonaws.com/ditissorg-validator.pem"
    ```

    ```bash
    sudo mkdir -p /etc/chef
    sudo mv validation.pem /etc/chef/validation.pem
    sudo chmod 600 /etc/chef/validation.pem
    ```

    ---

    ### Step 4: Accept Chef licenses

    Chef requires license acceptance. Create the accepted license files:

    ```bash
    sudo mkdir -p /etc/chef/accepted_licenses
    echo > /etc/chef/accepted_licenses/chef_infra_client
    echo > /etc/chef/accepted_licenses/inspec
    sudo chmod 644 /etc/chef/accepted_licenses/*
    ```

    ---

    ### Step 5: Create Chef client configuration

    Create `/etc/chef/client.rb`. Replace `<CHEF_SERVER_PUBLIC_DNS>` with the DNS of the instructor’s Chef Server.

    ```bash
    sudo tee /etc/chef/client.rb <<EOF
    log_level        :info
    log_location     STDOUT
    chef_server_url  'https://ec2-13-49-73-88.eu-north-1.compute.amazonaws.com/organizations/ditissorg'
    validation_client_name 'ditissorg-validator'
    node_name        'web-node'
    ssl_verify_mode  :verify_none
    EOF
    ```

    On the `app-node`, change `node_name` to `app-node`.

    ---

    ### Step 6: Register node with Chef Server

    Run once on each node to register with Chef Server:

    ```bash
    sudo chef-client
    ```

    ---

    ### Step 7: Execute the role

    On each node, run chef-client with the appropriate role.

    **On `web-node`:**

    ```bash
    sudo chef-client -o 'role[web]'
    ```

    **On `app-node`:**

    ```bash
    sudo chef-client -o 'role[app]'
    ```

    ---

    ### Step 8: Verify results

    * On `web-node`:

    ```bash
    curl http://localhost
    ```

    Should display Apache test page.

    * On `app-node`:

    ```bash
    cat /etc/myapp/config.yml
    /opt/myapp/sample-app.sh
    ```

    ---

=== "Part 2 — Bootstrapping a VirtualBox VM"
    ### Step 1: Prepare the VM
    1. Create a new VirtualBox VM (Ubuntu 22.04 recommended).  
    2. Allocate at least 1 vCPU and 1 GB RAM.  
    3. Ensure the VM has network access to the Chef Server (bridge networking recommended).  

    ---

    ### Step 2: Install Chef Client
    Inside the VM:

    ```bash
    curl -L https://omnitruck.chef.io/install.sh | sudo bash -s -- -P chef -c stable
    ```

    ---

    ### Step 3: Download the validator key

    Download the validator PEM from the instructor’s S3 bucket and save it to `/etc/chef/validation.pem`:

    ```bash
    curl -o validation.pem "https://ditiss-lab-bucket-sid3315.s3.eu-north-1.amazonaws.com/ditissorg-validator.pem"

    sudo mkdir -p /etc/chef
    sudo mv validation.pem /etc/chef/validation.pem
    sudo chmod 600 /etc/chef/validation.pem
    ```

    ---

    ### Step 4: Accept Chef licenses

    ```bash
    sudo mkdir -p /etc/chef/accepted_licenses
    echo > /etc/chef/accepted_licenses/chef_infra_client
    echo > /etc/chef/accepted_licenses/inspec
    sudo chmod 644 /etc/chef/accepted_licenses/*
    ```

    ---

    ### Step 5: Configure client.rb

    Edit `/etc/chef/client.rb`:

    ```bash
    sudo tee /etc/chef/client.rb <<EOF
    log_level        :info
    log_location     STDOUT
    chef_server_url  'https://ec2-13-49-73-88.eu-north-1.compute.amazonaws.com/organizations/ditissorg'
    validation_client_name 'ditissorg-validator'
    node_name        'local-vm-node'
    ssl_verify_mode  :verify_none
    EOF
    ```

    ---

    ### Step 6: Register with Chef Server

    Run once to register:

    ```bash
    sudo chef-client
    ```

    ---

    ### Step 7: Execute a role

    Pick one role to apply (web or app).

    For **web role**:

    ```bash
    sudo chef-client -o 'role[web]'
    ```

    For **app role**:

    ```bash
    sudo chef-client -o 'role[app]'
    ```

    ---

    ### Step 8: Verify

    * If `web` role applied: check the Apache page

    ```bash
    curl http://localhost
    ```

    * If `app` role applied: check app config and sample script

    ```bash
    cat /etc/myapp/config.yml
    /opt/myapp/sample-app.sh
    ```

    ---



## Deliverables

* **Screenshot 1:** `knife node list` showing your node registered.
* **Screenshot 2:** Output of `curl http://<web-node-ip>` (web role) or `cat /etc/myapp/config.yml` (app role).
* **Screenshot 3:** VM bootstrap output (`chef-client` run log).

---

## Cleanup

* Terminate AWS instances when finished.
* Remove validator PEM from nodes (`sudo rm /etc/chef/ditissorg-validator.pem`) — they now use their own `client.pem`.



---