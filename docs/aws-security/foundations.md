---
sidebar_position: 2
---

# AWS Security Foundations

This guide covers the fundamental security practices that every AWS environment should implement as a baseline.

## Account Security

### Root Account Protection

The AWS root account has unlimited privileges and should be protected with the following measures:

- Enable Multi-Factor Authentication (MFA) on the root account
- Don't use the root account for daily operations
- Use a complex password and store it securely
- Don't create access keys for the root account

### AWS Organizations

Implement AWS Organizations to:

- Separate workloads into different accounts (production, development, testing)
- Apply Service Control Policies (SCPs) to restrict actions
- Centralize logging and monitoring
- Implement consolidated billing

```bash
# Create an organization
aws organizations create-organization

# Create an organizational unit
aws organizations create-organizational-unit \
    --parent-id r-exampleroot \
    --name Production
```

## Identity and Access Management

### IAM Best Practices

- Follow the principle of least privilege
- Use IAM roles instead of long-term access keys
- Implement IAM policies with specific permissions
- Regularly rotate credentials
- Use AWS IAM Access Analyzer to identify unintended access

Example IAM policy with least privilege:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::example-bucket",
        "arn:aws:s3:::example-bucket/*"
      ],
      "Condition": {
        "StringEquals": {
          "aws:PrincipalTag/Department": "Data"
        }
      }
    }
  ]
}
```

## Network Security

### VPC Design

- Use private subnets for workloads that don't need internet access
- Implement network ACLs and security groups
- Use VPC Flow Logs for network monitoring
- Consider AWS Network Firewall for additional protection

### Security Groups

- Default deny all inbound traffic
- Allow only necessary ports
- Use security group references instead of CIDR blocks when possible
- Document the purpose of each security group

## Monitoring and Logging

### Essential Services

- **CloudTrail**: Enable in all regions with log file validation
- **CloudWatch**: Set up alarms for suspicious activities
- **Config**: Track resource configurations and changes
- **GuardDuty**: Enable for threat detection
- **Security Hub**: Centralize security findings

### CloudTrail Configuration

```bash
# Enable CloudTrail with log file validation
aws cloudtrail create-trail \
    --name management-events \
    --s3-bucket-name my-cloudtrail-bucket \
    --is-multi-region-trail \
    --enable-log-file-validation

# Start logging
aws cloudtrail start-logging --name management-events
```

## Data Protection

### Encryption

- Enable default encryption for S3 buckets
- Use KMS for key management
- Enable EBS volume encryption by default
- Use SSL/TLS for data in transit

### S3 Bucket Security

- Block public access at the account level
- Implement bucket policies to restrict access
- Enable S3 versioning for critical buckets
- Configure access logging

```bash
# Block public access at the account level
aws s3control put-public-access-block \
    --account-id 111122223333 \
    --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

## Next Steps

After implementing these foundational security measures:

1. Explore service-specific security best practices
2. Implement automated compliance checks
3. Develop incident response procedures
4. Consider advanced security services like AWS Shield and WAF

Remember that security is an ongoing process that requires regular reviews and updates as your AWS environment evolves.
