# Kubernetes Security Documentation Site

This repository contains a comprehensive documentation site focused on Kubernetes security best practices, tools, and techniques.

## Overview

This documentation site is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator optimized for technical documentation. It covers various aspects of Kubernetes security, including:

- Cluster security
- Pod security
- Network policies
- RBAC (Role-Based Access Control)
- Security tools
- Compliance

## Local Development

To run this site locally:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser to http://localhost:3000

## Building for Production

To build the site for production:

```bash
npm run build
```

This will generate static content in the `build` directory that can be served using any static hosting service.

## Deployment

This site can be deployed to GitHub Pages:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
