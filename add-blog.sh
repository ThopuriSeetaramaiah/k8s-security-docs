#!/bin/bash

# Simple script to add new blog posts without touching anything else
# Usage: ./add-blog.sh "blog-filename.md"

if [ $# -eq 0 ]; then
    echo "Usage: ./add-blog.sh <blog-filename.md>"
    echo "Example: ./add-blog.sh 2025-10-03-my-new-post.md"
    exit 1
fi

BLOG_FILE="$1"

if [ ! -f "blog/$BLOG_FILE" ]; then
    echo "Error: blog/$BLOG_FILE does not exist"
    exit 1
fi

echo "Adding blog post: $BLOG_FILE"

# Only add the specific blog file
git add "blog/$BLOG_FILE"

# Commit only the blog file
git commit -m "Add new blog post: $BLOG_FILE"

# Deploy
echo "Deploying..."
./deploy.sh

# Push to main
git push origin main

echo "Blog post deployed successfully!"
