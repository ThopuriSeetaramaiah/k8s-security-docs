---
sidebar_position: 3
---

# IAM Access Analyzer

AWS IAM Access Analyzer is a powerful security tool that helps identify resources in your organization and accounts that are shared with an external entity. This helps you identify unintended access to your resources and data, which is a security risk.

## How Access Analyzer Works

Access Analyzer uses mathematical logic and reasoning to analyze resource-based policies applied to your AWS resources. It identifies when a resource-based policy allows access from outside your AWS account or organization.

## Key Benefits

- **Identify unintended public and cross-account access**: Quickly identify resources that are shared with external entities
- **Proactive security validation**: Validate policies before deploying them to ensure they don't grant unintended access
- **Continuous monitoring**: Receive findings when resources become accessible from outside your account or organization
- **Comprehensive coverage**: Analyze policies for multiple resource types including S3 buckets, IAM roles, KMS keys, Lambda functions, and more

## Implementing Access Analyzer

### Step 1: Create an Analyzer

1. Open the IAM console in your AWS account
2. Navigate to Access Analyzer in the left navigation pane
3. Choose "Create analyzer"
4. Select your organization or account as the analyzer scope:
   - **Account scope**: Analyzes resources within your account
   - **Organization scope**: Analyzes resources across your AWS organization (requires Organizations service)
5. Give your analyzer a name and create it

### Step 2: Review Findings

After creating an analyzer, it immediately begins analyzing your resource policies and generates findings for resources that can be accessed from outside your account or organization.

For each finding, you can:
- **Archive**: If the access is intended
- **Resolve**: Modify the resource policy to remove the external access
- **Add to archive rule**: Create rules to automatically archive similar findings

### Step 3: Set Up Notifications

Configure Amazon EventBridge rules to receive notifications when Access Analyzer generates new findings:

```json
{
  "source": ["aws.access-analyzer"],
  "detail-type": ["Access Analyzer Finding"],
  "detail": {
    "status": ["ACTIVE"],
    "resourceType": ["AWS::S3::Bucket"]
  }
}
```

## Best Practices

1. **Create analyzers in all regions**: Access Analyzer operates on a regional basis, so create analyzers in all regions where you have resources
2. **Use organization-level analyzers**: If using AWS Organizations, create organization-level analyzers to monitor all accounts
3. **Review findings regularly**: Schedule time to review new findings at least weekly
4. **Integrate with security workflows**: Use EventBridge to integrate findings into your security operations workflows
5. **Validate policies before deployment**: Use the policy validation feature to check policies before applying them

## Policy Validation

Access Analyzer includes a policy validation feature that checks your policies for:

- **Security warnings**: Identifies permissions that grant public or cross-account access
- **Errors**: Identifies policy syntax errors and permission errors
- **General warnings**: Identifies best practice deviations
- **Suggestions**: Offers suggestions for policy improvements

## Example: Validating a Policy

```bash
aws accessanalyzer validate-policy \
  --policy-document file://my-policy.json \
  --policy-type RESOURCE_POLICY
```

## Related Services

- **AWS IAM**: Manage access to AWS services and resources
- **AWS CloudTrail**: Log and monitor account activity
- **AWS Config**: Track resource configurations and changes
- **Amazon EventBridge**: Route Access Analyzer findings to notification and remediation systems

## Learn More

- [AWS IAM Access Analyzer Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html)
- [Access Analyzer API Reference](https://docs.aws.amazon.com/access-analyzer/latest/APIReference/Welcome.html)
