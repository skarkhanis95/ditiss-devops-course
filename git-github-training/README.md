# Git & GitHub — 4-hour Training (Labs Included)

## Overview
This is a self-contained 4-hour workshop module covering Git and GitHub from absolute scratch. It includes a concise lecture plan, hands-on labs with step-by-step instructions and expected outputs, troubleshooting tips, and further resources. Use this in a college session to teach students how to use Git locally and collaborate on GitHub.

Estimated duration: 4 hours (including short breaks and Q&A)

Target audience: Beginners with little or no experience with Git and GitHub.

Prerequisites for students:
- A laptop with internet access
- Homebrew (macOS) or apt/chocolatey (optional) if they want to install Git
- A GitHub account (students should create one before the session)

Setup before class (instructor asks students to complete):
1. Install Git: https://git-scm.com/downloads
2. Create a GitHub account: https://github.com/
3. Configure GitHub SSH keys (optional but recommended):
   - `ssh-keygen -t ed25519 -C "your_email@example.com"`
   - `eval "$(ssh-agent -s)"`
   - `ssh-add ~/.ssh/id_ed25519`
   - Copy `~/.ssh/id_ed25519.pub` and add to GitHub Settings → SSH and GPG keys
4. Install VS Code or any code editor and the Git extension (optional)

----------------------

## Learning objectives
By the end of this 4-hour session students will be able to:
- Explain what version control is and why Git is widely used
- Use Git to track changes, commit, and inspect history locally
- Create and manage branches, resolve simple merge conflicts
- Push to and pull from GitHub, create forks, and open pull requests
- Understand basic collaboration workflows and code reviews on GitHub

----------------------

## Session schedule (4 hours)
- 00:00–00:10 — Welcome, objectives, and prerequisites check
- 00:10–00:40 — Part A: Version control concepts + Git basics (lecture + demo)
- 00:40–01:10 — Lab 1: Git basics — local repo and commits
- 01:10–01:20 — Short break
- 01:20–01:50 — Part B: Branching and merging (lecture + demo)
- 01:50–02:20 — Lab 2: Branching, feature branches, merge
- 02:20–02:30 — Short break
- 02:30–03:00 — Part C: Remotes and GitHub (lecture + demo)
- 03:00–03:40 — Lab 3: GitHub workflow — clone, push, pull, PR
- 03:40–03:55 — Lab 4: Collaboration & conflict resolution
- 03:55–04:00 — Wrap-up, resources, follow-up assignments

----------------------

## Lecture notes & demo checklist (short)
1. What is VCS? Centralized vs Distributed
2. What is Git? Snapshots, commits, SHA-1 (brief), staging area
3. Key Git objects: blobs, trees, commits, refs
4. Common workflows: feature branches, forking workflow, pull requests
5. Remotes: origin, upstream
6. Basic safety: .gitignore, not committing secrets

Demo commands to run live (explain each):
- `git --version`
- `git config --global user.name "Your Name"`
- `git config --global user.email "you@example.com"`
- `git init`
- `git status`
- `git add` / `git commit -m "message"`
- `git log --oneline --graph --decorate --all`
- `git branch` / `git checkout -b feature` (or `git switch -c feature`)
- `git merge feature`
- `git remote add origin git@github.com:username/repo.git` or `https://...`
- `git push -u origin main` / `git pull`

----------------------

## Labs
All labs assume students are working on their own machine. Instructors may create a starter repo (or use this repo) to share.

Lab 1 — Git basics (30 minutes)
Goal: Initialize a repo, create commits, and view history.

Step-by-step:
1. Make a working folder and initialize a repo:
   - `mkdir lab1-git-basics && cd lab1-git-basics`
   - `git init`
2. Configure user (if not set):
   - `git config user.name "Student Name"`
   - `git config user.email "student@example.com"`
3. Create a README:
   - `echo "# Lab 1 - Git Basics" > README.md`
4. Check status and add files:
   - `git status`
   - `git add README.md`
   - `git commit -m "Add README for lab 1"`
5. Make a change and commit:
   - `echo "\nLesson notes" >> README.md`
   - `git add -A`
   - `git commit -m "Update README with notes"`
6. Explore history:
   - `git log --oneline --graph --decorate`

Expected outcomes and checks:
- `git status` after init shows no commits and an untracked README before adding
- `git log` shows two commits

Stretch tasks:
- Use `git diff` before committing to see changes
- Try `git add -p` to interactively stage parts of changes


Lab 2 — Branching & Merging (30 minutes)
Goal: Create a feature branch, work on it, merge into main, and inspect history.

Steps:
1. From the lab folder, ensure you are on main (or master):
   - `git checkout -b main` (if repo default is master, adapt)
2. Create a new branch for a feature:
   - `git checkout -b feature/header`
