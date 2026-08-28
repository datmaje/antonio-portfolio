# 🌊 Antonio Carcagnì Portfolio - Ocean Tech with Sanity CMS

**Live demo**: (verrà aggiunto dopo deploy)

---

## 🎨 Design

**Ocean Tech Aesthetic**:
- Deep ocean blues (#0A1929, #0F3A5F, #2BA8D9)
- Glassmorphism effects
- Smooth Framer Motion animations
- Mobile-first responsive design

---

## ✨ Features

### Public Sections
✅ **Hero** - Opening statement with branding  
✅ **About** - Leadership narrative  
✅ **Featured Projects** - Editable portfolio gallery  
✅ **Skills** - Categorized competencies  
✅ **Certifications** - Timeline view  
✅ **Hobbies** - Personal interests  
✅ **Contact** - Lead capture form + LinkedIn link  

### Admin Panel (CMS)
✅ **Sanity Studio** - Beautiful visual editor  
✅ **Projects Management** - Add/edit/delete + reorder  
✅ **Hobbies Management** - Full CRUD  
✅ **About Section** - Rich text editing  
✅ **Skills Management** - Categories + lists  
✅ **Certifications** - Timeline entries  
✅ **Lead Management** - View all contacts received  

---

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **CMS**: Sanity (free tier)
- **Images**: Sanity Image CDN
- **Animations**: Framer Motion
- **Build**: Vite
- **Hosting**: Vercel
- **Auth**: Google OAuth (via Sanity)

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+
- Sanity account (free)
- Vercel account (free)

### Setup

1. **Create Sanity Project**
   ```bash
   # Go to https://sanity.io and create a project
   # Save your Project ID
   ```

2. **Clone and Configure**
   ```bash
   npm install
   cp .env.example .env.local
   # Edit .env.local with your Sanity Project ID
   ```

3. **Run Locally**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   # CMS: http://localhost:3000/studio
   ```

---

## 📝 Environment Variables

Create `.env.local`:

```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

Get your Project ID from Sanity dashboard → Settings → API

---

## 📖 Full Setup Guides

See the complete deployment guides in `/deploy-produzione/` folder:

1. `00-OVERVIEW-DEPLOY.md` - Overview
2. `01-SETUP-GITHUB.md` - GitHub repository
3. `02-SETUP-SANITY.md` - Sanity CMS (NEW!)
4. `03-SETUP-GOOGLE-OAUTH.md` - Gmail login
5. `04-DEPLOY-VERCEL.md` - Deploy to production
6. `05-DOMINIO-CUSTOM.md` - Custom domain (optional)

---

## 🎯 Accessing the CMS in Production

Once deployed on Vercel, access your CMS at:

```
https://your-domain.vercel.app/studio
```

Login with your **Gmail account** (no passwords!) ✨

---

## 🛠️ CMS Usage

### Add a Project
1. Go to Sanity Studio
2. Click "Projects"
3. Click "Create" 
4. Fill in:
   - **Title** - Project name
   - **Description** - What you did
   - **Image** - Upload project screenshot
   - **Link** - URL to project or portfolio
   - **Order** - Display position (1, 2, 3...)
5. Save - it auto-publishes!

### Manage Hobbies
1. Projects → "Hobbies"
2. Add/edit/delete entries
3. Auto-saved!

### View Leads
1. Projects → "Leads"
2. See all contact forms submitted
3. Read-only (managed externally)

---

## 🌍 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
4. Deploy - done!

Auto-deploys on every `git push`

---

## 💰 Pricing

| Service | Cost |
|---|---|
| Sanity | Free (generous tier) |
| Vercel | Free |
| Domain | ~€1/month (optional) |
| **Total** | **€0-12/month** |

---

## 📊 File Structure

```
/
├── src/
│   ├── components/     (React components)
│   ├── pages/          (Page layouts)
│   ├── lib/            (Sanity client config)
│   └── App.tsx
├── sanity/
│   └── schemas/        (Content models)
├── public/
├── package.json
├── sanity.config.ts
├── SANITY-SETUP.md     (Setup instructions)
└── README-SANITY.md    (this file)
```

---

## 🔐 Security

- **No passwords**: Google OAuth login only
- **Admin-only**: Only your Gmail account has CMS access
- **No hardcoded secrets**: Environment variables for sensitive data
- **RLS not needed**: Sanity handles permissions natively

---

## 🐛 Troubleshooting

### CMS won't load
- Verify `VITE_SANITY_PROJECT_ID` in `.env.local`
- Check Sanity project ID in dashboard Settings
- Restart dev server: `Ctrl+C` then `npm run dev`

### Can't login to CMS
- Use the Gmail account you registered Sanity with
- Only that account is authorized

### Projects don't appear
- Check Sanity Studio - are projects published?
- Verify order numbers (should be 1, 2, 3...)
- Hard refresh: `Ctrl+Shift+R`

### Images not loading
- Upload images in Sanity Studio
- Don't use external URLs (use Sanity Image CDN)

---

## 🚀 Next Steps

1. ✅ Test locally (`npm run dev`)
2. ✅ Access CMS (`http://localhost:3000/studio`)
3. ✅ Add your projects
4. ✅ Deploy to Vercel
5. ✅ Access production CMS (`https://domain.com/studio`)

---

## 📞 Support

All deployment guides are in `/deploy-produzione/` folder  
Each has a **TROUBLESHOOTING** section

---

## 📜 License

MIT - Free to use and modify

---

**Built with ❤️ and Ocean Tech design** 🌊
