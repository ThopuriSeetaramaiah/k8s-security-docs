---
sidebar_position: 3
---

# Network Policies

Network Policies are a crucial security feature in Kubernetes that allow you to control the traffic flow between pods. This guide covers best practices for implementing Network Policies to secure your cluster communications.

## Understanding Network Policies

Network Policies act as a firewall for pod communications, allowing you to:

- Control which pods can communicate with each other
- Control which namespaces can communicate with each other
- Control external access to pods

## Prerequisites

To use Network Policies, your cluster must have a network plugin that supports them, such as:

- Calico
- Cilium
- Antrea
- Weave Net
- Kube-router

:::caution
The default Kubernetes network plugin (kubenet) does not support Network Policies. Make sure your cluster is using a compatible network plugin.
:::

## Default Deny Policies

Start by implementing default deny policies to block all traffic, then selectively allow required communications.

### Default Deny All Ingress Traffic

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: default
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

### Default Deny All Egress Traffic

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-egress
  namespace: default
spec:
  podSelector: {}
  policyTypes:
  - Egress
```

### Default Deny All Traffic (Both Ingress and Egress)

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: default
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

## Allowing Specific Traffic

After implementing default deny policies, you can selectively allow required traffic.

### Allow Traffic Between Specific Pods

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
```

### Allow Traffic From Specific Namespaces

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-monitoring-namespace
  namespace: default
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          purpose: monitoring
```

### Allow External Traffic to Specific Pods

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-external-to-web
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: web
  policyTypes:
  - Ingress
  ingress:
  - from: []
    ports:
    - protocol: TCP
      port: 80
    - protocol: TCP
      port: 443
```

## Advanced Network Policies

### Combining Selectors (AND Logic)

When you specify multiple selectors in the same `from` array element, they are ANDed together:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-specific-pods-from-namespace
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: database
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          purpose: backend
      podSelector:
        matchLabels:
          role: db-client
```

### Multiple Rules (OR Logic)

When you specify multiple array elements in `from`, they are ORed together:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-multiple-sources
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    - podSelector:
        matchLabels:
          app: admin-ui
```

### Egress Policies

Control outbound traffic from pods:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns-and-api
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
  - Egress
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: api
    ports:
    - protocol: TCP
      port: 8080
  - to: []
    ports:
    - protocol: UDP
      port: 53
```

## Best Practices

1. **Start with default deny policies** in all namespaces
2. **Use labels consistently** across your pods and namespaces
3. **Implement the principle of least privilege** by only allowing necessary traffic
4. **Document your network policies** to understand the allowed communication paths
5. **Test your policies** thoroughly before applying them in production
6. **Monitor denied connections** to identify potential issues
7. **Use namespace isolation** for multi-tenant clusters
8. **Regularly review and update** your network policies

## Troubleshooting

If your Network Policies aren't working as expected:

1. Verify your network plugin supports Network Policies
2. Check pod and namespace labels match your selectors
3. Use tools like `kubectl describe networkpolicy <name>` to inspect policies
4. Test connectivity with temporary debug pods
5. Check logs from your network plugin

## Next Steps

After implementing Network Policies, proceed to [RBAC](rbac) to learn how to secure access to your Kubernetes API.
