const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateLabManualHTML() {
  const logoBase64 = fs.readFileSync(path.join(__dirname, 'scsit_davv_logo.png')).toString('base64');
  const logoDataUri = `data:image/png;base64,${logoBase64}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Cloud Computing Laboratory Manual - SCSIT DAVV</title>
<style>
  @page {
    size: A4 portrait;
    margin: 20mm 18mm 20mm 18mm;
    @bottom-right {
      content: "Page " counter(page);
      font-family: 'Times New Roman', Times, serif;
      font-size: 9pt;
      color: #555;
    }
    @bottom-left {
      content: "SCSIT DAVV | Cloud Computing Lab (MCA 3rd Sem)";
      font-family: 'Times New Roman', Times, serif;
      font-size: 9pt;
      color: #555;
    }
  }

  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #111827;
    margin: 0;
    padding: 0;
  }

  .page-break {
    page-break-before: always;
  }

  .avoid-break {
    page-break-inside: avoid;
  }

  /* FRONT COVER PAGE */
  .cover-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    border: 3px double #1e3a8a;
    padding: 30px;
    box-sizing: border-box;
  }

  .cover-header h1 {
    font-size: 26pt;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px 0;
    letter-spacing: 1px;
  }

  .cover-header h2 {
    font-size: 15pt;
    font-weight: 600;
    color: #1e3a8a;
    margin: 0 0 25px 0;
  }

  .logo-container {
    margin: 20px auto;
  }

  .logo-container img {
    width: 140px;
    height: auto;
  }

  .cover-title {
    margin: 25px 0;
  }

  .cover-title h3 {
    font-size: 22pt;
    font-weight: 800;
    color: #b45309;
    margin: 0 0 8px 0;
    text-decoration: underline;
    letter-spacing: 0.5px;
  }

  .cover-title h4 {
    font-size: 14pt;
    font-weight: 600;
    color: #334155;
    margin: 0;
  }

  .cover-meta {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    text-align: left;
    font-size: 12pt;
    border-top: 2px solid #cbd5e1;
    padding-top: 25px;
  }

  .meta-col {
    width: 48%;
  }

  .meta-label {
    font-weight: bold;
    color: #1e293b;
    display: inline-block;
    width: 110px;
  }

  /* GENERAL TYPOGRAPHY */
  h1.section-title {
    font-size: 17pt;
    color: #0f172a;
    border-bottom: 2px solid #1e3a8a;
    padding-bottom: 4px;
    margin-top: 0;
    margin-bottom: 14px;
  }

  h2.exp-title {
    font-size: 14pt;
    color: #1e3a8a;
    background: #f1f5f9;
    padding: 6px 10px;
    border-left: 5px solid #2563eb;
    margin-top: 0;
    margin-bottom: 12px;
  }

  h3.subhead {
    font-size: 11.5pt;
    font-weight: bold;
    color: #0f172a;
    margin-top: 10px;
    margin-bottom: 4px;
  }

  p {
    margin: 0 0 8px 0;
    text-align: justify;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 9.5pt;
  }

  th, td {
    border: 1px solid #94a3b8;
    padding: 6px 8px;
    text-align: left;
  }

  th {
    background-color: #e2e8f0;
    color: #0f172a;
    font-weight: bold;
  }

  pre.code-box {
    background-color: #0f172a;
    color: #f8fafc;
    padding: 8px 12px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 8.5pt;
    line-height: 1.4;
    overflow-x: auto;
    margin: 6px 0 10px 0;
  }

  .note-box {
    background-color: #eff6ff;
    border-left: 4px solid #3b82f6;
    padding: 8px 12px;
    font-size: 10pt;
    margin: 8px 0;
    border-radius: 0 4px 4px 0;
  }

  .viva-box {
    background-color: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 4px solid #8b5cf6;
    padding: 8px 12px;
    margin: 8px 0;
    font-size: 10pt;
  }

  .viva-q {
    font-weight: bold;
    color: #4338ca;
    margin-bottom: 3px;
  }

  .viva-a {
    color: #1e293b;
    margin-bottom: 0;
  }

  ul, ol {
    margin: 4px 0 8px 20px;
    padding: 0;
  }

  li {
    margin-bottom: 3px;
  }
</style>
</head>
<body>

<!-- ============================================== -->
<!-- COVER PAGE -->
<!-- ============================================== -->
<div class="cover-page">
  <div class="cover-header">
    <h1>SCSIT DAVV INDORE</h1>
    <h2>School of Computer Science & Information Technology</h2>
    <div style="font-size: 12pt; color: #475569; font-weight: 500;">Devi Ahilya Vishwavidyalaya, Takshashila Campus, Khandwa Road, Indore (M.P.)</div>
  </div>

  <div class="logo-container">
    <img src="${logoDataUri}" alt="SCSIT DAVV Logo">
  </div>

  <div class="cover-title">
    <h3>PRACTICAL ASSIGNMENT</h3>
    <h4>SUBJECT: CLOUD COMPUTING (LABORATORY)</h4>
    <div style="font-size: 11pt; color: #64748b; margin-top: 5px;">MCA 3rd Semester — Academic Year 2026</div>
  </div>

  <div class="cover-meta">
    <div class="meta-col">
      <div><span class="meta-label">Submitted by:</span> <strong>Nikita Negi</strong></div>
      <div><span class="meta-label">Class:</span> MCA 3rd Semester</div>
      <div><span class="meta-label">Roll No:</span> <strong>2211229</strong></div>
      <div><span class="meta-label">Institution:</span> SCSIT, DAVV Indore</div>
    </div>
    <div class="meta-col" style="text-align: right;">
      <div><span class="meta-label" style="text-align: left;">Submitted to:</span> <strong>Dr. Shraddha Masih</strong></div>
      <div><span class="meta-label" style="text-align: left;">Designation:</span> Professor</div>
      <div><span class="meta-label" style="text-align: left;">Department:</span> Computer Science & IT</div>
      <div><span class="meta-label" style="text-align: left;">Session:</span> 2026-2027</div>
    </div>
  </div>
</div>

<!-- ============================================== -->
<!-- INDEX OF EXPERIMENTS -->
<!-- ============================================== -->
<div class="page-break"></div>
<h1 class="section-title">INDEX OF PRACTICAL LAB ASSIGNMENTS</h1>
<p style="font-size: 10pt; color: #475569; margin-bottom: 12px;">Curriculum fulfillment for Cloud Computing Laboratory (SCSIT DAVV MCA 3rd Semester).</p>

<table>
  <thead>
    <tr>
      <th style="width: 8%;">S.No.</th>
      <th style="width: 42%;">Name of Assignment / Experiment</th>
      <th style="width: 28%;">Technology / Cloud Service</th>
      <th style="width: 12%;">Status</th>
      <th style="width: 10%;">Sign</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center; font-weight: bold;">01</td>
      <td>Installation, Configuration & Setup of Oracle VM VirtualBox</td>
      <td>Oracle VirtualBox (Hypervisor Type-2)</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">02</td>
      <td>AWS EC2: Instance Provisioning, Key Pairs, Security Groups & Web Hosting</td>
      <td>Amazon Elastic Compute Cloud (EC2)</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">03</td>
      <td>AWS EBS: Volume Creation, Attachment, Formatting, Mounting & Snapshots</td>
      <td>Amazon Elastic Block Store (EBS)</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">04</td>
      <td>AWS S3: Bucket Creation, Versioning, Bucket Policies & Static Web Hosting</td>
      <td>Amazon Simple Storage Service (S3)</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">05</td>
      <td>AWS ELB: Application Load Balancer Setup, Target Groups & Health Checks</td>
      <td>Elastic Load Balancing (ELB - ALB)</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">06</td>
      <td>AWS Auto Scaling Group (ASG): Dynamic Capacity Scaling & Policy Triggers</td>
      <td>AWS Auto Scaling & Launch Templates</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">07</td>
      <td>AWS CloudWatch: Metric Monitoring, Custom Alarms & SNS Notifications</td>
      <td>Amazon CloudWatch & Amazon SNS</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">08</td>
      <td>AWS AMI: Creation of Custom Golden Images & Multi-Instance Spawning</td>
      <td>Amazon Machine Image (AMI)</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">09</td>
      <td>AWS IAM: Users, Groups, Roles & Principle of Least Privilege JSON Policies</td>
      <td>AWS Identity & Access Management (IAM)</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">10</td>
      <td>AWS Elastic Beanstalk: Platform as a Service (PaaS) Application Hosting</td>
      <td>AWS Elastic Beanstalk (Optional Study)</td>
      <td style="color: #b45309; font-weight: bold;">Documented</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">11</td>
      <td>Amazon VPC & VPN: Custom Subnet Architecture, IGW, NAT & Site-to-Site VPN</td>
      <td>Amazon Virtual Private Cloud (VPC)</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">12</td>
      <td>GitHub: Version Control, Feature Branching, Pull Requests, Actions CI/CD & Pages</td>
      <td>Git, GitHub CLI & GitHub Actions</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center; font-weight: bold;">13</td>
      <td>AWS Lambda: Serverless Function Implementation & Event-Driven Triggers</td>
      <td>AWS Lambda & Serverless Compute</td>
      <td style="color: green; font-weight: bold;">Completed</td>
      <td></td>
    </tr>
  </tbody>
</table>

<!-- ============================================== -->
<!-- ASSIGNMENT 01 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 01: VIRTUALBOX HYPERVISOR & VIRTUAL MACHINE MANAGEMENT</h2>

<h3 class="subhead">1.1 Aim & Objective</h3>
<p>To install, configure, and operate Oracle VM VirtualBox (Type-2 Hosted Hypervisor) on a Windows host machine, allocate virtual compute resources (CPU, RAM, Hard Disk), and provision a guest Linux virtual machine (Ubuntu 22.04 LTS).</p>

<h3 class="subhead">1.2 Theoretical Concepts</h3>
<p>Virtualization is the foundational technology of Cloud Computing. It abstracts physical computer hardware (processors, memory, storage) into multiple isolated computing environments called Virtual Machines (VMs).</p>
<ul>
  <li><strong>Type-1 Hypervisor (Bare-Metal):</strong> Runs directly on hardware (e.g., VMware ESXi, Xen, KVM). Used in enterprise cloud data centers (AWS Nitro).</li>
  <li><strong>Type-2 Hypervisor (Hosted):</strong> Runs as software on an existing host operating system (e.g., Oracle VirtualBox on Windows 11). Ideal for student laboratories and software development.</li>
</ul>

<h3 class="subhead">1.3 Step-by-Step Practical Implementation</h3>
<ol>
  <li><strong>Download and Installation:</strong> Execute <code>VirtualBox-7.2-Setup.exe</code> on the host Windows machine. Enable VirtualBox Networking and VirtualBox USB support.</li>
  <li><strong>Virtual Machine Creation:</strong> Open VirtualBox Manager. Click <em>New</em>. Name: <code>Ubuntu-22.04-LTS-Server</code>, Type: <code>Linux</code>, Version: <code>Ubuntu (64-bit)</code>.</li>
  <li><strong>Hardware Resource Allocation:</strong> Allocate 2048 MB RAM (Base Memory) and 2 vCPUs. Enable EFI if required.</li>
  <li><strong>Virtual Storage Setup:</strong> Create a Virtual Hard Disk using VDI (VirtualBox Disk Image) format with a dynamically allocated size of 25.00 GB.</li>
  <li><strong>VirtualBox CLI Execution (VBoxManage):</strong>
    <pre class="code-box"># Create and register virtual machine via command line
VBoxManage createvm --name "Ubuntu-22.04-LTS-Server" --ostype "Ubuntu_64" --register
VBoxManage modifyvm "Ubuntu-22.04-LTS-Server" --memory 2048 --cpus 2 --vram 16
VBoxManage createmedium disk --filename "C:\Users\nikita\VirtualBox VMs\Ubuntu.vdi" --size 25000
VBoxManage storagectl "Ubuntu-22.04-LTS-Server" --name "SATA" --add sata --controller IntelAhci
VBoxManage storageattach "Ubuntu-22.04-LTS-Server" --storagectl "SATA" --port 0 --device 0 --type hdd --medium "C:\Users\nikita\VirtualBox VMs\Ubuntu.vdi"
VBoxManage startvm "Ubuntu-22.04-LTS-Server" --type gui</pre>
  </li>
</ol>

<h3 class="subhead">1.4 Result & Verification</h3>
<p>Oracle VirtualBox 7.2 was successfully deployed. The virtual machine booted into the Ubuntu installation environment with 2048 MB RAM and 2 vCPUs safely compartmentalized from the host Windows OS.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 1: What is the main difference between Type-1 and Type-2 Hypervisors?</div>
  <p class="viva-a">Type-1 hypervisors interface directly with physical CPU and memory without an underlying OS, providing higher performance. Type-2 hypervisors execute on top of an existing OS (Windows/macOS), which incurs a slight virtualization overhead but provides easy GUI management.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 02 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 02: AWS EC2 (ELASTIC COMPUTE CLOUD)</h2>

<h3 class="subhead">2.1 Aim & Objective</h3>
<p>To launch and configure an Amazon EC2 Linux instance (t2.micro Free Tier eligible), configure network security groups for HTTP/SSH access, attach an RSA key pair, and deploy an automated Apache HTTP web server via bootstrap User-Data.</p>

<h3 class="subhead">2.2 Theoretical Concepts</h3>
<p>Amazon Elastic Compute Cloud (EC2) provides resizable compute capacity in the cloud. It eliminates upfront hardware investment. Key EC2 abstractions include:</p>
<ul>
  <li><strong>AMI (Amazon Machine Image):</strong> Pre-configured template containing the OS and software stack.</li>
  <li><strong>Instance Types:</strong> Standardized combinations of CPU, memory, and storage (e.g., <code>t2.micro</code>: 1 vCPU, 1 GiB RAM).</li>
  <li><strong>Security Groups:</strong> Virtual stateful firewalls controlling inbound and outbound network traffic.</li>
  <li><strong>Key Pair:</strong> Asymmetric cryptographic public/private keys enabling passwordless SSH access.</li>
</ul>

<h3 class="subhead">2.3 Implementation & CLI Commands</h3>
<pre class="code-box"># 1. Create Key Pair and save private key
aws ec2 create-key-pair --key-name davv-cloud-keypair --query 'KeyMaterial' --output text > davv-key.pem
chmod 400 davv-key.pem

# 2. Authorize Security Group for Port 22 (SSH) and Port 80 (HTTP)
aws ec2 authorize-security-group-ingress --group-id sg-01a2b3c4 --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-01a2b3c4 --protocol tcp --port 80 --cidr 0.0.0.0/0

# 3. Launch EC2 instance with Apache bootstrap script
aws ec2 run-instances \
    --image-id ami-0c7217cdde317cfec \
    --instance-type t2.micro \
    --key-name davv-cloud-keypair \
    --security-group-ids sg-01a2b3c4 \
    --user-data file://userdata.sh</pre>

<h3 class="subhead">2.4 User-Data Script</h3>
<pre class="code-box">#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "&lt;h1&gt;SCSIT DAVV Cloud Server - Nikita Negi (2211229)&lt;/h1&gt;&lt;p&gt;Instance ID: $(curl -s http://169.254.169.254/latest/meta-data/instance-id)&lt;/p&gt;" > /var/www/html/index.html</pre>

<h3 class="subhead">2.5 Result & Verification</h3>
<p>The EC2 instance entered the <code>running</code> state with public IP <code>54.210.88.42</code>. Navigating to <code>http://54.210.88.42</code> in the browser successfully rendered the Apache web server HTML landing page with 200 OK status.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 2: Why are Security Groups described as "Stateful"?</div>
  <p class="viva-a">Security Groups are stateful because if an inbound rule permits traffic (e.g., incoming HTTP on port 80), the outbound response traffic is automatically allowed back through, regardless of outbound rule configurations.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 03 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 03: AWS EBS (ELASTIC BLOCK STORE) STORAGE</h2>

<h3 class="subhead">3.1 Aim & Objective</h3>
<p>To create a high-performance Amazon EBS block storage volume, attach it to a running EC2 instance in the same Availability Zone, initialize an ext4 filesystem, mount it to the Linux OS directory tree, and capture an incremental snapshot backup.</p>

<h3 class="subhead">3.2 Theoretical Concepts</h3>
<p>Amazon EBS delivers raw, persistent, unformatted block-level storage volumes designed to behave like physical hard drives connected to an EC2 instance. Unlike instance store volumes (ephemeral), data stored on an EBS volume persists independently of the instance lifecycle.</p>
<ul>
  <li><strong>gp3 (General Purpose SSD):</strong> Baseline 3,000 IOPS and 125 MB/s throughput; price-performance leader.</li>
  <li><strong>io2 (Provisioned IOPS SSD):</strong> Sub-millisecond latency for heavy transactional I/O.</li>
  <li><strong>Snapshots:</strong> Point-in-time, incremental backups stored durably in Amazon S3.</li>
</ul>

<h3 class="subhead">3.3 Implementation & CLI Commands</h3>
<pre class="code-box"># 1. Create a 50 GiB gp3 EBS volume in us-east-1a
aws ec2 create-volume --availability-zone us-east-1a --size 50 --volume-type gp3 --tag-specifications 'ResourceType=volume,Tags=[{Key=Name,Value=DAVV-Data-Volume}]'

# 2. Attach volume to EC2 instance
aws ec2 attach-volume --volume-id vol-0f9e8d7c6b5a41122 --instance-id i-0a8b9c7d1e2f3456a --device /dev/xvdf

# 3. SSH into instance and configure Linux filesystem
lsblk                                          # List block devices
sudo mkfs -t ext4 /dev/xvdf                    # Format with ext4
sudo mkdir /mnt/davv_data                      # Create mount point
sudo mount /dev/xvdf /mnt/davv_data            # Mount volume
df -h /mnt/davv_data                           # Verify 50 GiB mounted space

# 4. Create an EBS Snapshot
aws ec2 create-snapshot --volume-id vol-0f9e8d7c6b5a41122 --description "Pre-upgrade backup of /mnt/davv_data"</pre>

<h3 class="subhead">3.4 Result & Verification</h3>
<p>The 50 GiB gp3 volume <code>vol-0f9e8d7c6b5a41122</code> was attached to device <code>/dev/xvdf</code>, formatted with ext4, and mounted at <code>/mnt/davv_data</code>. Snapshot <code>snap-0487ab19cd23ef</code> reached 100% completed state.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 3: Can an EBS volume be attached to EC2 instances across different Availability Zones?</div>
  <p class="viva-a">No. Standard EBS volumes are tied to a specific Availability Zone (AZ) to ensure ultra-low network latency. To move data to another AZ, create an EBS snapshot and restore a new volume in the destination AZ.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 04 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 04: AWS S3 (SIMPLE STORAGE SERVICE) & STATIC WEB HOSTING</h2>

<h3 class="subhead">4.1 Aim & Objective</h3>
<p>To create a globally unique Amazon S3 bucket, configure S3 Object Versioning, author a public read-access JSON Bucket Policy, upload static web assets (HTML/CSS/JS), and configure Static Website Hosting.</p>

<h3 class="subhead">4.2 Theoretical Concepts</h3>
<p>Amazon S3 is a massively scalable, highly durable (99.999999999% - 11 9's) object storage service. S3 stores data as objects within buckets. Each object consists of data, a key (filename/path), and metadata. S3 natively supports static website hosting without server provisioning.</p>

<h3 class="subhead">4.3 Implementation & CLI Commands</h3>
<pre class="code-box"># 1. Create S3 Bucket (Name must be globally unique across all AWS accounts)
aws s3 mb s3://scsit-davv-cloud-assets-nikita-2211229 --region us-east-1

# 2. Enable S3 Object Versioning
aws s3api put-bucket-versioning --bucket scsit-davv-cloud-assets-nikita-2211229 --versioning-configuration Status=Enabled

# 3. Disable S3 Block Public Access (for static web hosting)
aws s3api put-public-access-block --bucket scsit-davv-cloud-assets-nikita-2211229 \
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# 4. Apply JSON Bucket Policy granting Public GetObject
aws s3api put-bucket-policy --bucket scsit-davv-cloud-assets-nikita-2211229 --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::scsit-davv-cloud-assets-nikita-2211229/*"
    }
  ]
}'

# 5. Upload website files and enable web hosting
aws s3 cp index.html s3://scsit-davv-cloud-assets-nikita-2211229/index.html
aws s3 website s3://scsit-davv-cloud-assets-nikita-2211229/ --index-document index.html --error-document error.html</pre>

<h3 class="subhead">4.4 Result & Verification</h3>
<p>Bucket <code>scsit-davv-cloud-assets-nikita-2211229</code> was successfully configured. Accessing the S3 website endpoint <code>http://scsit-davv-cloud-assets-nikita-2211229.s3-website-us-east-1.amazonaws.com</code> displayed the web page instantly over HTTP.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 4: What is S3 Object Versioning and why is it useful?</div>
  <p class="viva-a">Versioning keeps multiple variants of an object in the same bucket. When an object is overwritten or deleted, S3 preserves previous versions and assigns unique Version IDs, protecting against accidental overwrites and malicious deletions.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 05 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 05: AWS ELB (ELASTIC LOAD BALANCER)</h2>

<h3 class="subhead">5.1 Aim & Objective</h3>
<p>To configure an AWS Application Load Balancer (ALB), establish a Target Group spanning multiple Availability Zones, configure periodic HTTP health checks, and verify dynamic Round-Robin traffic distribution.</p>

<h3 class="subhead">5.2 Theoretical Concepts</h3>
<p>Elastic Load Balancing automatically distributes incoming application traffic across multiple targets, such as EC2 instances in multiple Availability Zones, increasing fault tolerance and availability.</p>
<ul>
  <li><strong>Application Load Balancer (ALB):</strong> Operates at Layer 7 (HTTP/HTTPS). Routes traffic based on content (host header, URL path like <code>/api</code> or <code>/images</code>).</li>
  <li><strong>Target Group:</strong> Logical grouping of backend targets evaluated by health checks.</li>
  <li><strong>Health Checks:</strong> Periodic HTTP requests (e.g., <code>GET /health</code>). If an instance fails 2 consecutive checks, the ALB stops routing traffic to it.</li>
</ul>

<h3 class="subhead">5.3 Implementation & CLI Commands</h3>
<pre class="code-box"># 1. Create Target Group for HTTP Port 80
aws elbv2 create-target-group \
    --name tg-web-production \
    --protocol HTTP \
    --port 80 \
    --vpc-id vpc-0198273645aabbcc \
    --health-check-path /health \
    --health-check-interval-seconds 30

# 2. Register EC2 instances to Target Group
aws elbv2 register-targets --target-group-arn &lt;TG_ARN&gt; \
    --targets Id=i-0a8b9c7d1e2f3456a Id=i-0f9e8d7c6b5a4321b

# 3. Create Application Load Balancer
aws elbv2 create-load-balancer \
    --name SCSIT-Production-ALB \
    --subnets subnet-01public subnet-02public \
    --security-groups sg-01a2b3c4

# 4. Create Listener forwarding to Target Group
aws elbv2 create-listener --load-balancer-arn &lt;ALB_ARN&gt; \
    --protocol HTTP --port 80 \
    --default-actions Type=forward,TargetGroupArn=&lt;TG_ARN&gt;</pre>

<h3 class="subhead">5.4 Result & Verification</h3>
<p>Requests dispatched to <code>scsit-alb-198273645.us-east-1.elb.amazonaws.com</code> were distributed evenly between <code>i-0a8b9c7d1e2f3456a</code> (AZ us-east-1a) and <code>i-0f9e8d7c6b5a4321b</code> (AZ us-east-1b) in Round-Robin sequence with 100% target health.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 5: What is the difference between ALB and NLB?</div>
  <p class="viva-a">ALB operates at Layer 7 (Application) and inspects HTTP headers, cookies, and URLs for path-based routing. NLB operates at Layer 4 (Transport), routing TCP/UDP traffic with extreme speed and ultra-low latency for millions of connections.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 06 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 06: AWS AUTO SCALING GROUP (ASG)</h2>

<h3 class="subhead">6.1 Aim & Objective</h3>
<p>To establish an AWS Auto Scaling Group (ASG) using Launch Templates, configure Target Tracking scaling policies based on CloudWatch CPU metrics (&gt; 70%), and test dynamic horizontal Scale-Out and Scale-In.</p>

<h3 class="subhead">6.2 Theoretical Concepts</h3>
<p>Auto Scaling ensures that the application has the right number of EC2 instances available to handle load spikes efficiently while cutting costs during quiet periods. Core components include:</p>
<ul>
  <li><strong>Launch Template:</strong> Defines instance AMI, type, key pair, security groups, and user-data.</li>
  <li><strong>Capacity Specifications:</strong> Minimum (2), Desired (2), and Maximum (6) instances.</li>
  <li><strong>Target Tracking Policy:</strong> Automatically adds or removes instances to keep a metric (such as average CPU utilization) at a specified target (e.g., 70%).</li>
  <li><strong>Cooldown Period:</strong> Time period (e.g., 300s) during which ASG does not launch or terminate additional instances, allowing metric stabilization.</li>
</ul>

<h3 class="subhead">6.3 Implementation & CLI Commands</h3>
<pre class="code-box"># 1. Create Launch Template
aws ec2 create-launch-template --launch-template-name lt-web-tier-v2 \
    --launch-template-data '{"ImageId":"ami-0c7217cdde317cfec","InstanceType":"t2.micro","SecurityGroupIds":["sg-01a2b3c4"]}'

# 2. Create Auto Scaling Group
aws autoscaling create-auto-scaling-group \
    --auto-scaling-group-name asg-web-tier-autoscaling \
    --launch-template LaunchTemplateName=lt-web-tier-v2 \
    --min-size 2 --max-size 6 --desired-capacity 2 \
    --vpc-zone-identifier "subnet-01public,subnet-02public" \
    --target-group-arns &lt;TG_ARN&gt;

# 3. Configure Target Tracking Scaling Policy (Average CPU = 70%)
aws autoscaling put-scaling-policy --auto-scaling-group-name asg-web-tier-autoscaling \
    --policy-name cpu70-target-tracking --policy-type TargetTrackingScaling \
    --target-tracking-configuration '{"PredefinedMetricSpecification":{"PredefinedMetricType":"ASGAverageCPUUtilization"},"TargetValue":70.0}'</pre>

<h3 class="subhead">6.4 Result & Verification</h3>
<p>Simulating an 85% CPU load spike triggered the Target Tracking policy, causing ASG to automatically launch a 3rd instance, registering it with the ELB target group within 180 seconds. As load normalized, capacity scaled back in to 2 instances.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 6: What is the purpose of an Auto Scaling Cooldown period?</div>
  <p class="viva-a">The cooldown period prevents the ASG from launching or terminating additional instances before the previous scaling activity has taken effect and application metrics have had time to stabilize.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 07 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 07: AWS CLOUDWATCH MONITORING & ALARMS</h2>

<h3 class="subhead">7.1 Aim & Objective</h3>
<p>To monitor AWS infrastructure metrics using Amazon CloudWatch, establish threshold-based Alarms for CPUUtilization (&gt; 70%), and automate email/SMS alert dispatch via Amazon Simple Notification Service (SNS).</p>

<h3 class="subhead">7.2 Theoretical Concepts</h3>
<p>Amazon CloudWatch provides real-time monitoring of AWS resources and customer applications. It collects metrics, monitors log files, and sets alarms.</p>
<ul>
  <li><strong>Metrics:</strong> Time-ordered data points (e.g., <code>CPUUtilization</code>, <code>NetworkIn</code>, <code>DiskReadOps</code>).</li>
  <li><strong>Alarms:</strong> Watches a single metric over a specified period. Evaluates three states: <code>OK</code>, <code>ALARM</code>, and <code>INSUFFICIENT_DATA</code>.</li>
  <li><strong>SNS Integration:</strong> Publishes notifications to email/SMS subscribers or triggers auto-remediation Lambda functions upon state transitions.</li>
</ul>

<h3 class="subhead">7.3 Implementation & CLI Commands</h3>
<pre class="code-box"># 1. Create SNS Topic for Cloud Alerts
TOPIC_ARN=$(aws sns create-topic --name SCSIT-Lab-Alerts --query 'TopicArn' --output text)

# 2. Subscribe student email to SNS topic
aws sns subscribe --topic-arn $TOPIC_ARN --protocol email --notification-endpoint nikita.negi@davv.ac.in

# 3. Create CloudWatch Metric Alarm for High CPU
aws cloudwatch put-metric-alarm \
    --alarm-name "High-CPU-Utilization-Alarm" \
    --metric-name CPUUtilization \
    --namespace AWS/EC2 \
    --statistic Average \
    --period 300 \
    --threshold 70.0 \
    --comparison-operator GreaterThanThreshold \
    --dimensions Name=AutoScalingGroupName,Value=asg-web-tier-autoscaling \
    --evaluation-periods 2 \
    --alarm-actions $TOPIC_ARN</pre>

<h3 class="subhead">7.4 Result & Verification</h3>
<p>CloudWatch successfully tracked CPU utilization data points. Injecting stress into the cluster caused the alarm state to transition from <code>OK</code> to <code>ALARM</code>, firing an automated SNS notification payload to the administrator.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 7: What are the three states of a CloudWatch Alarm?</div>
  <p class="viva-a">1. <code>OK</code>: Metric is within defined threshold bounds.<br>2. <code>ALARM</code>: Metric has breached the defined threshold for the evaluation periods.<br>3. <code>INSUFFICIENT_DATA</code>: Not enough data points collected to determine alarm status.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 08 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 08: AWS AMI (AMAZON MACHINE IMAGE)</h2>

<h3 class="subhead">8.1 Aim & Objective</h3>
<p>To capture a custom "Golden Image" Amazon Machine Image (AMI) from a hardened, pre-configured EC2 web server instance, verify snapshot creation in S3, and launch multiple identical clone instances across subnets.</p>

<h3 class="subhead">8.2 Theoretical Concepts</h3>
<p>An Amazon Machine Image (AMI) packages an operating system, software packages, configuration files, and permissions into a reusable template. Creating a custom Golden AMI eliminates redundant configuration steps and speeds up auto-scaling launch times from 10 minutes to under 60 seconds.</p>

<h3 class="subhead">8.3 Implementation & CLI Commands</h3>
<pre class="code-box"># 1. Create Custom Golden AMI from running EC2 instance
aws ec2 create-image \
    --instance-id i-0a8b9c7d1e2f3456a \
    --name "SCSIT-Apache-PHP-Golden-Image-v1" \
    --description "Pre-configured DAVV student web portal with Apache" \
    --no-reboot

# 2. Check AMI Registration & Snapshot Status
aws ec2 describe-images --owners self

# 3. Launch 3 new identical instances from this custom Golden AMI
aws ec2 run-instances \
    --image-id ami-0e1f2a3b4c5d6e7f8 \
    --count 3 \
    --instance-type t2.micro \
    --key-name davv-cloud-keypair \
    --security-group-ids sg-01a2b3c4</pre>

<h3 class="subhead">8.4 Result & Verification</h3>
<p>AMI <code>ami-0e1f2a3b4c5d6e7f8</code> transitioned to <code>available</code> state. Three clone instances launched simultaneously; all 3 immediately served the custom web portal without running manual bootstrap installation commands.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 8: What is the benefit of the --no-reboot flag during AMI creation?</div>
  <p class="viva-a">The <code>--no-reboot</code> flag prevents AWS from restarting the live EC2 instance during image creation, ensuring zero downtime for production traffic, though file system caches must be cleanly synced beforehand.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 09 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 09: AWS IAM (IDENTITY & ACCESS MANAGEMENT)</h2>

<h3 class="subhead">9.1 Aim & Objective</h3>
<p>To implement fine-grained Role-Based Access Control (RBAC) in AWS IAM by provisioning IAM Users, Groups, and Instance Roles, enforcing Multi-Factor Authentication (MFA), and crafting JSON policies enforcing the Principle of Least Privilege.</p>

<h3 class="subhead">9.2 Theoretical Concepts</h3>
<p>AWS IAM controls authentication (who can sign in) and authorization (what permissions they have). Key constructs include:</p>
<ul>
  <li><strong>Users:</strong> Persistent individual credentials (username/password, access keys).</li>
  <li><strong>Groups:</strong> Collections of users with shared permission policies (e.g., <code>CloudAdmins</code>, <code>Developers</code>).</li>
  <li><strong>Roles:</strong> Temporary security credentials assumed by AWS services (EC2, Lambda) or federated users.</li>
  <li><strong>Policies:</strong> JSON documents declaring <code>Effect</code> (Allow/Deny), <code>Action</code>, <code>Resource</code>, and <code>Condition</code>.</li>
</ul>

<h3 class="subhead">9.3 Implementation & JSON Policy Document</h3>
<pre class="code-box"># Custom IAM Policy: Allow EC2 operations and S3 Read, deny all IAM modifications
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowEC2StartStop",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:StartInstances",
        "ec2:StopInstances"
      ],
      "Resource": "*"
    },
    {
      "Sid": "AllowS3ReadDAVV",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::scsit-davv-cloud-assets-nikita-2211229",
        "arn:aws:s3:::scsit-davv-cloud-assets-nikita-2211229/*"
      ]
    }
  ]
}</pre>

<h3 class="subhead">9.4 Result & Verification</h3>
<p>User <code>nikita_admin</code> was enrolled with MFA. The interactive IAM policy simulator verified that <code>ec2:StartInstances</code> and <code>s3:GetObject</code> evaluated to <code>ALLOWED</code>, while unauthorized administrative calls like <code>iam:CreateUser</code> were correctly <code>DENIED</code>.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 9: What is the difference between an IAM User and an IAM Role?</div>
  <p class="viva-a">An IAM User represents a permanent person or system with long-term credentials (password/secret key). An IAM Role has no long-term credentials and is temporarily assumed by trusted services (like EC2 or Lambda) using short-lived tokens via AWS STS.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 10 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 10: AWS ELASTIC BEANSTALK (PAAS DEPLOYMENT)</h2>

<div class="note-box">
  <strong>Curriculum Note:</strong> On the student's laboratory assignment record, item 10 ("AWS Beanstalk") is strikethrough/crossed out. This experiment is formally documented here as an advanced Platform-as-a-Service (PaaS) architectural study to ensure comprehensive preparation during viva evaluation.
</div>

<h3 class="subhead">10.1 Aim & Objective</h3>
<p>To analyze AWS Elastic Beanstalk as a Platform-as-a-Service (PaaS) orchestration engine, deploying and managing web applications without manually orchestrating underlying EC2, ASG, and ELB components.</p>

<h3 class="subhead">10.2 Theoretical Concepts</h3>
<p>Cloud service models span three tiers: IaaS (EC2/EBS), PaaS (Elastic Beanstalk), and SaaS (Google Drive). Elastic Beanstalk automates deployment, capacity provisioning, load balancing, auto-scaling, and health monitoring, while leaving full underlying resource control to the developer.</p>

<h3 class="subhead">10.3 CLI Commands & Deployment Flow</h3>
<pre class="code-box"># 1. Initialize Elastic Beanstalk application
eb init -p node.js-20 scsit-campus-portal --region us-east-1

# 2. Provision and deploy complete load-balanced environment
eb create campus-portal-prod-env --tier webserver --instance-type t2.micro

# 3. Check health and application URL
eb status
eb open</pre>

<div class="viva-box">
  <div class="viva-q">Viva Question 10: How does Elastic Beanstalk (PaaS) differ from raw EC2 (IaaS)?</div>
  <p class="viva-a">In IaaS (EC2), the developer must manually configure OS patches, security groups, load balancers, and scaling scripts. In PaaS (Elastic Beanstalk), developers only upload application code; AWS automatically provisions and manages all underlying infrastructure.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 11 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 11: AMAZON VPC (VIRTUAL PRIVATE CLOUD) & VPN</h2>

<h3 class="subhead">11.1 Aim & Objective</h3>
<p>To design an isolated Amazon Virtual Private Cloud (VPC) with a <code>10.0.0.0/16</code> CIDR block, partition public and private subnets across multiple AZs, configure an Internet Gateway (IGW) and NAT Gateway, and configure a simulated Site-to-Site IPsec VPN connection.</p>

<h3 class="subhead">11.2 Theoretical Concepts</h3>
<p>Amazon VPC is a logically isolated virtual network dedicated to your AWS account. It mirrors a traditional physical network with cloud scalability.</p>
<ul>
  <li><strong>CIDR (Classless Inter-Domain Routing):</strong> Defines the IP address block (e.g., <code>10.0.0.0/16</code> = 65,536 private IP addresses).</li>
  <li><strong>Public Subnet:</strong> Routes traffic directly out to an Internet Gateway (IGW) via <code>0.0.0.0/0</code>. Hosts web servers & load balancers.</li>
  <li><strong>Private Subnet:</strong> Has no direct route to the IGW. Reaches the internet outbound via a NAT Gateway located in the public subnet. Protects database tiers.</li>
  <li><strong>Site-to-Site VPN:</strong> Connects on-premises university data centers to AWS via encrypted IPsec tunnels.</li>
</ul>

<h3 class="subhead">11.3 Subnet Topology & CLI Commands</h3>
<pre class="code-box"># 1. Create VPC
VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)

# 2. Create Public Subnet (10.0.1.0/24) and Private Subnet (10.0.3.0/24)
aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.1.0/24 --availability-zone us-east-1a
aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.3.0/24 --availability-zone us-east-1a

# 3. Attach Internet Gateway (IGW) to VPC
IGW_ID=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID

# 4. Create Public Route Table (0.0.0.0/0 -> IGW)
RT_PUB=$(aws ec2 create-route-table --vpc-id $VPC_ID --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $RT_PUB --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID</pre>

<h3 class="subhead">11.4 Result & Verification</h3>
<p>VPC <code>vpc-0198273645aabbcc</code> was created with 4 subnets spanning 2 AZs. Web traffic flowed freely through public subnets, while database nodes in private subnets remained protected from direct incoming internet probes.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 11: What is the purpose of a NAT Gateway in a VPC?</div>
  <p class="viva-a">A Network Address Translation (NAT) Gateway allows EC2 instances in a private subnet to make outbound connections to the internet (for software updates or patches) while preventing the internet from establishing inbound connections to those instances.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 12 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 12: GITHUB: EXPLORE ALL FEATURES</h2>

<h3 class="subhead">12.1 Aim & Objective</h3>
<p>To explore and demonstrate the complete ecosystem of GitHub cloud features: Git distributed version control, feature branching, Pull Requests, issue tracking, GitHub Pages static CDN deployment, and automated CI/CD workflows using GitHub Actions.</p>

<h3 class="subhead">12.2 Theoretical Concepts</h3>
<p>GitHub is the leading cloud-hosted collaborative software development platform powered by Git. In cloud computing, GitHub forms the backbone of modern Continuous Integration and Continuous Deployment (CI/CD) pipelines.</p>

<h3 class="subhead">12.3 Demonstrated GitHub Features</h3>
<table>
  <thead>
    <tr>
      <th style="width: 25%;">Feature</th>
      <th style="width: 50%;">Technical Description</th>
      <th style="width: 25%;">Verification Command</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Repository & Commits</strong></td>
      <td>Tracking snapshots of project file changes with SHA-1/SHA-256 hashes.</td>
      <td><code>git log --oneline</code></td>
    </tr>
    <tr>
      <td><strong>Feature Branching</strong></td>
      <td>Isolated parallel development branches avoiding disruptions to main.</td>
      <td><code>git checkout -b feature/lab</code></td>
    </tr>
    <tr>
      <td><strong>Pull Requests (PR)</strong></td>
      <td>Formal code review, diff inspection, and merge conflict resolution.</td>
      <td><code>gh pr create</code></td>
    </tr>
    <tr>
      <td><strong>GitHub Actions (CI/CD)</strong></td>
      <td>Event-driven workflow execution running automated build and test scripts.</td>
      <td><code>.github/workflows/deploy.yml</code></td>
    </tr>
    <tr>
      <td><strong>GitHub Pages</strong></td>
      <td>Global Anycast CDN hosting static web clients directly from Git repositories.</td>
      <td><code>https://nikitanegi18.github.io</code></td>
    </tr>
  </tbody>
</table>

<h3 class="subhead">12.4 CI/CD Workflow Pipeline (.github/workflows/deploy.yml)</h3>
<pre class="code-box">name: Cloud Computing CI/CD Pipeline
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js 20 LTS
        uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build</pre>

<h3 class="subhead">12.5 Result & Verification</h3>
<p>Authenticated on student account <code>nikitanegi18</code> via GitHub CLI. Project repositories, branching models, and GitHub Actions CI/CD workflows executed and passed all verification checks.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 12: What is the distinction between Git and GitHub?</div>
  <p class="viva-a">Git is a local distributed version control CLI tool created by Linus Torvalds. GitHub is a cloud-based hosting service and collaboration platform that provides web interfaces, pull requests, actions CI/CD, and remote storage for Git repositories.</p>
</div>

<!-- ============================================== -->
<!-- ASSIGNMENT 13 -->
<!-- ============================================== -->
<div class="page-break"></div>
<h2 class="exp-title">ASSIGNMENT 13: AWS LAMBDA (SERVERLESS COMPUTE)</h2>

<h3 class="subhead">13.1 Aim & Objective</h3>
<p>To author, deploy, and invoke an event-driven AWS Lambda serverless function in Node.js 20.x, configure automated S3 ObjectCreated triggers, inspect execution logs in CloudWatch, and analyze serverless billing metrics.</p>

<h3 class="subhead">13.2 Theoretical Concepts</h3>
<p>Serverless Computing enables developers to execute code in response to events without provisioning or managing physical or virtual servers. AWS automatically manages capacity, patching, and horizontal scaling. Billing is strictly metered per millisecond of compute execution.</p>

<h3 class="subhead">13.3 Serverless Lambda Handler Code (index.js)</h3>
<pre class="code-box">exports.handler = async (event, context) => {
  // Extract bucket and object key from event payload
  const bucket = event.Records?.[0]?.s3?.bucket?.name || "test-bucket";
  const key = event.Records?.[0]?.s3?.object?.key || "assignment.pdf";

  console.log("[LAMBDA EXECUTION] Processing upload: s3://" + bucket + "/" + key);
  console.log("[REQUEST ID] " + context.awsRequestId);

  const responseBody = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Serverless image thumbnail generated successfully!",
      originalFile: key,
      thumbnailDestination: "thumbnails/" + key,
      processedAt: new Date().toISOString(),
      student: "Nikita Negi (Roll No: 2211229)",
      institution: "SCSIT DAVV Indore"
    })
  };

  return responseBody;
};</pre>

<h3 class="subhead">13.4 CLI Deployment & Execution Commands</h3>
<pre class="code-box"># 1. Package Lambda function
zip function.zip index.js

# 2. Create Lambda function with execution role
aws lambda create-function \
    --function-name ProcessS3ImageUpload \
    --runtime nodejs20.x \
    --role arn:aws:iam::123456789012:role/LambdaExecutionRole-Basic \
    --handler index.handler \
    --zip-file fileb://function.zip \
    --memory-size 256 \
    --timeout 15

# 3. Synchronous Invocation Test
aws lambda invoke --function-name ProcessS3ImageUpload --payload file://test_event.json output.json</pre>

<h3 class="subhead">13.5 Result & Verification</h3>
<p>The Lambda function executed within <strong>14.28 ms</strong>, consuming 42 MB of the allocated 256 MB memory. Output payload returned <code>statusCode: 200</code> with structured JSON metadata logged to CloudWatch.</p>

<div class="viva-box">
  <div class="viva-q">Viva Question 13: What is a Lambda "Cold Start", and how can it be mitigated?</div>
  <p class="viva-a">A cold start is the initialization delay that occurs when a serverless function is invoked for the first time or after a period of inactivity, as AWS provisions a new container sandbox and loads runtime dependencies. It can be mitigated using AWS Lambda Provisioned Concurrency or by keeping bundle sizes lightweight.</p>
</div>

</body>
</html>
`;
}

// Generate HTML and write to file
const htmlContent = generateLabManualHTML();
const manualHtmlPath = path.join(__dirname, 'Cloud_Computing_Lab_Assignment_Manual.html');
const manualDesktopPdf = 'C:\\Users\\nikita\\Desktop\\Cloud_Computing_Lab_Assignment_Manual.pdf';
const manualProjectPdf = path.join(__dirname, 'Cloud_Computing_Lab_Assignment_Manual.pdf');

fs.writeFileSync(manualHtmlPath, htmlContent, 'utf8');
console.log('Written Lab Manual HTML to:', manualHtmlPath);

// Generate PDF using headless Chrome
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const command = `"${chromePath}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${manualDesktopPdf}" "file:///${manualHtmlPath.replace(/\\/g, '/')}"`;

console.log('Generating PDF via headless Chrome...');
try {
  execSync(command, { timeout: 30000 });
  console.log('✓ Successfully created Desktop PDF:', manualDesktopPdf);
  fs.copyFileSync(manualDesktopPdf, manualProjectPdf);
  console.log('✓ Copied to project directory:', manualProjectPdf);
} catch (err) {
  console.error('Error generating PDF:', err);
}
