---
sidebar_position: 1
---

# Cluster Security

Securing your Kubernetes cluster at the infrastructure level is the foundation of a robust security posture. This guide covers best practices for securing the Kubernetes control plane and worker nodes.

## Control Plane Security

The control plane consists of the API server, etcd, controller manager, and scheduler. Securing these components is critical.

### API Server

The API server is the central component that processes all requests to the cluster.

```yaml
# Recommended API server flags
--anonymous-auth=false
--authorization-mode=Node,RBAC
--enable-admission-plugins=NodeRestriction,PodSecurityPolicy,AlwaysPullImages
--audit-log-path=/var/log/kubernetes/audit.log
--audit-log-maxage=30
--audit-log-maxbackup=10
--audit-log-maxsize=100
--encryption-provider-config=/etc/kubernetes/encryption/encryption-config.yaml
--tls-cert-file=/etc/kubernetes/pki/apiserver.crt
--tls-private-key-file=/etc/kubernetes/pki/apiserver.key
--client-ca-file=/etc/kubernetes/pki/ca.crt
```

### etcd

etcd stores all cluster data and should be highly secured.

```yaml
# Recommended etcd flags
--cert-file=/etc/kubernetes/pki/etcd/server.crt
--key-file=/etc/kubernetes/pki/etcd/server.key
--client-cert-auth=true
--trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
--peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
--peer-key-file=/etc/kubernetes/pki/etcd/peer.key
--peer-client-cert-auth=true
--peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
--data-dir=/var/lib/etcd
```

### Encryption at Rest

Configure encryption for secrets stored in etcd:

```yaml
# /etc/kubernetes/encryption/encryption-config.yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: <base64-encoded-key>
      - identity: {}
```

## Worker Node Security

Worker nodes run your containers and need to be secured against various threats.

### Node Hardening

1. **Minimize the attack surface**:
   - Use a minimal OS (like Container-Optimized OS, RancherOS)
   - Remove unnecessary packages and services
   - Regularly apply security patches

2. **Secure kubelet configuration**:
   ```yaml
   # Recommended kubelet flags
   --anonymous-auth=false
   --authorization-mode=Webhook
   --client-ca-file=/etc/kubernetes/pki/ca.crt
   --read-only-port=0
   --protect-kernel-defaults=true
   --tls-cert-file=/etc/kubernetes/pki/kubelet.crt
   --tls-private-key-file=/etc/kubernetes/pki/kubelet.key
   ```

3. **Container runtime security**:
   - Use containerd or CRI-O with secure defaults
   - Enable seccomp and AppArmor profiles

### Node Access Control

1. **SSH hardening**:
   - Use SSH key authentication only
   - Disable root login
   - Use a bastion host for access

2. **Privileged access management**:
   - Implement just-in-time access
   - Use a solution like Teleport or AWS SSM for secure access

## Network Security

1. **Control plane isolation**:
   - Place control plane components on a separate network
   - Use private endpoints for API server access

2. **Node-to-node communication**:
   - Encrypt all traffic with a network overlay like Calico or Cilium
   - Implement mutual TLS authentication

## Monitoring and Auditing

1. **Node-level monitoring**:
   - Deploy a security agent like Falco
   - Monitor system calls and container activities

2. **Log collection and analysis**:
   - Collect and centralize all node logs
   - Set up alerts for suspicious activities

## Regular Security Assessments

1. **Vulnerability scanning**:
   - Regularly scan nodes for vulnerabilities
   - Apply security patches promptly

2. **Compliance checks**:
   - Run kube-bench regularly to check CIS compliance
   - Address any findings promptly

## Next Steps

After securing your cluster infrastructure, proceed to [Pod Security](pod-security) to learn how to secure your workloads running on the cluster.
