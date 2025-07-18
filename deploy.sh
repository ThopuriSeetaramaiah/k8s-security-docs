#!/bin/bash

# Build the Docusaurus site
echo "Building the site..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
GIT_USER=ThopuriSeetaramaiah USE_SSH=true npm run deploy

echo "Deployment complete!"
echo "Your site will be available at: https://security.techdevops.co.uk"
echo ""
echo "IMPORTANT: Don't forget to set up the DNS record for security.techdevops.co.uk"
echo "Add a CNAME record pointing 'security' subdomain to your GitHub Pages URL"
echo "(typically username.github.io or organization.github.io)"
