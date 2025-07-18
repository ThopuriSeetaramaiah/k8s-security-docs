/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'AWS Security',
      items: [
        'aws-security/intro',
        'aws-security/foundations',
        'aws-security/iam-best-practices',
      ],
    },
    {
      type: 'category',
      label: 'DevOps Security',
      items: [
        'devops-security/intro',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: ['getting-started/installation', 'getting-started/quick-start'],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'best-practices/cluster-security',
        'best-practices/pod-security',
        'best-practices/network-policies',
        'best-practices/rbac',
      ],
    },
    {
      type: 'category',
      label: 'Security Tools',
      items: [
        'security-tools/kube-bench',
        'security-tools/trivy',
        'security-tools/falco',
        'security-tools/kube-hunter',
      ],
    },
    {
      type: 'category',
      label: 'Compliance',
      items: [
        'compliance/cis-benchmarks',
        'compliance/pci-dss',
        'compliance/hipaa',
      ],
    },
    'faq',
  ],
};

module.exports = sidebars;
