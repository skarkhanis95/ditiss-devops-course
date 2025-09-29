# Lab 16: Basic Git & GitHub

!!! tip "Lab Info"
    **Estimated time:** 90–120 minutes
    **Audience:** Absolute beginners (assumes no prior git/GitHub experience)
    **Tools used:** Git (Git Bash on Windows or native Linux shell), GitHub account, a text editor (Notepad / VS Code / nano), web browser.


---

!!! info "Learning goals"

    * Install Git on Windows and Linux.
    * Create a GitHub account and repository.
    * Generate SSH keys on local machines and add them to GitHub.
    * Initialize a local git repository with a `README.md`.
    * Push the repository to GitHub over SSH.
    * Create a branch, edit files, push branch, open a Pull Request (PR), merge it, and delete the remote branch.
    * Make and commit changes directly on GitHub and then pull those into the local copy.
    * Practice the full round-trip workflow engineers use every day.

---

## 1. Install Git (Windows OR Linux)

=== "Windows"

    1. Open your browser and go to [https://git-scm.com/download/win](https://git-scm.com/download/win) and download the installer (Git for Windows).
    2. Run the installer and accept defaults. Important options:

           * Use the bundled **Git Bash** as your default terminal for Git.
           * Choose the option to use the OpenSSH provided by Git (default).
  
    3. After install, open **Git Bash** from the Start menu.
    4. Verify installation:

    ```bash
    git --version
    ```

    You should see output like `git version 2.x.x`.

    >**Explanation:** You installed Git, which provides the command-line tools to track file changes and communicate with remote repositories. Git Bash gives you a Unix-like shell on Windows which works well with SSH.


=== "Linux (Debian/Ubuntu)"

    ```bash
    sudo apt update
    sudo apt install -y git
    git --version
    ```
    >**Explanation:** On Linux you install the system Git package. The `git --version` confirms it’s available.

=== "Linux (Redhat/CentOS)" 

    ```bash
    sudo dnf install -y git        # or `yum install -y git`
    git --version
    ```

    >**Explanation:** On Linux you install the system Git package. The `git --version` confirms it’s available.

---

## 2. Create a GitHub account

1. Open your web browser and go to [https://github.com](https://github.com).
2. Click **Sign up** (or **Create account**) and follow the guided steps: choose username, email, password, and verify.
3. (Optional) Choose the free plan.

>**Explanation:** GitHub is a popular Git hosting service that stores your repositories online and provides collaboration features (PRs, issues, web editor). You need an account to push code and create pull requests.

---

## 3. Create and upload SSH keys to GitHub (Windows & Linux)

> **Why SSH?** SSH keys let you connect to GitHub securely without typing your password every time.

### 3.1 Generate SSH key (both Windows Git Bash & Linux)

Open **Git Bash** (Windows) or your Linux shell and run:

```bash
# generate an RSA key (ED25519 is also good - alternative below)
ssh-keygen -t ed25519 -C "your_email@example.com"
```

If your system doesn't support `ed25519`, use:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

When prompted:

* Press **Enter** to accept default file location (`~/.ssh/id_ed25519`).
* Enter a passphrase (recommended) or press Enter for none.

>**Explanation:** `ssh-keygen` creates a private key (keep secret) and a public key (you will upload). The `-C` tag is a label (usually your email).

---

### 3.2 Start the SSH agent and add the key

**In Git Bash (Windows):**

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**In Linux (if needed):**

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

>**Explanation:** The SSH agent holds your decrypted private keys while your session runs; `ssh-add` registers your key so Git can use it.

---

### 3.3 Copy the public key and add to GitHub

1. Print the public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

2. Select and copy the whole key (starts with `ssh-ed25519` or `ssh-rsa` and ends with your email).

3. On GitHub:

      * Click your profile photo → **Settings** → **SSH and GPG keys** → **New SSH key**.
      * Title: `Laptop - Windows` or `Desktop - Linux` (helpful label).
      * Paste the public key into the field and **Add SSH key**. Confirm your GitHub password if prompted.

**Verify connection:**

1. Back to your terminal/Git Bash on your local machine

```bash
ssh -T git@github.com
```

Expected friendly message (first time may ask to confirm fingerprint):

* If success: `Hi username! You've successfully authenticated...` or a similar greeting.

>**Explanation:** You uploaded the public key to GitHub so GitHub can verify your machine when you push over SSH. `ssh -T git@github.com` tests the connection.

---

## 4. Create a repo locally (README.md) and initialize git

> We'll create a simple project folder with a `README.md` and commit it.

### 4.1 Create directory and initialize

In your terminal:

```bash
# choose a place, e.g., your home directory or projects folder
mkdir -p ~/git-labs/readme-demo
cd ~/git-labs/readme-demo

# initialize a new git repository
git init -b main
```

`-b main` creates the branch `main` (modern default).

### 4.2 Configure Git identity (first-time only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

### 4.3 Create README.md and commit

Create `README.md` (use any editor; examples below use a one-line echo):

```bash
echo "# README Demo" > README.md
echo "This is my first README for the Git & GitHub lab." >> README.md

git add README.md
git commit -m "Initial commit: add README.md"
```

>**Explanation:** `git init` creates a `.git` folder that tracks history. `git add` stages changes, and `git commit` records them. `README.md` is a simple file we track.

---

## 5. Create remote repo on GitHub and push local repo (SSH)

### 5.1 Create a remote repository on GitHub (web UI)

1. On GitHub, click **+** → **New repository**.
2. Name: `readme-demo` (or your chosen name). Keep it **Public** for the lab (or Private if required).
3. **Do not** initialize with a README (we already have one locally). Click **Create repository**.

You will see instructions; copy the SSH remote URL:

```
git@github.com:your-username/readme-demo.git
```

### 5.2 Add remote and push

Back in your terminal:

```bash
git remote add origin git@github.com:your-username/readme-demo.git
git branch --show-current       # should show main
git push -u origin main
```

`-u` sets the upstream; future `git push`/`git pull` will default to `origin main`.

>**Explanation:** You linked your local repo to the GitHub remote `origin` and pushed commits. Now the repo appears on GitHub.

---

## 6. Branching, editing, PR, merge, and deleting remote branch

This shows how collaboration works: create a feature branch, push, open a Pull Request, merge it into `main`, then delete the branch.

### 6.1 Create a new branch locally

```bash
git checkout -b feature/update-readme
# make an edit to README.md
echo "" >> README.md
echo "## Updates from feature branch" >> README.md

git add README.md
git commit -m "Update README: add feature section"
```

`git checkout -b` both creates and switches to the branch.

>**Explanation:** A branch lets you make changes without affecting `main` until you decide to merge. This is how teams develop features in isolation.

---

### 6.2 Push branch to GitHub

```bash
git push -u origin feature/update-readme
```

>**Explanation:** Pushing publishes your branch so others (and the GitHub UI) can see the proposed changes.

---

### 6.3 Create Pull Request (PR) on GitHub (web)

1. Go to your repository on GitHub. You’ll usually see a banner **Compare & pull request** for your pushed branch — click it.
   Or: **Pull requests** → **New pull request**, choose base `main` and compare `feature/update-readme`.
2. Title the PR: `Update README — add feature section`.
3. Add a short description and click **Create pull request**.
4. Review the changes and click **Merge pull request** → **Confirm merge**.
5. After merging, GitHub will offer to **Delete branch** — click **Delete branch**.

>**Explanation:** A Pull Request is a formal request to merge your branch into `main`. It lets reviewers see diffs, discuss, and then merge. Deleting the remote branch after merge keeps the repository tidy (history is preserved).

---

### 6.4 Or delete remote branch from terminal (Optional)

If you prefer command line deletion:

```bash
# local branch deletion
git branch -d feature/update-readme

# delete remote branch
git push origin --delete feature/update-readme
```

**Explanation:**
`git branch -d` deletes the local copy (only if merged). `git push origin --delete` removes the branch on GitHub.

---

## 7. Make changes directly on GitHub (edit README on the website)

1. On GitHub repo page, open `README.md`.
2. Click the pencil icon (Edit this file).
3. Add a new line: `This change was made directly on GitHub.`
4. Scroll down to **Commit changes**:

      * Choose **Commit directly to the `main` branch** (for this lab).
      * Add a commit message and click **Commit changes**.

>**Explanation:** GitHub’s web editor allows quick edits without cloning. Committing to `main` simulates, for example, small fixes or documentation updates done via the web UI.

---

## 8. Pull the latest changes locally, make new local changes and push again

### 8.1 Pull the changes from GitHub to local main

Back in terminal:

```bash
git checkout main
git pull origin main
```

You should now see the change you made on GitHub in your local `README.md`.

>**Explanation:** `git pull` updates your local branch with the remote changes. Always pull before starting new local work to avoid conflicts.

---

### 8.2 Make a new local change and push

```bash
# make a local edit
echo "" >> README.md
echo "Local edit: pulled GitHub changes and now adding more." >> README.md

git add README.md
git commit -m "Local: extend README after pulling remote changes"
git push origin main
```

>**Explanation:** You added a local change after syncing. Pushing uploads your commit to GitHub. This completes the round-trip: local → remote → remote edit → local pull → local → remote.

---

## Quick Command Summary (copy/paste cheat-sheet)

```bash
# basic identity
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# init repo
mkdir repo && cd repo
git init -b main

# create files
echo "# Title" > README.md
git add README.md
git commit -m "Initial commit"

# add remote & push
git remote add origin git@github.com:username/repo.git
git push -u origin main

# branch workflow
git checkout -b feature/x
# edit files...
git add .
git commit -m "Work"
git push -u origin feature/x
# create PR on GitHub, merge there
git checkout main
git pull origin main
git branch -d feature/x
git push origin --delete feature/x

# verify SSH
ssh -T git@github.com
```

---

## Troubleshooting & tips

* **Permission denied (publickey)** when pushing:

    * Ensure your SSH key was added to GitHub and `ssh-agent` has the private key loaded.
    * Test with `ssh -T git@github.com`. If you see an error, re-check key upload and `ssh-add`.

* **User identity not set**: Git will prompt. Set `user.name` and `user.email` as shown.
* **Remote denied error when pushing**: Confirm correct remote URL `git@github.com:username/repo.git`.
* **Default branch is `master`** on older setups: adapt commands or create `main` with `git branch -M main`.
* **Conflicts when pulling**: Git will tell you files conflict; open the files, resolve the conflict markers, then `git add` and `git commit`.

---

## What you just learned — conceptual explanation (visualize the workflow)

* **Local repository**: Your machine’s project folder with a `.git` folder that tracks changes and history.
* **Commit**: A saved snapshot of changes (like a safe restore point).
* **Branch**: A parallel line of development; you can experiment without risking `main`.
* **Remote (origin)**: The copy of the repository stored on GitHub — a central place for collaboration.
* **Push**: Upload your local commits to the remote.
* **Pull**: Fetch remote changes and merge them into your local branch.
* **Pull Request (PR)**: A reviewable, auditable change request that lets teammates review/merge code.
* **Merging**: Combining changes from a branch into another (typically `main`).
* **SSH Keys**: Secure, passwordless authentication between your machine and GitHub.

Visualize it as a set of islands:

* Your laptop is an island (local).
* GitHub is the central island (remote).
* Bridges (push/pull) carry your changes across.
* Branches are temporary islands you can create and remove as you work on features.

---

## Extra exercises (optional)

* Try creating an `issue` on GitHub and link it in the PR description.
* Use `git log --graph --oneline --all` to see the commit graph.
* Try cloning your repo to a second local folder and simulate two collaborators editing.

---
