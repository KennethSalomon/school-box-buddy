# 🚀 Netlify Deployment Guide - School Box Buddy

## Problem Fixed ✅
**Page blanche après déploiement** → Configuration SPA routing manquait

### Cause
- React Router (SPA) nécessite que toutes les routes pointent vers `index.html`
- Sans configuration, Netlify cherche les fichiers littéraux (404 errors)
- Résultat: Page blanche

### Solution Déployée
✅ `netlify.toml` - Configuration de build + SPA redirects
✅ `public/_redirects` - Backup pour les SPA redirects
✅ Security headers - CSP, X-Frame-Options, etc.
✅ Cache strategy - Static assets cachés 1 an

---

## 📋 Checklist de Déploiement

### 1. **Configuration Netlify Dashboard**

Aller sur: `https://app.netlify.com/sites/YOUR-SITE/settings/general`

#### Build & Deploy
- ✅ Build command: `npm run build` (défini dans netlify.toml)
- ✅ Publish directory: `dist` (défini dans netlify.toml)
- ✅ Functions directory: `supabase/functions` (optionnel)

#### Environment Variables
**À configurer dans:** Settings → Environment variables

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_FEDAPAY_API_KEY=your-fedapay-api-key
VITE_FEDAPAY_CURRENCY=XOF
VITE_FEDAPAY_WEBHOOK_SECRET=your-webhook-secret (optionnel)
```

**Où trouver ces valeurs:**
- Supabase: https://app.supabase.com → Project Settings → API
- FedaPay: https://dashboard.fedapay.com → API Keys

### 2. **Valider la Configuration**

Après avoir ajouté les env vars, déclencher un nouveau build:

```bash
# Depuis Netlify Dashboard: Deploys → Trigger deploy → Deploy site
# OU depuis Git: git push (si intégration GitHub activée)
```

### 3. **Vérifier le Déploiement**

```bash
# 1. Vérifier le build log
Netlify Dashboard → Deploys → Latest → Build log

# 2. Vérifier les routes
curl https://your-site.netlify.app/app/home
# Doit retourner du HTML (pas 404)

# 3. Tester dans le navigateur
# Si vous voyez du contenu React → ✅ Fonctionne!
```

---

## 🔍 Troubleshooting

### Symptôme: Page blanche
**Cause possible:** Env vars manquantes ou incorrectes
```bash
# Check console browser (F12)
# Vous devriez voir les erreurs Supabase/FedaPay
```

**Solution:**
1. Vérifier les env vars dans Netlify Dashboard
2. Redéployer
3. Vider cache navigateur (Ctrl+Shift+Delete)

### Symptôme: Routes 404
**Cause:** SPA redirects non appliquées
```bash
# Vérifier que netlify.toml est à la racine
# Vérifier que public/_redirects existe
```

### Symptôme: Supabase auth ne fonctionne pas
**Cause:** VITE_SUPABASE_ANON_KEY incorrecte ou manquante
```bash
# Aller à: Supabase → Project Settings → API
# Copier l'anon key correctement
```

---

## 📦 Files Created/Modified

```
✅ netlify.toml (NEW)         - Configuration build + routing
✅ public/_redirects (NEW)    - SPA redirect fallback
✅ vite.config.ts (existing)  - No changes needed
```

---

## Next Steps

1. **Push ces changements:**
   ```bash
   git add netlify.toml public/_redirects
   git commit -m "chore(netlify): Add SPA routing and deployment config"
   git push
   ```

2. **Redéployer sur Netlify:**
   - Depuis Netlify Dashboard, déclencher un nouveau deploy
   - OU attendre que le git push déclenche le deploy auto

3. **Vérifier les logs:**
   - Netlify Dashboard → Deploys → Accéder au build log
   - Chercher les erreurs d'env vars

4. **Tester:**
   - Accéder à https://your-site.netlify.app
   - Cliquer sur les liens de navigation
   - Vérifier que les routes fonctionnent

---

## 🔐 Security Notes

- ✅ CSP configured pour Supabase + FedaPay APIs
- ✅ Headers de sécurité actifs:
  - X-Content-Type-Options: Prévient MIME-type sniffing
  - X-Frame-Options: Prévient clickjacking
  - X-XSS-Protection: Protection XSS
  - Permissions-Policy: Désactive accès webcam/mic

---

## 📞 Support

Si ça ne marche pas:
1. ✅ Vérifier les env vars
2. ✅ Vérifier le build log (Netlify Dashboard)
3. ✅ Vérifier la console browser (F12)
4. ✅ Vérifier netlify.toml est à la racine

**Status:** Ready for re-deployment ✅
