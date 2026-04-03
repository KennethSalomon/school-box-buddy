# 🌐 Complete Deployment Guide - School Box Buddy

## Overview

Your project is now configured for deployment on **both Netlify AND Vercel**.

```
School Box Buddy
├── 📦 Netlify Configuration
│   ├── netlify.toml (SPA routing + headers)
│   ├── public/_redirects (fallback)
│   └── NETLIFY_DEPLOYMENT_GUIDE.md
│
├── 📦 Vercel Configuration
│   ├── vercel.json (SPA routing)
│   └── VERCEL_DEPLOYMENT_GUIDE.md
│
└── 📋 This Guide
    └── DEPLOYMENT_GUIDE.md (you are here)
```

---

## 🚀 Quick Start

### Option A: Deploy to Netlify

```bash
1. Git push your code
2. Go to https://app.netlify.com/sites/YOUR-SITE/settings
3. Add Environment Variables (VITE_*)
4. Trigger Deploy
5. ✅ Done!
```

[Full Netlify Guide →](./NETLIFY_DEPLOYMENT_GUIDE.md)

### Option B: Deploy to Vercel

```bash
1. Go to https://vercel.com/new
2. Import your Git repository
3. Add Environment Variables (VITE_*)
4. Click Deploy
5. ✅ Done!
```

[Full Vercel Guide →](./VERCEL_DEPLOYMENT_GUIDE.md)

---

## 📋 Deployment Checklist

**Before deploying anywhere:**

- [ ] Code committed and pushed to main branch
- [ ] All environment variables identified
- [ ] Supabase keys obtained
- [ ] FedaPay API key obtained
- [ ] Build tested locally: `npm run build`

**For Netlify:**

- [ ] Go to Netlify Dashboard
- [ ] Add VITE_SUPABASE_URL
- [ ] Add VITE_SUPABASE_ANON_KEY
- [ ] Add VITE_FEDAPAY_API_KEY
- [ ] Add VITE_FEDAPAY_CURRENCY
- [ ] Trigger deploy
- [ ] Test at https://your-site.netlify.app
- [ ] Test routes work (not blank page)

**For Vercel:**

- [ ] Go to vercel.com/new
- [ ] Import Git repository
- [ ] Add VITE_SUPABASE_URL
- [ ] Add VITE_SUPABASE_ANON_KEY
- [ ] Add VITE_FEDAPAY_API_KEY
- [ ] Add VITE_FEDAPAY_CURRENCY
- [ ] Click Deploy
- [ ] Test at your-site.vercel.app
- [ ] Test routes work (not blank page)

---

## 🎯 Recommended Setup

### Scenario 1: Just Getting Started
→ **Use Vercel** (faster builds, better for Vite)

### Scenario 2: Want Multiple Environments
→ **Use Both**
- Production on Vercel
- Staging on Netlify

### Scenario 3: Already on Netlify
→ **Keep Netlify** (netlify.toml already configured)

---

## 🔑 Environment Variables Reference

These variables must be set on **both** Netlify and Vercel:

```
Variable Name              | Source                    | Example
--------------------------|---------------------------|---------------------
VITE_SUPABASE_URL          | Supabase Settings         | https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY     | Supabase Settings → API   | eyJhbGc...
VITE_FEDAPAY_API_KEY       | FedaPay Dashboard → Keys  | pk_live_xxx
VITE_FEDAPAY_CURRENCY      | Your choice               | XOF
VITE_FEDAPAY_WEBHOOK_SECRET | FedaPay Dashboard        | secret_xxx (optional)
```

### How to Find Your Keys

**Supabase Keys:**
1. Go to https://app.supabase.com
2. Select your project
3. Settings → API
4. Copy `Project URL` and `anon public key`

**FedaPay Keys:**
1. Go to https://dashboard.fedapay.com
2. API → API Keys
3. Copy your API key

---

