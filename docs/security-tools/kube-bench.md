---
sidebar_position: 1
---

# kube-bench

kube-bench is an open-source tool that checks whether Kubernetes is deployed according to security best practices as defined in the CIS Kubernetes Benchmark.

## Overview

The Center for Internet Security (CIS) Kubernetes Benchmark provides security recommendations for configuring Kubernetes components. kube-bench automates the process of checking your cluster against these recommendations.

## Installation

### Using kubectl

You can run kube-bench as a job in your Kubernetes cluster:

```bash
kubectl apply -f https://raw.githubusercontent.com/aquasecurity/kube-bench/main/job.yaml
```

To view the results:

```bash
kubectl logs job.batch/kube-bench
```

### Using Docker

```bash
docker run --rm -v `pwd`:/tmp/results aquasec/kube-bench:latest --outputfile /tmp/results/kube-bench-results.json --json
```

### On the Host

```bash
# Download the latest release
curl -L https://github.com/aquasecurity/kube-bench/releases/download/v0.6.10/kube-bench_0.6.10_linux_amd64.tar.gz -o kube-bench_0.6.10_linux_amd64.tar.gz

# Extract the downloaded file
tar -xvf kube-bench_0.6.10_linux_amd64.tar.gz

# Run kube-bench
./kube-bench
```

## Usage

### Basic Usage

```bash
kube-bench
```

This will automatically detect your Kubernetes version and run the appropriate checks.

### Specify Kubernetes Version

```bash
kube-bench --version 1.24
```

### Run Specific Tests

```bash
# Run only control plane checks
kube-bench run --targets master

# Run only node checks
kube-bench run --targets node

# Run only etcd checks
kube-bench run --targets etcd
```

### Output Formats

```bash
# JSON output
kube-bench --json

# YAML output
kube-bench --yaml

# JUnit output
kube-bench --junit
```

## Understanding Results

kube-bench results are organized by control sections from the CIS Benchmark:

1. **Control Plane Security Configuration**
2. **etcd Node Configuration**
3. **Control Plane Configuration**
4. **Worker Node Security Configuration**
5. **Kubernetes Policies**

Each check has a status:

- **PASS**: The check passed
- **FAIL**: The check failed
- **WARN**: The check needs manual verification
- **INFO**: Informational only

## Example Output

```
[INFO] 1 Master Node Security Configuration
[INFO] 1.1 Master Node Configuration Files
[PASS] 1.1.1 Ensure that the API server pod specification file permissions are set to 644 or more restrictive
[PASS] 1.1.2 Ensure that the API server pod specification file ownership is set to root:root
[FAIL] 1.1.3 Ensure that the controller manager pod specification file permissions are set to 644 or more restrictive
```

## Remediation

For each failed check, kube-bench provides remediation steps. For example:

```
[FAIL] 1.1.3 Ensure that the controller manager pod specification file permissions are set to 644 or more restrictive
Remediation: Run the following command:
chmod 644 /etc/kubernetes/manifests/kube-controller-manager.yaml
```

## Integration with CI/CD

You can integrate kube-bench into your CI/CD pipeline to ensure your clusters meet security standards before deployment.

### Example GitHub Actions Workflow

```yaml
name: Kubernetes Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  kube-bench:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2
    
    - name: Set up Kubernetes cluster
      uses: engineerd/setup-kind@v0.5.0
    
    - name: Run kube-bench
      run: |
        kubectl apply -f https://raw.githubusercontent.com/aquasecurity/kube-bench/main/job.yaml
        sleep 30
        kubectl logs job.batch/kube-bench > kube-bench-results.txt
    
    - name: Check for failures
      run: |
        if grep -q "\[FAIL\]" kube-bench-results.txt; then
          echo "kube-bench found security issues"
          exit 1
        fi
```

## Best Practices

1. **Run regularly**: Schedule regular kube-bench scans to ensure ongoing compliance
2. **Prioritize remediation**: Focus on high-risk findings first
3. **Document exceptions**: If you can't remediate certain findings, document why
4. **Test in non-production**: Run kube-bench in development environments before production
5. **Automate remediation**: Create scripts to automatically fix common issues

## Limitations

- kube-bench checks configurations but cannot detect runtime security issues
- Some checks require manual verification
- Results may vary depending on your Kubernetes distribution
- Not all checks apply to all environments (especially managed Kubernetes services)

## Next Steps

After running kube-bench and addressing findings, consider using [Trivy](trivy) to scan your container images for vulnerabilities.
