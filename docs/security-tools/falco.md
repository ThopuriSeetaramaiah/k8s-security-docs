---
sidebar_position: 3
---

# Falco

Falco is an open-source cloud-native runtime security tool designed to detect anomalous activity in your applications and containers.

## Overview

Falco, originally created by Sysdig and now a CNCF graduated project, acts as a security camera for your Kubernetes clusters. It continuously monitors system calls at the kernel level and alerts on suspicious behaviors based on a set of rules.

Key features of Falco include:
- Real-time threat detection
- Kubernetes-aware security rules
- Minimal performance impact
- Extensive rule customization
- Integration with various notification channels

## How Falco Works

Falco operates by:
1. Monitoring system calls at the kernel level
2. Applying rules to detect suspicious behavior
3. Generating alerts when rules are triggered
4. Sending notifications to configured outputs

## Installation

### Using Helm

```bash
# Add the Falco Helm repository
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm repo update

# Install Falco with default settings
helm install falco falcosecurity/falco --namespace falco --create-namespace
```

### Using DaemonSet

```bash
# Apply the Falco DaemonSet
kubectl apply -f https://raw.githubusercontent.com/falcosecurity/falco/master/falco.yaml
```

### On a Host

```bash
# For Debian/Ubuntu
curl -s https://falco.org/repo/falcosecurity-3672BA8F.asc | apt-key add -
echo "deb https://download.falco.org/packages/deb stable main" | tee -a /etc/apt/sources.list.d/falcosecurity.list
apt-get update -y
apt-get install -y falco

# For RHEL/CentOS
rpm --import https://falco.org/repo/falcosecurity-3672BA8F.asc
curl -s -o /etc/yum.repos.d/falcosecurity.repo https://falco.org/repo/falcosecurity-rpm.repo
yum install -y falco
```

## Configuration

Falco's main configuration file is `/etc/falco/falco.yaml`. Key configuration sections include:

### Rules Files

```yaml
rules_file:
  - /etc/falco/falco_rules.yaml
  - /etc/falco/falco_rules.local.yaml
  - /etc/falco/rules.d
```

### Outputs

```yaml
stdout_output:
  enabled: true

file_output:
  enabled: true
  filename: /var/log/falco.log

syslog_output:
  enabled: true

program_output:
  enabled: false
  program: "jq '{text: .output}' | curl -d @- -X POST https://hooks.slack.com/services/XXX"
```

## Default Rules

Falco comes with a comprehensive set of default rules that detect:

- Privilege escalation
- Container escape attempts
- Unauthorized access to sensitive files
- Suspicious network connections
- Unexpected process execution
- And many more security-relevant events

Example rule:

```yaml
- rule: Terminal shell in container
  desc: A shell was used as the entrypoint/exec point into a container with an attached terminal
  condition: >
    container.id != host and
    proc.name = bash and
    evt.type = execve and
    evt.dir=< and
    proc.tty != 0 and
    container.image.repository != k8s.gcr.io/pause
  output: >
    A shell was spawned in a container with an attached terminal (user=%user.name
    container_id=%container.id container_name=%container.name shell=%proc.name parent=%proc.pname
    cmdline=%proc.cmdline terminal=%proc.tty container_image=%container.image.repository:%container.image.tag)
  priority: NOTICE
  tags: [container, shell, mitre_execution]
```

## Custom Rules

You can create custom rules to detect specific behaviors relevant to your environment:

```yaml
# /etc/falco/falco_rules.local.yaml
- rule: Custom - Sensitive File Access
  desc: Detect access to sensitive configuration files
  condition: >
    open_read and
    fd.name startswith /etc/myapp/secrets and
    not proc.name in (myapp, myapp-agent)
  output: >
    Sensitive file accessed by non-authorized process
    (user=%user.name command=%proc.cmdline file=%fd.name)
  priority: WARNING
  tags: [file, mitre_credential_access]
```

## Integrations

### Kubernetes

Falco can be deployed as a DaemonSet to monitor all nodes in your cluster:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: falco
  namespace: falco
spec:
  selector:
    matchLabels:
      app: falco
  template:
    metadata:
      labels:
        app: falco
    spec:
      containers:
      - name: falco
        image: falcosecurity/falco:latest
        securityContext:
          privileged: true
        volumeMounts:
        - name: dev
          mountPath: /host/dev
        - name: proc
          mountPath: /host/proc
        - name: boot
          mountPath: /host/boot
        - name: lib-modules
          mountPath: /host/lib/modules
        - name: usr
          mountPath: /host/usr
        - name: etc
          mountPath: /host/etc
      volumes:
      - name: dev
        hostPath:
          path: /dev
      - name: proc
        hostPath:
          path: /proc
      - name: boot
        hostPath:
          path: /boot
      - name: lib-modules
        hostPath:
          path: /lib/modules
      - name: usr
        hostPath:
          path: /usr
      - name: etc
        hostPath:
          path: /etc
```

### Alert Outputs

Falco supports various output methods:

- Slack
- Discord
- Email
- PagerDuty
- Custom webhooks
- NATS
- gRPC

Example Slack integration:

```yaml
program_output:
  enabled: true
  program: "jq '{text: .output}' | curl -d @- -X POST https://hooks.slack.com/services/YOUR_WEBHOOK_URL"
```

## Best Practices

1. **Start with default rules**: Begin with the default ruleset and customize as needed
2. **Tune rules for your environment**: Adjust rules to reduce false positives
3. **Use priority levels effectively**: Configure different notification channels based on alert priority
4. **Implement proper alert handling**: Ensure alerts are routed to the right teams
5. **Update regularly**: Keep Falco and its rules updated to detect the latest threats
6. **Monitor Falco's performance**: Ensure it's not impacting your workloads

## Troubleshooting

### Common Issues

1. **High CPU usage**:
   - Tune rules to be more specific
   - Increase the syscall buffer size

2. **Missing events**:
   - Check if the kernel module is loaded
   - Verify Falco service is running

3. **False positives**:
   - Customize rules to exclude legitimate behavior
   - Use lists to define allowed processes or files

### Debugging

```bash
# Check Falco status
systemctl status falco

# View Falco logs
journalctl -u falco

# Test rules syntax
falco -L

# Run in debug mode
falco -d
```

## Next Steps

After implementing Falco for runtime security monitoring, consider using [kube-hunter](kube-hunter) to actively test your cluster for security vulnerabilities.
