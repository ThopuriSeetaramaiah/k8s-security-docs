# Website Deployment Steps

## 🚀 Full Website Deploy

```bash
# Clean build and deploy everything
npm run clear
npm run build
./deploy.sh
git push origin main
```

## 📝 Blog Post Only Deploy

```bash
# Add new blog post (recommended method)
./add-blog.sh your-blog-filename.md
```

OR manually:

```bash
# Manual blog deploy
git add blog/your-blog-filename.md
git commit -m "Add new blog post: your-blog-filename.md"
./deploy.sh
git push origin main
```

## 🔧 Emergency Fix Deploy

```bash
# For urgent fixes only
git add .
git commit -m "Emergency fix: describe what was fixed"
./deploy.sh
git push origin main
```

## ⚠️ Important Rules

- **NEVER** modify `docusaurus.config.js` without explicit approval
- **NEVER** change navigation structure
- **NEVER** modify `src/pages/index.js` (main page redirect)
- **ONLY** add blog posts in `blog/` folder
- **ALWAYS** use `./add-blog.sh` for new blog posts

## 📁 Safe to Modify

- ✅ `blog/*.md` - Blog posts
- ✅ `blog/authors.yml` - Author information
- ✅ `docs/*.md` - Documentation content

## 🚫 DO NOT TOUCH

- ❌ `docusaurus.config.js` - Site configuration
- ❌ `src/pages/index.js` - Main page
- ❌ `src/components/` - Site components
- ❌ Navigation structure
- ❌ Site theme/styling

## 🔍 Verify Deployment

1. Check: https://security.techdevops.co.uk
2. Verify main page redirects to `/docs/intro`
3. Check blog at `/blog/`
4. Ensure navigation has: Documentation, Blog, GitHub

## 📞 Troubleshooting

If deployment fails:
```bash
# Clean everything and retry
npm run clear
rm -rf node_modules/.cache
npm run build
./deploy.sh
```

If site looks wrong:
- Clear browser cache (Ctrl+F5)
- Check in incognito mode
- Wait 2-3 minutes for GitHub Pages
