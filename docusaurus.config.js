// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AWS & Kubernetes Security Guide',
  tagline: 'Comprehensive guide to securing your AWS, DevOps, and Kubernetes environments',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://security.techdevops.co.uk',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ThopuriSeetaramaiah', // Usually your GitHub org/user name.
  projectName: 'k8s-security-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ThopuriSeetaramaiah/k8s-security-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ThopuriSeetaramaiah/k8s-security-docs/tree/main/',
          path: './blog',
          routeBasePath: 'blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/k8s-security-social-card.jpg',
      navbar: {
        title: 'AWS & K8s Security Guide',
        logo: {
          alt: 'Kubernetes Security Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog/', label: 'Blog', position: 'left'},
          {to: '/newsletter/', label: 'Newsletter', position: 'left'},
          {
            href: 'https://github.com/ThopuriSeetaramaiah/k8s-security-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/kubernetes-security',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/techdevops',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ThopuriSeetaramaiah/k8s-security-docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TechDevOps. Built with Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash', 'yaml', 'json'],
      },
    }),
};

module.exports = config;
