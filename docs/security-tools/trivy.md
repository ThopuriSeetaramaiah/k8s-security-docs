---
sidebar_position: 2
---

# Trivy

Trivy is a comprehensive and versatile security scanner. It detects vulnerabilities in container images, file systems, git repositories, and more.

## Overview

Trivy is an open-source vulnerability scanner developed by Aqua Security. It's designed to find vulnerabilities in various artifacts, with a focus on container security. Trivy can scan:

- Container images
- Filesystem directories
- Git repositories
- Virtual machine images
- Kubernetes manifests
- Infrastructure as Code (Terraform, CloudFormation, etc.)

## Installation

### macOS

```bash
brew install aquasecurity/trivy/trivy
```

### Ubuntu/Debian

```bash
apt-get install wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/trivy.list
apt-get update
apt-get install trivy
```

### RHEL/CentOS

```bash
rpm -ivh https://github.com/aquasecurity/trivy/releases/download/v0.36.1/trivy_0.36.1_Linux-64bit.rpm
```

### Using Docker

```bash
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v $HOME/.cache:/root/.cache aquasec/trivy:latest image nginx:latest
```

## Basic Usage

### Scanning Container Images

```bash
# Scan a container image
trivy image nginx:latest

# Scan with specific severity levels
trivy image --severity HIGH,CRITICAL nginx:latest

# Output in JSON format
trivy image --format json --output results.json nginx:latest
```

### Scanning Filesystem

```bash
# Scan a local project directory
trivy fs /path/to/project

# Scan for specific vulnerability types
trivy fs --vuln-type os,library /path/to/project
```

### Scanning Kubernetes Manifests

```bash
# Scan Kubernetes YAML files
trivy config --severity HIGH,CRITICAL kubernetes.yaml

# Scan a directory containing Kubernetes manifests
trivy config --severity HIGH,CRITICAL ./k8s-manifests/
```

### Scanning Infrastructure as Code

```bash
# Scan Terraform files
trivy config --severity HIGH,CRITICAL main.tf

# Scan a directory containing Terraform files
trivy config --severity HIGH,CRITICAL ./terraform/
```

## Integration with CI/CD

### GitHub Actions

```yaml
name: Trivy Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  scan:
    name: Trivy Scan
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'table'
          exit-code: '1'
          ignore-unfixed: true
          severity: 'CRITICAL,HIGH'
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    stages {
        stage('Scan') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL --no-progress your-image:latest'
            }
        }
    }
}
```

## Best Practices

1. **Scan Early and Often**: Integrate Trivy into your CI/CD pipeline to catch vulnerabilities early
2. **Focus on Actionable Results**: Start by addressing HIGH and CRITICAL vulnerabilities
3. **Keep Trivy Updated**: Regularly update Trivy to get the latest vulnerability database
4. **Use Ignore Files**: Create `.trivyignore` files for false positives or vulnerabilities you've accepted
5. **Combine with Other Tools**: Use Trivy alongside other security tools for comprehensive coverage

## Advanced Features

### Custom Policies

Trivy supports custom policies using Open Policy Agent (OPA) and Rego:

```bash
trivy config --policy ./custom-policies/ kubernetes.yaml
```

### Offline Scanning

For air-gapped environments:

```bash
# Download vulnerability database
trivy image --download-db-only

# Scan using the downloaded database
trivy image --skip-update nginx:latest
```

### Cache Management

```bash
# Clear cache
trivy image --clear-cache

# Specify cache directory
trivy image --cache-dir /path/to/cache nginx:latest
```

## Limitations

- Trivy primarily focuses on known vulnerabilities in packages and dependencies
- It may not detect logical vulnerabilities or misconfigurations in custom code
- Results depend on the completeness of vulnerability databases
- Some vulnerabilities may be false positives if they don't apply to your usage

## Next Steps

After scanning your container images with Trivy, consider using [Falco](falco) for runtime security monitoring of your Kubernetes workloads.
