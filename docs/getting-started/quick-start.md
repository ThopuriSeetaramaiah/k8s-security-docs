---
sidebar_position: 2
---

# Quick Start Guide

This quick start guide will help you implement basic security measures for your Kubernetes cluster. Follow these steps to establish a baseline security posture.

## 1. Secure the Kubernetes API Server

The API server is the central component of Kubernetes. Securing it should be your first priority.

```bash
# Check current API server configuration
kubectl get pods -n kube-system | grep kube-apiserver
kubectl describe pod [kube-apiserver-pod-name] -n kube-system
```

Ensure these flags are set in your API server configuration:
- `--anonymous-auth=false`
- `--authorization-mode=Node,RBAC`
- `--enable-admission-plugins=NodeRestriction,PodSecurityPolicy`
- `--encryption-provider-config=/etc/kubernetes/encryption/encryption-config.yaml`

## 2. Implement RBAC

Role-Based Access Control (RBAC) is essential for limiting access to your cluster resources.

```yaml
# Create a read-only role for developers
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: development
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
---
# Bind the role to a user or group
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: development
subjects:
- kind: User
  name: jane
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

Save this to a file and apply it:
```bash
kubectl apply -f rbac-config.yaml
```

## 3. Configure Network Policies

Network policies restrict the traffic between pods and namespaces.

```yaml
# Default deny all ingress traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: development
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

Save this to a file and apply it:
```bash
kubectl apply -f network-policy.yaml
```

## 4. Secure Container Images

Use minimal base images and scan for vulnerabilities.

```bash
# Scan an image with Trivy
trivy image nginx:latest

# Use distroless or minimal images in your Dockerfile
FROM gcr.io/distroless/static-debian11
COPY --from=builder /app/myapp /
CMD ["/myapp"]
```

## 5. Run a Security Audit

Use kube-bench to audit your cluster against CIS benchmarks.

```bash
kubectl apply -f https://raw.githubusercontent.com/aquasecurity/kube-bench/main/job.yaml
kubectl logs job.batch/kube-bench
```

## 6. Enable Audit Logging

Audit logging helps track actions performed in your cluster.

For managed Kubernetes services, refer to your provider's documentation:
- [AWS EKS Audit Logs](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)
- [GKE Audit Logs](https://cloud.google.com/kubernetes-engine/docs/how-to/audit-logging)
- [AKS Audit Logs](https://docs.microsoft.com/en-us/azure/aks/view-control-plane-logs)

## Next Steps

After implementing these basic security measures, explore the [Best Practices](../best-practices/cluster-security) section for more advanced security configurations.