3. Make changes:
   - `mkdir src && echo "<h1>Feature Header</h1>" > src/index.html`
   - `git add . && git commit -m "Add feature header HTML"`
4. Switch back and merge:
   - `git checkout main`
   - `git merge feature/header --no-ff -m "Merge feature/header"`
5. Visualize the history:
   - `git log --oneline --graph --all`

Conflict simulation (optional stretch):
- Instructor can instruct two students to change the same line and try to merge, then resolve conflicts:
  - When conflict occurs, open the file, look for `<<<<<<<` / `=======` / `>>>>>>>`
  - Edit to resolve, `git add`, then `git commit`

Expected outcomes:
- After merge, main contains changes from feature branch.
- `git log` shows merger commit (if --no-ff used) or a fast-forward depending on state.


Lab 3 — Remotes & GitHub (40 minutes)
Goal: Push local repo to GitHub, create a fork, open a Pull Request.

Instructor setup options:
- Option A (simpler): Instructor creates an empty GitHub repo `class-labs/git-basics-starter` and shares the HTTPS or SSH URL with students.
- Option B: Students fork the instructor repo to their personal accounts.

Steps (Option A - push to personal repo):
1. Create a new GitHub repo named `lab1-<your-username>` via the web (or precreate and share URL)
2. Link local repo to remote:
   - `git remote add origin git@github.com:<your-username>/lab1-yourname.git`
3. Push main branch:
   - `git push -u origin main`
4. On GitHub, create a new branch `feature/ui` and edit README using the web editor, or push branch from local:
   - `git checkout -b feature/ui`
   - `echo "UI notes" >> README.md && git add README.md && git commit -m "Add UI notes"`
   - `git push -u origin feature/ui`
5. Open a Pull Request on GitHub from `feature/ui` into `main` and add a short description.
6. Perform code review in class: add a comment, request changes, then merge the PR using the GitHub UI.

Fork & PR workflow (Option B):
- Fork the instructor repo using GitHub web UI
- Clone your fork: `git clone git@github.com:<your-username>/instructor-repo.git`
- Add upstream remote: `git remote add upstream git@github.com:instructor/instructor-repo.git`
- Make changes in a branch, push to your fork, and open PR against instructor repo.

Expected results:
- Students successfully push to GitHub
- Students create and merge PRs

Troubleshooting tips:
- Permission issues: Confirm SSH key added or use HTTPS with `git push https://...` and personal access token (PAT) if needed
- `git.pull` with diverged branches: `git pull --rebase` or resolve merge commits


Lab 4 — Collaboration, Conflicts & PR Review (20 minutes + 15 minutes)
Goal: Practice resolving merge conflicts, reviewing PRs, and using issues.

Steps:
1. Split students into pairs. Both clone same repo or fork and collaborate.
2. Student A creates a file `CONTRIBUTING.md` and pushes a branch `contrib/add-guidelines` with some content.
3. Student B edits the same file on `main` or creates a conflicting change and pushes.
4. Have Student A open a PR; when collaborator tries to merge they'll see conflict — resolve via CLI or GitHub web.
5. Walk through conflict markers and resolution, commit, and finish PR.

Using issues and PR reviews:
- Show how to: create an issue, assign, label, link PRs to issues by mentioning `#issueNumber`
- Explain reviewers, requested changes, approving, merging with options (squash, merge commit, rebase)

Expected results:
- Students resolve a simple text conflict and merge
- Students create and close an issue and link it to a PR


----------------------

## Assessment / Homework (post-class)
- Complete a short assignment: Use the fork-and-pr branch workflow to add a small feature (README improvement or small code file) to a shared classroom repo, open a PR, and get it merged.
- Deliverable: Link to the merged PR and a short write-up (1 paragraph) describing what they learned.

----------------------

## Appendix: Useful commands cheat sheet
- Configure: `git config --global user.name "Name"; git config --global user.email "you@example.com"`
- Create repo: `git init`
- Clone: `git.clone git@github.com:user/repo.git`
- See status: `git status`
- Stage: `git add <file>` or `git add -A`
- Commit: `git commit -m "message"`
- Log: `git log --oneline --graph --decorate --all`
- Branch: `git branch`, `git.checkout -b <name>` or `git switch -c <name>`
- Merge: `git merge <branch>`
- Push: `git push` / `git push -u origin <branch>`
- Pull: `git pull` / `git.pull --rebase`
- Remote: `git remote -v`, `git remote add origin <url>`

----------------------

## Further resources
- Pro Git book (free): https://git-scm.com/book/en/v2
- GitHub Learning Lab: https://lab.github.com/
- Interactive tutorials: https://learngitbranching.js.org/

----------------------

If you'd like, I can also:
- Split these labs into individual files (one per lab)
- Create starter repos or template repos in this GitHub organization/repo for students to clone
- Add slide notes or a presenter script for the 4-hour session
