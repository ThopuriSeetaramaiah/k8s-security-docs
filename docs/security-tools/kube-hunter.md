---
sidebar_position: 4
---

# kube-hunter

kube-hunter is an open-source tool designed to hunt for security weaknesses in Kubernetes clusters. It performs penetration testing by actively probing for known vulnerabilities and misconfigurations.

## Overview

kube-hunter, developed by Aqua Security, helps security teams and cluster administrators identify security issues in their Kubernetes deployments. It works by scanning Kubernetes clusters, identifying components, and testing for security vulnerabilities.

Key features include:
- Active hunting for security issues
- Multiple scanning modes
- Comprehensive vulnerability database
- Detailed reporting
- Easy to use interface

## How kube-hunter Works

kube-hunter operates in three main phases:

1. **Reconnaissance**: Discovers Kubernetes components and services
2. **Vulnerability Scanning**: Tests discovered components for known vulnerabilities
3. **Reporting**: Provides detailed information about findings

## Installation

kube-hunter is designed to be run without installation, making it easy to use in various environments.

### Using Docker

```bash
docker run -it --rm aquasec/kube-hunter
```

### Using Python

```bash
pip install kube-hunter
kube-hunter
```

## Usage Modes

kube-hunter can be run in three different modes:

### 1. Remote Scanning

Scans a Kubernetes cluster from outside:

```bash
kube-hunter --remote <cluster_ip>
```

### 2. Internal Scanning

Runs from within the cluster to find internal vulnerabilities:

```bash
# Using kubectl
kubectl run kube-hunter --restart=Never -it --rm --image aquasec/kube-hunter -- --pod

# Using Docker in host network mode
docker run -it --rm --network host aquasec/kube-hunter
```

### 3. Network Scanning

Scans a network range for Kubernetes clusters:

```bash
kube-hunter --cidr 10.0.0.0/24
```

## Command Line Options

```bash
# Basic scan with interactive mode
kube-hunter

# Scan specific IP
kube-hunter --remote 10.0.0.1

# Scan network range
kube-hunter --cidr 10.0.0.0/24

# Run in pod scanning mode
kube-hunter --pod

# Generate JSON report
kube-hunter --report json

# Specify active hunting (attempts exploitation)
kube-hunter --active
```

## Understanding Results

kube-hunter categorizes findings into three severity levels:

1. **Low**: Informational findings that might help attackers but don't directly lead to compromise
2. **Medium**: Vulnerabilities that could be part of an attack chain
3. **High**: Critical vulnerabilities that could lead to immediate compromise

Example report:

```
+--------+----------------------+----------------------+----------------------+----------+
| ID     | LOCATION             | CATEGORY             | VULNERABILITY        | SEVERITY |
+--------+----------------------+----------------------+----------------------+----------+
| KHV002 | 10.0.0.1:8080        | Information          | K8s Version          | low      |
|        |                      | Disclosure           | Disclosure           |          |
+--------+----------------------+----------------------+----------------------+----------+
| KHV005 | 10.0.0.1:8080        | Access Risk          | Anonymous            | medium   |
|        |                      |                      | Authentication       |          |
+--------+----------------------+----------------------+----------------------+----------+
| KHV006 | 10.0.0.1:10250       | Remote Code          | Exposed Kubelet      | high     |
|        |                      | Execution            | API                  |          |
+--------+----------------------+----------------------+----------------------+----------+
```

## Common Vulnerabilities Detected

kube-hunter can detect numerous vulnerabilities, including:

1. **Exposed Dashboards**: Kubernetes Dashboard accessible without authentication
2. **Insecure Ports**: Open Kubelet or API server ports
3. **Anonymous Authentication**: API server allowing anonymous access
4. **Certificate Issues**: Weak or misconfigured TLS certificates
5. **Privileged Containers**: Containers running with excessive privileges
6. **Service Account Misconfigurations**: Overly permissive service accounts
7. **Network Policy Gaps**: Missing network policies allowing unrestricted communication

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Kubernetes Security Scan

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

jobs:
  kube-hunter:
    runs-on: ubuntu-latest
    steps:
    - name: Run kube-hunter
      run: |
        docker run --rm aquasec/kube-hunter --remote ${{ secrets.CLUSTER_IP }} --report json > kube-hunter-results.json
    
    - name: Upload results
      uses: actions/upload-artifact@v2
      with:
        name: kube-hunter-results
        path: kube-hunter-results.json
```

## Best Practices

1. **Regular Scanning**: Run kube-hunter regularly as part of your security routine
2. **Scan from Multiple Perspectives**: Run both external and internal scans
3. **Prioritize Remediation**: Address high-severity findings first
4. **Use in Non-Production First**: Test in development environments before production
5. **Combine with Other Tools**: Use alongside kube-bench and other security tools
6. **Review Reports Thoroughly**: Understand the context of each finding

## Active vs. Passive Hunting

By default, kube-hunter runs in passive mode, which only identifies vulnerabilities without attempting exploitation. Active mode will attempt to exploit discovered vulnerabilities to confirm their impact:

```bash
kube-hunter --active
```

:::caution
Active hunting should only be performed in non-production environments or with explicit permission, as it could potentially disrupt services.
:::

## Limitations

- kube-hunter focuses on known vulnerabilities and may not detect novel security issues
- Some vulnerabilities require active exploitation to confirm, which may not be suitable for production
- False positives can occur depending on your cluster configuration
- Network restrictions may limit the effectiveness of remote scanning

## Next Steps

After identifying vulnerabilities with kube-hunter, use the [CIS Benchmarks](../compliance/cis-benchmarks) to ensure your cluster meets industry-standard security configurations.
