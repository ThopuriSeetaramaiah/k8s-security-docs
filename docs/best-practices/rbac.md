---
sidebar_position: 4
---

# Role-Based Access Control (RBAC)

Role-Based Access Control (RBAC) is a method of regulating access to resources based on the roles of individual users. This guide covers best practices for implementing RBAC in Kubernetes to secure access to your cluster resources.

## RBAC Components

Kubernetes RBAC has four primary components:

1. **Roles**: Define permissions within a namespace
2. **ClusterRoles**: Define cluster-wide permissions
3. **RoleBindings**: Bind roles to users within a namespace
4. **ClusterRoleBindings**: Bind cluster roles to users across the cluster

## Creating Roles and ClusterRoles

### Role (Namespace-Scoped)

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

### ClusterRole (Cluster-Wide)

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
```

## Creating RoleBindings and ClusterRoleBindings

### RoleBinding (Namespace-Scoped)

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jane
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### ClusterRoleBinding (Cluster-Wide)

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: read-pods-global
subjects:
- kind: Group
  name: monitoring-team
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

## Subject Types

RBAC supports three types of subjects:

1. **User**: Regular users authenticated to the cluster
2. **Group**: Groups of users
3. **ServiceAccount**: Service accounts for pods

### ServiceAccount Example

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: monitoring-sa
  namespace: monitoring
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: monitoring-role-binding
  namespace: default
subjects:
- kind: ServiceAccount
  name: monitoring-sa
  namespace: monitoring
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

## Common RBAC Patterns

### Namespace Admin

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: team-a
  name: namespace-admin
rules:
- apiGroups: ["", "extensions", "apps"]
  resources: ["*"]
  verbs: ["*"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["*"]
```

### Read-Only User

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: read-only-user
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets", "persistentvolumeclaims"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets", "statefulsets", "daemonsets"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["get", "list", "watch"]
```

### Developer Role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: development
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log", "services", "configmaps", "secrets", "persistentvolumeclaims"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
```

## RBAC Best Practices

1. **Follow the Principle of Least Privilege**
   - Grant only the permissions necessary for users to perform their tasks
   - Avoid using wildcard resources and verbs when possible

2. **Use Groups for Access Management**
   - Assign permissions to groups rather than individual users
   - Makes it easier to manage permissions as teams change

3. **Namespace Isolation**
   - Use namespaces to isolate teams and applications
   - Assign namespace-scoped roles when possible

4. **Avoid Direct ClusterRole Bindings**
   - Limit the number of cluster-wide permissions
   - Use namespace-scoped roles and bindings when possible

5. **Regularly Audit RBAC Permissions**
   - Review who has access to what resources
   - Remove unnecessary permissions

6. **Use Default Roles When Appropriate**
   - Kubernetes provides default roles like `view`, `edit`, and `admin`
   - Use these roles instead of creating custom ones when possible

7. **Implement Role Aggregation**
   - Use the aggregationRule field to combine multiple ClusterRoles

8. **Document Your RBAC Policies**
   - Maintain documentation of your RBAC design
   - Include justifications for elevated permissions

## Verifying RBAC Permissions

Check if a user can perform specific actions:

```bash
kubectl auth can-i get pods --namespace default --as jane
```

List all resources a user can access:

```bash
kubectl auth can-i --list --as jane
```

## Troubleshooting RBAC

Common RBAC issues and solutions:

1. **Forbidden errors in logs**
   - Check the error message for the specific resource and verb
   - Verify the role has the necessary permissions

2. **ServiceAccount doesn't have expected permissions**
   - Verify the ServiceAccount is correctly mounted in the pod
   - Check that the RoleBinding references the correct ServiceAccount

3. **Permissions work in one namespace but not another**
   - Verify that the RoleBinding exists in the correct namespace
   - Check if you're using a Role (namespace-scoped) instead of a ClusterRole

## Next Steps

After implementing RBAC, explore the [Security Tools](../security-tools/kube-bench) section to learn about tools that can help you assess and enhance your Kubernetes security posture.
