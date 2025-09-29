# Lab 25: Destroying All Terraform Resources

1. Go to your Terraform project folder (where `main.tf` is located):

```bash
cd ~/swarm-terraform
```

2. Initialize (only needed if not already initialized):

```bash
terraform init
```

3. Run **destroy** with confirmation prompt:

```bash
terraform destroy
```

Terraform will show you a plan of what will be deleted and ask:

```
Do you really want to destroy all resources?  Enter a value: yes
```

4. To skip the confirmation prompt (use with care):

```bash
terraform destroy -auto-approve
```

---

✅ This will remove:

* EC2 instances (manager + workers)
* Security groups
* VPC, subnets, route tables, internet gateway
* Key pair (if created by Terraform)

---

⚠️ **Important for students**:

* Always run `terraform destroy` from the **same folder** where you ran `terraform apply` (so it uses the same `terraform.tfstate`).
* Double-check the AWS Console afterwards to ensure no stray resources (like EBS volumes or elastic IPs) remain.

---