## ⚙️ Configuration Files Breakdown

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Why:**
- Tells Netlify to use `npm run build`
- All routes redirect to index.html for React Router
- Status 200 = "rewrite" (not visible redirect)

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Why:**
- Tells Vercel to use `npm run build`
- All routes rewritten to index.html for React Router
- Works same as Netlify redirects

---

## 🔍 How SPA Routing Works

### Problem (without config)
```
User clicks /app/home
→ Browser requests /app/home
→ Server looks for /app/home.html file
→ File doesn't exist (404)
→ Page breaks (blank page)
```

### Solution (with netlify.toml or vercel.json)
```
User clicks /app/home
→ Browser requests /app/home
→ Server returns /index.html instead
→ React Router loads in browser
→ React Router renders /app/home component
→ Page works! ✅
```

---

## ✅ Verification Checklist

After deployment:

```bash
# 1. Visit your deployed site
https://your-site.netlify.app  # or .vercel.app

# 2. You should see SplashScreen (not blank)
# 3. Click "Get Started" or navigate
# 4. Check all routes work:
#    - /app/login
#    - /app/register
#    - /admin/login
#    etc.

# 5. Check console (F12) for errors
#    Should be mostly clean (except maybe warnings)

# 6. Check Network tab (F12)
#    - index.html should load
#    - JS bundle should load
#    - Supabase API should be called
```

### Common Issues

| Issue | Fix |
|-------|-----|
| Blank page | Check env vars in dashboard |
| 404 on routes | Check netlify.toml/vercel.json exists |
| "Cannot find Supabase" | Verify VITE_SUPABASE_URL is set |
| "Cannot reach FedaPay" | Verify VITE_FEDAPAY_API_KEY is set |

---

## 📊 Deployment Comparison

| Feature | Netlify | Vercel | Both |
|---------|---------|--------|------|
| **SPA Routing** | ✅ netlify.toml | ✅ vercel.json | ✅ Configured |
| **Build Command** | auto-detected | vercel.json | ✅ Both work |
| **Environment Vars** | Dashboard UI | Dashboard UI | ✅ Same process |
| **Preview Deploys** | ✅ Yes | ✅ Yes | ✅ Both have |
| **Free Tier** | ✅ Good | ✅ Good | ✅ Both work |
| **Performance** | Fast | Very Fast | ✅ Both good |
| **Best For** | JAMstack | Vite/Next.js | → **Vercel** |

---

## 🎓 Learning Resources

### Netlify
- https://docs.netlify.com/configure-builds/get-started/
- https://docs.netlify.com/routing/overview/

### Vercel
- https://vercel.com/docs/projects/project-configuration
- https://vercel.com/docs/edge-network/rewrites

### SPA Routing
- https://en.wikipedia.org/wiki/Single-page_application
- https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL

---

## 🚀 Next Steps

### Immediate (today)
1. Choose Netlify OR Vercel
2. Set up deployment as per guide
3. Add environment variables
4. Deploy and test

### Soon (this week)
- [ ] Set up custom domain
- [ ] Configure monitoring/alerts
- [ ] Set up CI/CD for pull requests

### Later (when app matures)
- [ ] Add analytics
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Set up performance monitoring
- [ ] Consider serverless functions

---

## 📞 Support

**For deployment issues:**

1. Check deployment logs:
   - **Netlify:** Dashboard → Deploys → Logs
   - **Vercel:** Dashboard → Deployments → Logs

2. Check browser console (F12)

3. Verify environment variables are set

4. Try redeploying

5. Check these guides:
   - [Netlify Guide](./NETLIFY_DEPLOYMENT_GUIDE.md)
   - [Vercel Guide](./VERCEL_DEPLOYMENT_GUIDE.md)

---

## ✨ Summary

**Your project is ready to deploy on:**
- ✅ **Netlify** (netlify.toml + public/_redirects)
- ✅ **Vercel** (vercel.json)
- ✅ **Both configured properly**

**Most importantly:**
- ✅ SPA routing configured for both
- ✅ Environment variables documented
- ✅ Guides provided for both platforms
- ✅ No blank page issues! 🎉

**Status:** Ready for production deployment 🚀
