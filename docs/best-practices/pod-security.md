---
sidebar_position: 2
---

# Pod Security

Securing pods is essential for protecting your applications running in Kubernetes. This guide covers best practices for pod security.

## Pod Security Standards

Kubernetes defines three Pod Security Standards:

1. **Privileged**: Unrestricted policy, providing the widest possible level of permissions
2. **Baseline**: Minimally restrictive policy that prevents known privilege escalations
3. **Restricted**: Heavily restricted policy, following current pod hardening best practices

## Implementing Pod Security Standards

### Using Pod Security Admission Controller

In Kubernetes 1.23+, you can use the built-in Pod Security Admission Controller:

```yaml
# Namespace-level enforcement
apiVersion: v1
kind: Namespace
metadata:
  name: my-secure-namespace
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

### Using Pod Security Policies (Legacy)

For Kubernetes versions before 1.25:

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  hostNetwork: false
  hostIPC: false
  hostPID: false
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  supplementalGroups:
    rule: 'MustRunAs'
    ranges:
      - min: 1
        max: 65535
  fsGroup:
    rule: 'MustRunAs'
    ranges:
      - min: 1
        max: 65535
  readOnlyRootFilesystem: true
```

## Security Context

Always define a security context for your pods and containers:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsNonRoot: true
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: sec-ctx-demo
    image: busybox:1.28
    command: ["sh", "-c", "sleep 1h"]
    securityContext:
      allowPrivilegeEscalation: false
      capabilities:
        drop:
          - ALL
      readOnlyRootFilesystem: true
```

## Resource Limits

Always set resource limits to prevent resource exhaustion attacks:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: resource-limits-demo
spec:
  containers:
  - name: resource-limits-container
    image: nginx
    resources:
      limits:
        cpu: "1"
        memory: "512Mi"
      requests:
        cpu: "0.5"
        memory: "256Mi"
```

## Service Accounts

Limit service account permissions and use dedicated service accounts:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: restricted-sa
  namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: restricted-role
  namespace: default
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: restricted-role-binding
  namespace: default
subjects:
- kind: ServiceAccount
  name: restricted-sa
  namespace: default
roleRef:
  kind: Role
  name: restricted-role
  apiGroup: rbac.authorization.k8s.io
```

Then use this service account in your pod:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: sa-demo
spec:
  serviceAccountName: restricted-sa
  containers:
  - name: sa-container
    image: nginx
```

## Image Security

### Use Trusted Images

Always use images from trusted registries and verify their integrity:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: trusted-image-demo
spec:
  containers:
  - name: trusted-container
    image: gcr.io/distroless/static-debian11:nonroot
    imagePullPolicy: Always
```

### Image Pull Secrets

Use image pull secrets for private registries:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: registry-credentials
  namespace: default
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: <base64-encoded-docker-config>
---
apiVersion: v1
kind: Pod
metadata:
  name: private-image-demo
spec:
  containers:
  - name: private-container
    image: private-registry.example.com/my-app:v1.0.0
  imagePullSecrets:
  - name: registry-credentials
```

## Runtime Security

### Seccomp Profiles

Apply seccomp profiles to restrict system calls:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: seccomp-demo
spec:
  securityContext:
    seccompProfile:
      type: Localhost
      localhostProfile: profiles/audit.json
  containers:
  - name: seccomp-container
    image: nginx
```

### AppArmor Profiles

Apply AppArmor profiles for additional protection:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apparmor-demo
  annotations:
    container.apparmor.security.beta.kubernetes.io/apparmor-container: runtime/default
spec:
  containers:
  - name: apparmor-container
    image: nginx
```

## Next Steps

After implementing pod security measures, proceed to [Network Policies](network-policies) to learn how to secure communication between pods.
