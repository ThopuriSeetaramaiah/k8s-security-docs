import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'd91'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/security-newsletter-1',
    component: ComponentCreator('/blog/security-newsletter-1', '388'),
    exact: true
  },
  {
    path: '/blog/security-newsletter-2',
    component: ComponentCreator('/blog/security-newsletter-2', '97c'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/aws',
    component: ComponentCreator('/blog/tags/aws', 'd02'),
    exact: true
  },
  {
    path: '/blog/tags/kubernetes',
    component: ComponentCreator('/blog/tags/kubernetes', '23e'),
    exact: true
  },
  {
    path: '/blog/tags/newsletter',
    component: ComponentCreator('/blog/tags/newsletter', '060'),
    exact: true
  },
  {
    path: '/blog/tags/security',
    component: ComponentCreator('/blog/tags/security', '47e'),
    exact: true
  },
  {
    path: '/newsletter',
    component: ComponentCreator('/newsletter', '264'),
    exact: true
  },
  {
    path: '/test',
    component: ComponentCreator('/test', '78b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '7cb'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '397'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '106'),
            routes: [
              {
                path: '/docs/aws-security/access-analyzer',
                component: ComponentCreator('/docs/aws-security/access-analyzer', 'e05'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/aws-security/foundations',
                component: ComponentCreator('/docs/aws-security/foundations', 'ee6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/aws-security/iam-best-practices',
                component: ComponentCreator('/docs/aws-security/iam-best-practices', 'c1f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/aws-security/intro',
                component: ComponentCreator('/docs/aws-security/intro', '8d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/best-practices/cluster-security',
                component: ComponentCreator('/docs/best-practices/cluster-security', '549'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/best-practices/network-policies',
                component: ComponentCreator('/docs/best-practices/network-policies', 'e0a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/best-practices/pod-security',
                component: ComponentCreator('/docs/best-practices/pod-security', 'b97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/best-practices/rbac',
                component: ComponentCreator('/docs/best-practices/rbac', '98a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/compliance/cis-benchmarks',
                component: ComponentCreator('/docs/compliance/cis-benchmarks', '7c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/compliance/hipaa',
                component: ComponentCreator('/docs/compliance/hipaa', '0ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/compliance/pci-dss',
                component: ComponentCreator('/docs/compliance/pci-dss', '375'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/devops-security/intro',
                component: ComponentCreator('/docs/devops-security/intro', 'cdf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/faq',
                component: ComponentCreator('/docs/faq', '947'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/installation',
                component: ComponentCreator('/docs/getting-started/installation', '267'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/getting-started/quick-start',
                component: ComponentCreator('/docs/getting-started/quick-start', '09c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/security-tools/falco',
                component: ComponentCreator('/docs/security-tools/falco', 'a15'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/security-tools/kube-bench',
                component: ComponentCreator('/docs/security-tools/kube-bench', 'c0d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/security-tools/kube-hunter',
                component: ComponentCreator('/docs/security-tools/kube-hunter', '01d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/security-tools/trivy',
                component: ComponentCreator('/docs/security-tools/trivy', 'd50'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
