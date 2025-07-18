---
sidebar_position: 1
---

# AWS Support MCP and Amazon Q CLI

The AWS Support Model Context Protocol (MCP) and Amazon Q CLI provide powerful AI-assisted capabilities for AWS users. This guide explains how to set up and use these tools to enhance your AWS workflow.

## What is Model Context Protocol (MCP)?

Model Context Protocol (MCP) is an open protocol that standardizes how applications provide context to Large Language Models (LLMs). It enables communication between systems and locally running MCP servers that provide additional tools and resources to extend AI capabilities.

Key benefits of MCP include:
- Standardized context sharing with LLMs
- Enhanced AI capabilities through local tools
- Improved security by keeping sensitive data local
- Extensibility through custom MCP servers

## What is Amazon Q CLI?

Amazon Q CLI is a command-line interface that brings Amazon Q's AI capabilities directly to your terminal. It allows you to:
- Ask questions about AWS services and best practices
- Get help with code and configuration files
- Troubleshoot issues with AWS resources
- Generate code snippets and commands
- Access AWS documentation and examples

## Setting Up AWS Support MCP

### Prerequisites

- AWS CLI installed and configured
- Python 3.8 or later
- pip (Python package installer)

### Installation Steps

1. Install the AWS Support MCP server:

```bash
pip install aws-support-mcp
```

2. Install the Amazon Q CLI:

```bash
pip install amazon-q-cli
```

3. Configure your AWS credentials:

```bash
aws configure
```

### Starting the MCP Server

To start the AWS Support MCP server:

```bash
aws-support-mcp start
```

This will start the MCP server on the default port (8080). You can specify a different port using the `--port` option:

```bash
aws-support-mcp start --port 8081
```

## Using Amazon Q CLI with MCP

### Basic Usage

Once the MCP server is running, you can use the Amazon Q CLI to ask questions:

```bash
q chat "How do I create an S3 bucket with versioning enabled?"
```

### Adding MCP Servers to Amazon Q CLI

To add the AWS Support MCP server to Amazon Q CLI:

```bash
q mcp add aws-support http://localhost:8080
```

You can add multiple MCP servers to extend Amazon Q's capabilities:

```bash
q mcp list
```

### Using MCP Tools

When you ask a question, Amazon Q will automatically use the appropriate MCP tools:

```bash
q chat "Show me my EC2 instances in us-east-1"
```

This will use the AWS Support MCP server to query your EC2 instances and provide a response.

## Advanced Features

### Context-Aware Assistance

Amazon Q CLI with MCP is context-aware, meaning it can understand:
- Your current working directory
- Files in your project
- AWS resources in your account
- Your operating system and environment

### Code Generation and Analysis

You can ask Amazon Q to generate code or analyze existing code:

```bash
q chat "Write a CloudFormation template for a VPC with public and private subnets"
```

```bash
q chat "Review my IAM policy in policy.json for security issues"
```

### Troubleshooting AWS Resources

Amazon Q can help troubleshoot issues with your AWS resources:

```bash
q chat "Why is my Lambda function failing with a timeout error?"
```

## Security Considerations

When using AWS Support MCP and Amazon Q CLI, keep these security considerations in mind:

1. **Data Privacy**: The MCP server processes data locally before sending context to Amazon Q, helping protect sensitive information.

2. **Credential Handling**: Never share AWS credentials or sensitive information directly in your prompts.

3. **Code Review**: Always review and understand generated code before using it in production.

4. **Access Control**: The MCP server runs locally, so ensure proper access controls are in place on your machine.

## Best Practices

1. **Be Specific**: Provide clear, specific questions to get the most accurate responses.

2. **Provide Context**: When asking about code or configurations, provide relevant context.

3. **Iterative Refinement**: Use follow-up questions to refine and improve responses.

4. **Verify Information**: Always verify critical information against official AWS documentation.

5. **Feedback Loop**: Use the feedback mechanisms to help improve Amazon Q's responses.

## Common Use Cases

### Infrastructure as Code

```bash
q chat "Create a Terraform configuration for an EKS cluster with node groups"
```

### Security Auditing

```bash
q chat "Help me identify security risks in my AWS account"
```

### Cost Optimization

```bash
q chat "Suggest ways to optimize costs for my EC2 instances"
```

### Operational Troubleshooting

```bash
q chat "Why is my RDS instance CPU utilization spiking?"
```

## Conclusion

AWS Support MCP and Amazon Q CLI provide powerful AI-assisted capabilities that can significantly enhance your productivity when working with AWS. By following the setup instructions and best practices outlined in this guide, you can leverage these tools to streamline your AWS workflows, troubleshoot issues more effectively, and build better cloud solutions.

## Additional Resources

- [Official AWS Support MCP Documentation](https://docs.aws.amazon.com/q/latest/user-guide/mcp-support.html)
- [Amazon Q CLI User Guide](https://docs.aws.amazon.com/q/latest/user-guide/q-cli.html)
- [Model Context Protocol Specification](https://github.com/aws/model-context-protocol)
- [AWS Support MCP GitHub Repository](https://github.com/aws/aws-support-mcp)
