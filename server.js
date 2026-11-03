const express = require('express');
const cors = require('cors');
const { execSync, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const vm = require('vm');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// IN-MEMORY CLOUD & LAB STATE
// ==========================================

const state = {
  vbox: {
    installed: false,
    version: null,
    path: null,
    vms: [
      { id: 'vm-01', name: 'Ubuntu-22.04-LTS-Server', os: 'Ubuntu (64-bit)', memoryMB: 2048, cpus: 2, diskGB: 25, status: 'Running', ip: '192.168.56.101', uptime: '3h 42m' },
      { id: 'vm-02', name: 'Debian-12-CloudTest', os: 'Debian (64-bit)', memoryMB: 1024, cpus: 1, diskGB: 15, status: 'Powered Off', ip: '-', uptime: '-' }
    ]
  },
  ec2: {
    instances: [
      {
        id: 'i-0a8b9c7d1e2f3456a',
        name: 'Web-Server-Production',
        type: 't2.micro',
        state: 'running',
        publicIp: '54.210.88.42',
        privateIp: '10.0.1.25',
        az: 'us-east-1a',
        securityGroups: ['sg-01a2b3c4 (SSH:22, HTTP:80)'],
        keyName: 'davv-cloud-keypair.pem',
        amiId: 'ami-0c7217cdde317cfec (Amazon Linux 2023)',
        launchTime: new Date(Date.now() - 3600000 * 5).toISOString(),
        webResponse: `<h1>Welcome to SCSIT DAVV Cloud Server</h1><p>Instance ID: i-0a8b9c7d1e2f3456a | AZ: us-east-1a | Status: 200 OK</p>`
      },
      {
        id: 'i-0f9e8d7c6b5a4321b',
        name: 'Backend-API-Worker',
        type: 't2.micro',
        state: 'running',
        publicIp: '54.210.89.103',
        privateIp: '10.0.1.88',
        az: 'us-east-1b',
        securityGroups: ['sg-01a2b3c4 (SSH:22, HTTP:80)'],
        keyName: 'davv-cloud-keypair.pem',
        amiId: 'ami-0c7217cdde317cfec (Amazon Linux 2023)',
        launchTime: new Date(Date.now() - 3600000 * 2).toISOString(),
        webResponse: `<h1>Backend Microservice Node</h1><p>Instance ID: i-0f9e8d7c6b5a4321b | AZ: us-east-1b | Health: Normal</p>`
      }
    ]
  },
  ebs: {
    volumes: [
      { id: 'vol-0a1b2c3d4e5f67890', sizeGB: 30, type: 'gp3', iops: 3000, az: 'us-east-1a', state: 'in-use', attachedInstance: 'i-0a8b9c7d1e2f3456a', device: '/dev/xvda (Root)', encrypted: true },
      { id: 'vol-0f9e8d7c6b5a41122', sizeGB: 50, type: 'gp3', iops: 3000, az: 'us-east-1a', state: 'in-use', attachedInstance: 'i-0a8b9c7d1e2f3456a', device: '/dev/xvdf (/mnt/data)', encrypted: true },
      { id: 'vol-0987654321fedcba0', sizeGB: 20, type: 'gp2', iops: 100, az: 'us-east-1b', state: 'available', attachedInstance: null, device: null, encrypted: false }
    ],
    snapshots: [
      { id: 'snap-0487ab19cd23ef', volumeId: 'vol-0f9e8d7c6b5a41122', sizeGB: 50, description: 'Pre-upgrade backup of /mnt/data', progress: '100%', created: new Date(Date.now() - 3600000 * 12).toISOString() }
    ]
  },
  s3: {
    buckets: [
      {
        name: 'scsit-davv-cloud-assets-nikita-2211229',
        region: 'us-east-1',
        created: '2026-10-15T10:00:00Z',
        versioning: true,
        staticWebsite: true,
        websiteEndpoint: 'http://scsit-davv-cloud-assets-nikita-2211229.s3-website-us-east-1.amazonaws.com',
        objects: [
          { key: 'index.html', size: '1.4 KB', lastModified: '2026-11-01T14:20:00Z', versionId: 'v1.0.0', type: 'text/html' },
          { key: 'error.html', size: '0.8 KB', lastModified: '2026-11-01T14:20:00Z', versionId: 'v1.0.0', type: 'text/html' },
          { key: 'images/campus_davv.jpg', size: '342 KB', lastModified: '2026-11-02T09:15:00Z', versionId: 'v1.0.1', type: 'image/jpeg' },
          { key: 'data/students_roster.csv', size: '12.8 KB', lastModified: '2026-11-03T18:40:00Z', versionId: 'v1.0.2', type: 'text/csv' }
        ],
        policy: JSON.stringify({
          Version: "2012-10-17",
          Statement: [
            {
              Sid: "PublicReadGetObject",
              Effect: "Allow",
              Principal: "*",
              Action: "s3:GetObject",
              Resource: "arn:aws:s3:::scsit-davv-cloud-assets-nikita-2211229/*"
            }
          ]
        }, null, 2)
      }
    ]
  },
  elb: {
    name: 'SCSIT-Production-ALB',
    dnsName: 'scsit-alb-198273645.us-east-1.elb.amazonaws.com',
    type: 'application',
    scheme: 'internet-facing',
    port: 80,
    targetGroup: {
      name: 'tg-web-production',
      protocol: 'HTTP',
      port: 80,
      healthCheckPath: '/health',
      targets: [
        { instanceId: 'i-0a8b9c7d1e2f3456a', port: 80, az: 'us-east-1a', status: 'healthy', requestsHandled: 420 },
        { instanceId: 'i-0f9e8d7c6b5a4321b', port: 80, az: 'us-east-1b', status: 'healthy', requestsHandled: 412 }
      ]
    },
    routingAlgorithm: 'round_robin',
    trafficLog: []
  },
  asg: {
    name: 'asg-web-tier-autoscaling',
    launchTemplate: 'lt-web-tier-v2',
    minSize: 2,
    maxSize: 6,
    desiredCapacity: 2,
    currentCount: 2,
    scalingMetric: 'Average CPUUtilization',
    targetValue: 70, // percent
    currentCpu: 28, // percent
    scaleStatus: 'Optimal (Within Threshold)',
    history: [
      { timestamp: new Date(Date.now() - 3600000 * 4).toLocaleTimeString(), event: 'ASG Initialized with Desired=2, Min=2, Max=6' },
      { timestamp: new Date(Date.now() - 3600000 * 2).toLocaleTimeString(), event: 'Health check verified on all target instances (100% in-service)' }
    ]
  },
  cloudwatch: {
    alarms: [
      { name: 'High-CPU-Utilization-Alarm', metric: 'CPUUtilization', namespace: 'AWS/EC2', threshold: '> 70% for 2 periods', status: 'OK', reason: 'Threshold not breached (Current: 28%)' },
      { name: 'Disk-Space-Remaining-Low', metric: 'DiskSpaceUtilization', namespace: 'System/Linux', threshold: '> 85%', status: 'OK', reason: 'Current disk usage: 48%' },
      { name: 'ALB-5XX-Error-Rate-High', metric: 'HTTPCode_Target_5XX_Count', namespace: 'AWS/ApplicationELB', threshold: '> 5 errors', status: 'OK', reason: '0 error responses recorded in 1 hr' }
    ],
    liveMetrics: {
      cpuHistory: [18, 22, 25, 30, 26, 28],
      networkInKB: [120, 145, 180, 210, 195, 230],
      requestRatePerSec: [14, 18, 24, 22, 19, 21]
    }
  },
  ami: {
    images: [
      { id: 'ami-0c7217cdde317cfec', name: 'Amazon Linux 2023 Official', architecture: 'x86_64', visibility: 'Public', status: 'Available' },
      { id: 'ami-0e1f2a3b4c5d6e7f8', name: 'SCSIT-Apache-PHP-Golden-Image-v1', architecture: 'x86_64', visibility: 'Private (Custom)', status: 'Available', createdFrom: 'i-0a8b9c7d1e2f3456a', description: 'Hardened Apache web server with DAVV portal pre-installed' }
    ]
  },
  iam: {
    users: [
      { name: 'nikita_admin', groups: ['CloudAdmins'], mfa: 'Enabled', accessKey: 'AKIAIOSFODNN7EXAMPLE', status: 'Active' },
      { name: 'harshit_developer', groups: ['Developers'], mfa: 'Enabled', accessKey: 'AKIAI44QH8DHBEXAMPLE', status: 'Active' },
      { name: 'cloud_auditor', groups: ['Auditors'], mfa: 'Disabled', accessKey: 'AKIAEXAMPLEAUDITOR', status: 'Active' }
    ],
    roles: [
      { name: 'EC2-S3-ReadWrite-InstanceRole', trustedEntity: 'ec2.amazonaws.com', policies: ['AmazonS3FullAccess', 'CloudWatchAgentServerPolicy'] },
      { name: 'LambdaExecutionRole-Basic', trustedEntity: 'lambda.amazonaws.com', policies: ['AWSLambdaBasicExecutionRole'] }
    ],
    policies: [
      {
        name: 'SCSIT-Restricted-EC2-Policy',
        effect: 'Allow',
        action: 'ec2:Describe*, ec2:StartInstances, ec2:StopInstances',
        resource: '*'
      }
    ]
  },
  beanstalk: {
    appName: 'SCSIT-Campus-Portal',
    environmentName: 'ScsitCampusPortal-env',
    platform: 'Node.js 20 running on 64bit Amazon Linux 2023',
    tier: 'Web Server',
    health: 'Ok',
    url: 'http://scsitcampusportal-env.eba-3mxkpz.us-east-1.elasticbeanstalk.com',
    status: 'Ready',
    syllabusNote: 'Note: In DAVV lab syllabus, AWS Elastic Beanstalk was crossed out/optional; documented here for completeness and architectural understanding.'
  },
  vpc: {
    vpcId: 'vpc-0198273645aabbcc',
    cidr: '10.0.0.0/16',
    subnets: [
      { id: 'subnet-01public', name: 'Public-Subnet-1A', cidr: '10.0.1.0/24', az: 'us-east-1a', type: 'Public', route: '0.0.0.0/0 -> igw-019a2b' },
      { id: 'subnet-02public', name: 'Public-Subnet-1B', cidr: '10.0.2.0/24', az: 'us-east-1b', type: 'Public', route: '0.0.0.0/0 -> igw-019a2b' },
      { id: 'subnet-03private', name: 'Private-Subnet-1A', cidr: '10.0.3.0/24', az: 'us-east-1a', type: 'Private', route: '0.0.0.0/0 -> nat-098fe1' },
      { id: 'subnet-04private', name: 'Private-Subnet-1B', cidr: '10.0.4.0/24', az: 'us-east-1b', type: 'Private', route: '0.0.0.0/0 -> nat-098fe1' }
    ],
    internetGateway: 'igw-019a2b3c4d5e6f7a',
    natGateway: 'nat-098fe1d2c3b4a590 (EIP: 52.86.12.90)',
    vpnConnection: {
      id: 'vpn-0a9b8c7d6e5f4a3b',
      customerGateway: '203.0.113.12 (SCSIT Campus Router)',
      vpnGateway: 'vgw-0112233445566778',
      status: 'UP (IPsec Tunnel 1 Active, Tunnel 2 Standby)',
      encryption: 'AES-256 / SHA-256 / Diffie-Hellman Group 14'
    }
  },
  lambda: {
    functions: [
      {
        id: 'fn-01',
        name: 'ProcessS3ImageUpload',
        runtime: 'nodejs20.x',
        memoryMB: 256,
        timeoutSec: 15,
        handler: 'index.handler',
        code: `exports.handler = async (event, context) => {
  const bucket = event.Records?.[0]?.s3?.bucket?.name || "test-bucket";
  const key = event.Records?.[0]?.s3?.object?.key || "sample-image.jpg";
  
  console.log("Triggered by S3 event!");
  console.log("Bucket:", bucket);
  console.log("File:", key);
  
  // Generating thumbnail metadata
  const result = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Image successfully processed and thumbnail created!",
      originalKey: key,
      thumbnailKey: "thumbnails/" + key,
      processedAt: new Date().toISOString(),
      student: "Nikita Negi (Roll No: 2211229)",
      institution: "SCSIT DAVV Indore"
    })
  };
  return result;
};`,
        lastInvocation: null
      },
      {
        id: 'fn-02',
        name: 'CloudWatchAlarmNotifier',
        runtime: 'nodejs20.x',
        memoryMB: 128,
        timeoutSec: 10,
        handler: 'index.handler',
        code: `exports.handler = async (event) => {
  const alarmName = event.alarmData?.alarmName || "High-CPU-Utilization-Alarm";
  const state = event.alarmData?.state?.value || "ALARM";
  
  console.log(\`Received CloudWatch Alarm: \${alarmName} in state: \${state}\`);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      notificationSent: true,
      recipient: "nikita.negi@davv.ac.in",
      alertChannel: "AWS SNS -> Student Mobile SMS / Email",
      timestamp: new Date().toISOString()
    })
  };
};`,
        lastInvocation: null
      }
    ]
  }
};

// ==========================================
// SYSTEM CHECK API
// ==========================================

function getSystemStatus() {
  const res = {
    timestamp: new Date().toISOString(),
    os: {
      platform: os.platform(),
      release: os.release(),
      hostname: os.hostname(),
      totalMemGB: (os.totalmem() / (1024 ** 3)).toFixed(1),
      freeMemGB: (os.freemem() / (1024 ** 3)).toFixed(1),
      cpus: os.cpus().length,
      cpuModel: os.cpus()[0]?.model
    },
    node: {
      version: process.version
    },
    git: {
      installed: false,
      version: null
    },
    gh: {
      installed: false,
      status: null,
      username: null
    },
    vbox: {
      installed: false,
      version: null,
      path: null
    },
    awsCli: {
      installed: false,
      version: null
    }
  };

  // Check Git
  try {
    const gitOut = execSync('git --version', { encoding: 'utf8', timeout: 3000 });
    res.git.installed = true;
    res.git.version = gitOut.trim();
  } catch (e) {}

  // Check GitHub CLI
  try {
    const ghOut = execSync('gh auth status', { encoding: 'utf8', timeout: 3000 });
    res.gh.installed = true;
    res.gh.status = ghOut.trim();
    if (ghOut.includes('nikitanegi18')) {
      res.gh.username = 'nikitanegi18';
    }
  } catch (e) {
    if (e.stdout && e.stdout.includes('nikitanegi18')) {
      res.gh.installed = true;
      res.gh.username = 'nikitanegi18';
      res.gh.status = e.stdout.trim();
    }
  }

  // Check VirtualBox
  const vboxPaths = [
    'C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage.exe',
    'C:\\Program Files (x86)\\Oracle\\VirtualBox\\VBoxManage.exe'
  ];
  for (const vp of vboxPaths) {
    if (fs.existsSync(vp)) {
      res.vbox.installed = true;
      res.vbox.path = vp;
      try {
        const vOut = execSync(`"${vp}" --version`, { encoding: 'utf8', timeout: 3000 });
        res.vbox.version = vOut.trim();
        state.vbox.installed = true;
        state.vbox.version = vOut.trim();
        state.vbox.path = vp;
      } catch (err) {
        res.vbox.version = 'Installed';
        state.vbox.installed = true;
      }
      break;
    }
  }

  // Check AWS CLI
  try {
    const awsOut = execSync('aws --version', { encoding: 'utf8', timeout: 3000 });
    res.awsCli.installed = true;
    res.awsCli.version = awsOut.trim();
  } catch (e) {}

  return res;
}

app.get('/api/system-status', (req, res) => {
  res.json(getSystemStatus());
});

// ==========================================
// 1. VIRTUALBOX API
// ==========================================
app.get('/api/vbox/vms', (req, res) => {
  // If VirtualBox is physically installed, try running VBoxManage list vms
  if (state.vbox.path) {
    try {
      const out = execSync(`"${state.vbox.path}" list vms`, { encoding: 'utf8', timeout: 4000 });
      // parsed VMs if any
    } catch (e) {}
  }
  res.json({
    installed: state.vbox.installed,
    version: state.vbox.version,
    vms: state.vbox.vms
  });
});

app.post('/api/vbox/action', (req, res) => {
  const { id, action } = req.body;
  const vm = state.vbox.vms.find(v => v.id === id);
  if (!vm) return res.status(404).json({ error: 'VM not found' });
  if (action === 'start') {
    vm.status = 'Running';
    vm.uptime = 'Just started';
    if (vm.ip === '-') vm.ip = '192.168.56.102';
  } else if (action === 'stop') {
    vm.status = 'Powered Off';
    vm.uptime = '-';
  } else if (action === 'pause') {
    vm.status = 'Paused';
  }
  res.json({ success: true, vm });
});

// ==========================================
// 2. EC2 API
// ==========================================
app.get('/api/ec2/instances', (req, res) => {
  res.json(state.ec2.instances);
});

app.post('/api/ec2/launch', (req, res) => {
  const { name, type, amiId } = req.body;
  const newInst = {
    id: 'i-0' + Math.random().toString(16).substring(2, 18),
    name: name || 'Demo-EC2-Instance',
    type: type || 't2.micro',
    state: 'running',
    publicIp: `54.${Math.floor(Math.random() * 200 + 10)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`,
    privateIp: `10.0.1.${Math.floor(Math.random() * 200 + 10)}`,
    az: 'us-east-1a',
    securityGroups: ['sg-01a2b3c4 (SSH:22, HTTP:80)'],
    keyName: 'davv-cloud-keypair.pem',
    amiId: amiId || 'ami-0c7217cdde317cfec (Amazon Linux 2023)',
    launchTime: new Date().toISOString(),
    webResponse: `<h1>Welcome to ${name || 'New EC2 Instance'}</h1><p>Running on Amazon Linux 2023 | Launched at: ${new Date().toLocaleTimeString()}</p>`
  };
  state.ec2.instances.push(newInst);
  res.json({ success: true, instance: newInst });
});

app.post('/api/ec2/toggle', (req, res) => {
  const { id, targetState } = req.body;
  const inst = state.ec2.instances.find(i => i.id === id);
  if (!inst) return res.status(404).json({ error: 'Instance not found' });
  inst.state = targetState;
  res.json({ success: true, instance: inst });
});

// ==========================================
// 3. EBS API
// ==========================================
app.get('/api/ebs/volumes', (req, res) => {
  res.json({
    volumes: state.ebs.volumes,
    snapshots: state.ebs.snapshots
  });
});

app.post('/api/ebs/create', (req, res) => {
  const { sizeGB, type, az } = req.body;
  const newVol = {
    id: 'vol-0' + Math.random().toString(16).substring(2, 18),
    sizeGB: Number(sizeGB) || 20,
    type: type || 'gp3',
    iops: 3000,
    az: az || 'us-east-1a',
    state: 'available',
    attachedInstance: null,
    device: null,
    encrypted: true
  };
  state.ebs.volumes.push(newVol);
  res.json({ success: true, volume: newVol });
});

app.post('/api/ebs/attach', (req, res) => {
  const { volumeId, instanceId, device } = req.body;
  const vol = state.ebs.volumes.find(v => v.id === volumeId);
  if (!vol) return res.status(404).json({ error: 'Volume not found' });
  vol.state = 'in-use';
  vol.attachedInstance = instanceId;
  vol.device = device || '/dev/xvdf';
  res.json({ success: true, volume: vol });
});

app.post('/api/ebs/snapshot', (req, res) => {
  const { volumeId, description } = req.body;
  const vol = state.ebs.volumes.find(v => v.id === volumeId);
  if (!vol) return res.status(404).json({ error: 'Volume not found' });
  const snap = {
    id: 'snap-0' + Math.random().toString(16).substring(2, 14),
    volumeId: vol.id,
    sizeGB: vol.sizeGB,
    description: description || `Snapshot of ${vol.id}`,
    progress: '100%',
    created: new Date().toISOString()
  };
  state.ebs.snapshots.push(snap);
  res.json({ success: true, snapshot: snap });
});

// ==========================================
// 4. S3 API
// ==========================================
app.get('/api/s3/buckets', (req, res) => {
  res.json(state.s3.buckets);
});

app.post('/api/s3/create-bucket', (req, res) => {
  const { name, region } = req.body;
  if (!name) return res.status(400).json({ error: 'Bucket name required' });
  const b = {
    name: name.toLowerCase().replace(/[^a-z0-9.-]/g, '-'),
    region: region || 'us-east-1',
    created: new Date().toISOString(),
    versioning: true,
    staticWebsite: false,
    websiteEndpoint: null,
    objects: [],
    policy: ''
  };
  state.s3.buckets.push(b);
  res.json({ success: true, bucket: b });
});

app.post('/api/s3/upload', (req, res) => {
  const { bucketName, key, contentType, size } = req.body;
  const b = state.s3.buckets.find(x => x.name === bucketName);
  if (!b) return res.status(404).json({ error: 'Bucket not found' });
  const obj = {
    key: key || 'file_' + Date.now() + '.txt',
    size: size || '4.2 KB',
    lastModified: new Date().toISOString(),
    versionId: 'v' + Math.random().toString(36).substring(2, 8),
    type: contentType || 'text/plain'
  };
  b.objects.unshift(obj);
  res.json({ success: true, object: obj });
});

// ==========================================
// 5. ELB API
// ==========================================
app.get('/api/elb/status', (req, res) => {
  res.json(state.elb);
});

app.post('/api/elb/send-traffic', (req, res) => {
  const { count = 10 } = req.body;
  const tg = state.elb.targetGroup;
  const healthyTargets = tg.targets.filter(t => t.status === 'healthy');
  if (healthyTargets.length === 0) {
    return res.status(503).json({ error: '503 Service Unavailable: No healthy targets in ELB target group!' });
  }

  const results = [];
  let rrIndex = 0;
  for (let i = 0; i < count; i++) {
    const target = healthyTargets[rrIndex % healthyTargets.length];
    target.requestsHandled += 1;
    rrIndex++;
    results.push({
      reqNum: i + 1,
      targetId: target.instanceId,
      az: target.az,
      statusCode: 200,
      responseTimeMs: Math.floor(Math.random() * 25 + 8)
    });
  }

  const summary = {
    totalRequests: count,
    healthyInstancesCount: healthyTargets.length,
    distribution: healthyTargets.map(t => ({ instanceId: t.instanceId, totalHandled: t.requestsHandled })),
    sampleLogs: results.slice(0, 10)
  };

  state.elb.trafficLog.unshift({
    timestamp: new Date().toLocaleTimeString(),
    count,
    details: summary
  });

  res.json({ success: true, summary });
});

app.post('/api/elb/toggle-health', (req, res) => {
  const { instanceId } = req.body;
  const t = state.elb.targetGroup.targets.find(x => x.instanceId === instanceId);
  if (!t) return res.status(404).json({ error: 'Target not found' });
  t.status = t.status === 'healthy' ? 'unhealthy' : 'healthy';
  res.json({ success: true, target: t });
});

// ==========================================
// 6. AUTO SCALING (ASG) API
// ==========================================
app.get('/api/asg/status', (req, res) => {
  res.json(state.asg);
});

app.post('/api/asg/set-load', (req, res) => {
  const { cpuPercent } = req.body;
  const cpu = Math.max(5, Math.min(100, Number(cpuPercent) || 50));
  state.asg.currentCpu = cpu;
  state.cloudwatch.liveMetrics.cpuHistory.push(cpu);
  if (state.cloudwatch.liveMetrics.cpuHistory.length > 8) {
    state.cloudwatch.liveMetrics.cpuHistory.shift();
  }

  let actionTaken = 'No scaling needed (Capacity optimal)';
  if (cpu > state.asg.targetValue && state.asg.currentCount < state.asg.maxSize) {
    state.asg.currentCount += 1;
    state.asg.desiredCapacity = state.asg.currentCount;
    state.asg.scaleStatus = `Scaling OUT (+1 Instance triggered: CPU ${cpu}% > ${state.asg.targetValue}%)`;
    actionTaken = `Scale Out triggered! Spawned instance #i-scale${state.asg.currentCount}. Desired capacity now ${state.asg.currentCount}.`;
    state.asg.history.unshift({
      timestamp: new Date().toLocaleTimeString(),
      event: actionTaken
    });
    // Add to ELB target group
    state.elb.targetGroup.targets.push({
      instanceId: `i-asg-dyn${state.asg.currentCount}`,
      port: 80,
      az: state.asg.currentCount % 2 === 0 ? 'us-east-1b' : 'us-east-1a',
      status: 'healthy',
      requestsHandled: 0
    });
  } else if (cpu < 30 && state.asg.currentCount > state.asg.minSize) {
    state.asg.currentCount -= 1;
    state.asg.desiredCapacity = state.asg.currentCount;
    state.asg.scaleStatus = `Scaling IN (-1 Instance terminated: CPU ${cpu}% < 30%)`;
    actionTaken = `Scale In triggered! Terminated instance. Capacity reduced to ${state.asg.currentCount}.`;
    state.asg.history.unshift({
      timestamp: new Date().toLocaleTimeString(),
      event: actionTaken
    });
  } else {
    state.asg.scaleStatus = `Normal (CPU: ${cpu}%, Target: ${state.asg.targetValue}%)`;
  }

  // Update CloudWatch alarm state
  const cpuAlarm = state.cloudwatch.alarms.find(a => a.metric === 'CPUUtilization');
  if (cpuAlarm) {
    if (cpu > state.asg.targetValue) {
      cpuAlarm.status = 'ALARM';
      cpuAlarm.reason = `BREACH: CPU at ${cpu}% (Threshold: > 70%)`;
    } else {
      cpuAlarm.status = 'OK';
      cpuAlarm.reason = `Normal: CPU at ${cpu}% (Threshold: > 70%)`;
    }
  }

  res.json({
    success: true,
    asg: state.asg,
    actionTaken
  });
});

// ==========================================
// 7. CLOUDWATCH API
// ==========================================
app.get('/api/cloudwatch/status', (req, res) => {
  res.json(state.cloudwatch);
});

// ==========================================
// 8. AMI API
// ==========================================
app.get('/api/ami/images', (req, res) => {
  res.json(state.ami.images);
});

app.post('/api/ami/create', (req, res) => {
  const { name, instanceId, description } = req.body;
  const newAmi = {
    id: 'ami-0' + Math.random().toString(16).substring(2, 18),
    name: name || 'Custom-SCSIT-AMI',
    architecture: 'x86_64',
    visibility: 'Private (Custom)',
    status: 'Available',
    createdFrom: instanceId || 'i-0a8b9c7d1e2f3456a',
    description: description || 'Created from instance snapshot'
  };
  state.ami.images.push(newAmi);
  res.json({ success: true, ami: newAmi });
});

// ==========================================
// 9. IAM API
// ==========================================
app.get('/api/iam/overview', (req, res) => {
  res.json(state.iam);
});

app.post('/api/iam/test-policy', (req, res) => {
  const { action, resource } = req.body;
  // Evaluate if action matches
  let allowed = false;
  let matchingPolicy = 'Default Deny';

  if (action.startsWith('ec2:Describe') || action === 'ec2:StartInstances' || action === 'ec2:StopInstances') {
    allowed = true;
    matchingPolicy = 'SCSIT-Restricted-EC2-Policy (Effect: Allow)';
  } else if (action === 's3:GetObject' || action === 's3:PutObject') {
    allowed = true;
    matchingPolicy = 'AmazonS3FullAccess (via Group Developers)';
  } else if (action === 'iam:CreateUser') {
    allowed = false;
    matchingPolicy = 'Implicit Deny: Action requires AdministratorAccess';
  }

  res.json({
    action,
    resource: resource || '*',
    decision: allowed ? 'ALLOWED' : 'DENIED',
    matchingPolicy,
    evaluatedAt: new Date().toISOString()
  });
});

// ==========================================
// 10. BEANSTALK API
// ==========================================
app.get('/api/beanstalk/status', (req, res) => {
  res.json(state.beanstalk);
});

// ==========================================
// 11. VPC / VPN API
// ==========================================
app.get('/api/vpc/topology', (req, res) => {
  res.json(state.vpc);
});

// ==========================================
// 12. GITHUB LIVE API
// ==========================================
app.get('/api/github/live', (req, res) => {
  let profile = { username: 'nikitanegi18', name: 'Nikita Negi', public_repos: 12 };
  let repos = [];
  try {
    const profOut = execSync('gh api user', { encoding: 'utf8', timeout: 5000 });
    profile = JSON.parse(profOut);
  } catch (e) {}

  try {
    const repoOut = execSync('gh repo list nikitanegi18 --limit 10 --json name,description,isPrivate,updatedAt,url', { encoding: 'utf8', timeout: 5000 });
    repos = JSON.parse(repoOut);
  } catch (e) {}

  res.json({
    connected: true,
    user: profile,
    repositories: repos,
    featuresExplored: [
      { feature: 'Repository Creation & Forking', status: 'Verified', description: 'Remote git storage and downstream branching.' },
      { feature: 'Branching & Pull Requests', status: 'Verified', description: 'Feature branch workflows, code review and merge conflict resolution.' },
      { feature: 'GitHub Actions (CI/CD)', status: 'Verified', description: 'Automated test execution, linting and build deployments.' },
      { feature: 'GitHub Pages', status: 'Verified', description: 'Static CDN hosting directly from repository gh-pages branch.' },
      { feature: 'Issues & Project Kanban', status: 'Verified', description: 'Milestone tracking and agile issue management.' },
      { feature: 'SSH Keys & Token Auth', status: 'Verified', description: 'Cryptographic public/private key pairs for push/pull access.' }
    ]
  });
});

// ==========================================
// 13. AWS LAMBDA FUNCTION LIVE RUNNER
// ==========================================
app.get('/api/lambda/functions', (req, res) => {
  res.json(state.lambda.functions);
});

app.post('/api/lambda/invoke', (req, res) => {
  const { id, payload } = req.body;
  const fn = state.lambda.functions.find(f => f.id === id);
  if (!fn) return res.status(404).json({ error: 'Lambda function not found' });

  const startTime = process.hrtime();
  const logs = [];

  const sandbox = {
    console: {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
      error: (...args) => logs.push('[ERROR] ' + args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '))
    },
    exports: {},
    Date,
    JSON,
    Math,
    setTimeout
  };

  try {
    vm.createContext(sandbox);
    vm.runInContext(fn.code, sandbox, { timeout: 3000 });

    if (typeof sandbox.exports.handler !== 'function') {
      return res.status(400).json({ error: 'No export named handler found in Lambda function' });
    }

    const context = {
      functionName: fn.name,
      memoryLimitInMB: fn.memoryMB,
      awsRequestId: 'c4e5f6-req-' + Math.random().toString(36).substring(2, 10),
      getRemainingTimeInMillis: () => 14850
    };

    let parsedEvent = {};
    try {
      parsedEvent = typeof payload === 'string' ? JSON.parse(payload) : (payload || {});
    } catch (pe) {
      parsedEvent = { raw: payload };
    }

    Promise.resolve(sandbox.exports.handler(parsedEvent, context))
      .then(response => {
        const diff = process.hrtime(startTime);
        const durationMs = ((diff[0] * 1e9 + diff[1]) / 1e6).toFixed(2);
        const billedMs = Math.ceil(Number(durationMs) / 100) * 100;

        const resultObj = {
          success: true,
          functionName: fn.name,
          requestId: context.awsRequestId,
          durationMs: `${durationMs} ms`,
          billedDurationMs: `${billedMs} ms`,
          memoryUsedMB: `${Math.floor(Math.random() * 20 + 35)} MB of ${fn.memoryMB} MB`,
          response,
          logs
        };
        fn.lastInvocation = resultObj;
        res.json(resultObj);
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: err.message,
          stack: err.stack,
          logs
        });
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      logs
    });
  }
});

// Root fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SCSIT DAVV Cloud Computing Lab Portal Running!`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🎓 Student: Nikita Negi (2211229) | MCA 3rd Sem`);
  console.log(`👩‍🏫 Submitted to: Dr. Shraddha Masih`);
  console.log(`=======================================================`);
});
