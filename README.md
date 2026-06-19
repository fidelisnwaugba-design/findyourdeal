# FindYourDeal — Affiliate Store

A clean, fast affiliate product store built with React. Add products via the Admin panel, and earn commissions when visitors click through and buy.

---

## 🚀 Deploy in 5 Minutes (Free)

### Option A — Vercel (Recommended)

1. Create a free account at [vercel.com](https://vercel.com)
2. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```
3. In this folder, run:
   ```bash
   vercel
   ```
   Follow the prompts. Your site goes live instantly.

4. To add your own domain:
   - Buy a domain at [namecheap.com](https://namecheap.com) (~$12/year)
   - In Vercel dashboard → your project → Settings → Domains → Add domain
   - Follow the DNS instructions (takes ~15 minutes)

### Option B — Netlify

1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop the `build/` folder into Netlify dashboard, OR:
   ```bash
   npm run build
   npx netlify-cli deploy --prod --dir=build
   ```
3. Add custom domain in Netlify → Site settings → Domain management

### Option C — GitHub + Auto-deploy

1. Create a GitHub account and a new repository
2. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial store"
   git remote add origin https://github.com/YOUR_USERNAME/affiliate-store.git
   git push -u origin main
   ```
3. Connect GitHub repo to Vercel or Netlify — it will auto-deploy every time you push changes

---

## 🛠️ Local Development

```bash
npm install        # Install dependencies
npm start          # Run at http://localhost:3000
npm run build      # Build for production
```

---

## ✏️ Customise Your Store

### Change store name, colours, password
Edit `src/config.js`:
```js
export const STORE_CONFIG = {
  name: "YourStoreName",           // Store brand name
  tagline: "Your tagline here",
  primaryColor: "#0F4C81",         // Main colour (hex)
  accentColor: "#F5A623",          // Accent / badge colour
  adminPassword: "yourpassword",   // Change this!
};
```

### Add product categories
In `src/config.js`, add to the `CATEGORIES` array:
```js
export const CATEGORIES = [
  "All", "Electronics", "Kitchen", "YourNewCategory"
];
```

### Add products without code
1. Open your live site
2. Click **Admin** (top right)
3. Enter your password
4. Click **Add Product** and fill in:
   - Product name
   - Your affiliate tracking URL
   - Price, image URL, description
   - Commission rate (for your reference)
5. Click Save — appears instantly, saved permanently

---

## 💾 How Data Saves

Products added via Admin panel are saved to **localStorage** in the browser. This means:
- ✅ Survives page refresh
- ✅ Survives closing and reopening the browser
- ✅ No database or backend needed
- ⚠️ Clearing browser data will reset products to defaults
- ⚠️ Products are per-device (not shared across computers)

**For multi-device sync**, consider adding a free Firebase or Supabase backend (ask Claude to help you add this).

---

## 🔗 Affiliate Programs to Join

| Program | Sign Up | Commission |
|---|---|---|
| Amazon Associates | associates.amazon.ca | 1–10% |
| ShareASale | shareasale.com | Varies |
| Impact | impact.com | Varies |
| ClickBank | clickbank.com | Up to 75% |
| CJ Affiliate | cj.com | Varies |
| Rakuten | rakuten.com | Varies |

---

## 📋 Legal Requirements

- ✅ Affiliate disclosure footer is already included
- Add a **Privacy Policy** page if you collect any user data
- Amazon Associates requires disclosure **on the same page** as affiliate links (already done)

---

## 📁 Project Structure

```
affiliate-store/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── components/
│   │   ├── ProductCard.js  # Individual product card
│   │   └── AdminPanel.js   # Admin CRUD interface
│   ├── hooks/
│   │   └── useProducts.js  # Persistent storage logic
│   ├── config.js           # ← EDIT THIS to customise
│   ├── App.js              # Main store layout
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── vercel.json             # Vercel deployment config
├── netlify.toml            # Netlify deployment config
├── .gitignore
└── package.json
```

---

Built with React · Deploy free on Vercel or Netlify
