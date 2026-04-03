# 🚀 Vercel Deployment Guide - School Box Buddy

## Configuration Deployed ✅

Vercel est maintenant configuré avec:
- ✅ `vercel.json` - Build config + SPA routing
- ✅ Environment variables setup
- ✅ Automatic deployments from Git

---

## 📋 Vercel Deployment Checklist

### 1. **Connect Your Repository**

1. Go to: https://vercel.com/new
2. Select "Import Git Repository"
3. Choose your GitHub/GitLab/Bitbucket repo
4. Click "Import"

### 2. **Configure Project Settings**

Vercel auto-detects from `vercel.json`, but verify:

**Settings shown:**
- Framework Preset: `Other` (auto-detected from vite.config.ts)
- Build Command: `npm run build` ✅ (from vercel.json)
- Output Directory: `dist` ✅ (from vercel.json)
- Install Command: `npm install` ✅ (from vercel.json)
- Development Command: `npm run dev` ✅ (from vercel.json)

### 3. **Set Environment Variables**

Before clicking "Deploy", add env vars:

**Environment Variables to add:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-from-supabase
VITE_FEDAPAY_API_KEY=your-fedapay-api-key
VITE_FEDAPAY_CURRENCY=XOF
VITE_FEDAPAY_WEBHOOK_SECRET=your-webhook-secret (optional)
```

**How to get these values:**
- **Supabase:** https://app.supabase.com → Project Settings → API
- **FedaPay:** https://dashboard.fedapay.com → API Keys

### 4. **Deploy**

Click "Deploy" button and wait for the deployment to complete (~2-3 minutes).

**You should see:** ✅ Production URL assigned (e.g., `school-box-buddy.vercel.app`)

### 5. **Verify Deployment**

1. Click the Production URL
2. You should see the **SplashScreen** (not blank page)
3. Click navigation links to test routes
4. All routes should work ✅

---

## ✅ Advantages of Vercel for This Project

| Feature | Vercel | Status |
|---------|--------|--------|
| **Preview Deployments** | ✅ Each PR gets its own preview URL | Included |
| **Automatic Deployments** | ✅ Deploy on git push | Included |
| **Serverless Functions** | ✅ Can host Supabase functions | Included |
| **Edge Caching** | ✅ Global CDN included | Included |
| **Analytics** | ✅ Built-in Web Analytics | Included |
| **Logs** | ✅ Real-time deployment logs | Included |
| **Automatic HTTPS** | ✅ SSL included | Included |

---

## 🔧 Troubleshooting Vercel

### Issue: Blank page after deployment

**Solution:**
1. Check Environment Variables are set correctly
2. Check Build Logs (Vercel Dashboard → Deployments → Build tab)
3. Check Browser Console (F12) for errors

### Issue: Routes return 404

**Status:** `vercel.json` already configured with SPA rewrites
- All routes will rewrite to `/index.html` ✅

### Issue: Environment variables not loaded

**Check:**
- Go to: Project Settings → Environment Variables
- Verify all `VITE_*` variables are set
- Redeploy from Dashboard: Deployments → Redeploy

---

## 📝 Configuration Files

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

**What it does:**
- Tells Vercel to build with `npm run build`
- Uses `dist` folder as output
- Rewrites all routes to `/index.html` (SPA support)

---

## 🎯 Workflow After Initial Deploy

### For Developers
```bash
# Make changes locally
git add .
git commit -m "feat: Add new feature"
git push origin main

# Vercel auto-deploys in ~2-3 minutes
# Check: https://vercel.com/dashboard → Your Project
```

### For Pull Requests
```bash
# Create feature branch
git checkout -b feature/my-feature
git push origin feature/my-feature

# Vercel creates a preview deployment
# You get a unique URL to test the changes
# Shared URL: https://project-name-feature-my-feature.vercel.app
```

---

## 🔐 Security Notes

- ✅ Environment variables are encrypted on Vercel
- ✅ HTTPS is automatic (free SSL)
- ✅ No sensitive data in source code
- ⚠️ Keep API keys in Environment Variables, never in code

---

## 📊 Comparison: Netlify vs Vercel

| Feature | Netlify | Vercel | Recommendation |
|---------|---------|--------|---|
| SPA Routing | netlify.toml | vercel.json | Both configured ✅ |
| Env Variables | Dashboard | Dashboard | Both same |
| Build Speed | Standard | Fast (optimized) | Vercel faster |
| Preview Deployments | Yes | Yes | Both have it |
| Cost | Free tier generous | Free tier generous | Both good |
| Best For | JAMstack | Next.js/Vite | **Vercel for Vite** |

---

## 📞 Next Steps

1. **Commit these changes:**
   ```bash
   git add vercel.json
   git commit -m "chore(vercel): Add Vercel deployment config"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables
   - Click Deploy

3. **Verify it works:**
   - Visit your Vercel URL
   - Test navigation
   - Check browser console (F12) for errors

4. **Set up custom domain (optional):**
   - Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records

---

## ✅ Status

| Step | Status |
|------|--------|
| vercel.json created | ✅ |
| Build config | ✅ |
| SPA routing configured | ✅ |
| Environment variables documented | ✅ |
| Documentation created | ✅ |
| **Ready for Vercel deployment** | **✅** |

**Both Netlify and Vercel are now fully configured!** 🚀
