# Lab: Docker Setup on RHEL/CentOS and Ubuntu/Debian

!!! tip "Lab Info"
    **Estimated Time:** 60–90 minutes
    **Audience:** Beginners
    **Tools used:** RHEL 9 / CentOS Stream, Ubuntu 22.04 / Debian 11, Docker CE (Community Edition)

---

!!! info "Learning Objectives"

    * Install Docker on Linux systems.
    * Understand how to start and enable Docker service.
    * Run a test container to verify installation.
    * Launch a simple Nginx container to see Docker in action.
    * Visualize Docker workflow in DevOps.

---
## Install Docker

=== "RHEL / CentOS"

    ### Step 1: Update system

    ```bash
    sudo dnf update -y
    ```

    **Explanation:** Updates your system packages for stability and compatibility.

    ---

    ### Step 2: Remove old versions (if any)

    ```bash
    sudo dnf remove docker \
                    docker-client \
                    docker-client-latest \
                    docker-common \
                    docker-latest \
                    docker-latest-logrotate \
                    docker-logrotate \
                    docker-engine
    ```

    **Explanation:** Removes old Docker versions that may cause conflicts.

    ---

    ### Step 3: Enable Docker CE repository

    ```bash
    sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    ```

    **Explanation:** Docker CE is not in RHEL/CentOS base repos. This command adds Docker’s official repo.

    ---

    ### Step 4: Install Docker CE

    ```bash
    sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```

    **Explanation:** Installs Docker Engine, CLI, container runtime, and Docker Compose plugin.

    ---

    ### Step 5: Start and enable Docker service

    ```bash
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo systemctl status docker
    ```

    **Explanation:** Starts Docker now and ensures it starts on boot.

    ---

    ### Step 6: Verify installation

    ```bash
    sudo docker run hello-world
    ```

    **Explanation:** Runs a test image from Docker Hub. If successful, Docker is working.

    ---

    ### Step 7: Run an Nginx container

    ```bash
    sudo docker run -d -p 8080:80 --name webserver nginx
    ```

    * Visit: `http://<your-server-ip>:8080`

    **Explanation:** Launches an Nginx web server container. Port `8080` on your host maps to container’s port `80`.


=== "Ubuntu / Debian"

    ### Step 1: Update system

    ```bash
    sudo apt update
    sudo apt upgrade -y
    ```

    **Explanation:** Updates package lists and upgrades existing packages.

    ---

    ### Step 2: Remove old versions

    ```bash
    sudo apt remove docker docker-engine docker.io containerd runc
    ```

    **Explanation:** Ensures no legacy Docker is present.

    ---

    ### Step 3: Install required packages

    ```bash
    sudo apt install -y ca-certificates curl gnupg lsb-release
    ```

    **Explanation:** These tools allow adding secure repositories and managing keys.

    ---

    ### Step 4: Add Docker’s official GPG key

    ```bash
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    ```

    **Explanation:** Adds Docker’s signing key to verify package integrity.

    ---

    ### Step 5: Set up repository

    ```bash
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

    **Explanation:** Adds Docker’s official repo to apt sources.

    ---

    ### Step 6: Install Docker CE

    ```bash
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```

    **Explanation:** Installs Docker engine, CLI, container runtime, and Compose plugin.

    ---

    ### Step 7: Start and enable Docker service

    ```bash
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo systemctl status docker
    ```

    **Explanation:** Starts Docker now and on future boots.

    ---

    ### Step 8: Verify installation

    ```bash
    sudo docker run hello-world
    ```

    **Explanation:** Confirms Docker can pull images from Docker Hub and run containers.

    ---

    ### Step 9: Run an Nginx container

    ```bash
    sudo docker run -d -p 8080:80 --name webserver nginx
    ```

    * Visit: `http://<your-server-ip>:8080`

    **Explanation:** Runs a web server inside a container and exposes it.

---

## Visualization of what happened

* **Docker Engine**: core service managing containers.
* **Images**: pre-packaged software (like templates).
* **Containers**: running instances of images.
* **Docker Hub**: central registry where images come from.
* **hello-world**: confirms Docker works.
* **nginx**: practical example of running an application container.

---
