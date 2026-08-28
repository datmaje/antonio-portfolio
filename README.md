# Antonio Carcagnì - Digital Leader Portfolio

**Ocean Tech Design** | React + TypeScript | Supabase + Google OAuth | Vercel Hosting

Portfolio esecutivo con CMS privato per gestire progetti e hobby. Posizionamento da **Head of Digital Transformation** tramite language strategico, scope e gravitas.

---

## 🚀 Deploy Rapido (Vercel)

### 1. GitHub Setup
```bash
git clone <your-repo-url>
cd antonio-portfolio
```

### 2. Copia `.env.example` in `.env.local` (solo per testing locale)
```bash
cp .env.example .env.local
```

### 3. Test locale (opzionale)
```bash
npm install
npm run dev
```
→ http://localhost:3000

### 4. Deploy su Vercel

**Opzione A - CLI (consigliato)**
```bash
npm install -g vercel
vercel
```
Seguire le istruzioni. Durante il setup, aggiungerai le env vars.

**Opzione B - Dashboard Vercel**
1. Vai su https://vercel.com/new
2. Importa il repo GitHub
3. Aggiungi **Environment Variables**:
   - `VITE_SUPABASE_URL` = `https://***REMOVED-PROJECT-ID***.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (vedi sotto)
   - `VITE_ADMIN_EMAIL` = `***REMOVED-EMAIL***`
4. Deploy

---

## 🔐 Environment Variables

**Credenziali Supabase:**
```
VITE_SUPABASE_URL=https://***REMOVED-PROJECT-ID***.supabase.co
VITE_SUPABASE_ANON_KEY=***REMOVED-SUPABASE-ANON-KEY***
VITE_ADMIN_EMAIL=***REMOVED-EMAIL***
```

⚠️ **IMPORTANTE**: 
- NON committare `.env.local` (è nel `.gitignore`)
- Aggiungi le env vars su Vercel dashboard
- La `ANON_KEY` è pubblica, è ok in git (è quella con `role: anon`)

---

## 📚 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Authentication**: Google OAuth
- **Hosting**: Vercel
- **Build Tool**: Vite

---

## 🏗️ Struttura Progetto

```
src/
├── components/          # UI Components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx     (editabile via CMS)
│   ├── Skills.tsx
│   ├── Certifications.tsx
│   ├── Hobbies.tsx      (editabile via CMS)
│   ├── Contact.tsx      (lead form)
│   └── Footer.tsx
├── pages/
│   ├── AdminLogin.tsx   (Google OAuth)
│   └── AdminPanel.tsx   (CMS)
├── lib/
│   └── supabase.ts      (Client config)
├── App.tsx              (Routing)
└── index.css            (Global styles)

supabase/
└── migrations.sql       (Schema + RLS)
```

---

## 🎯 Funzionalità

✅ **Ocean Tech Design** - Deep blues, glassmorphism, animazioni fluide  
✅ **Responsive** - Mobile-first, all devices  
✅ **Google OAuth** - Solo il tuo account può accedere come admin  
✅ **CMS Admin Panel** - Aggiungi/modifica/elimina projects e hobbies live  
✅ **Lead Capture** - Contact form con Supabase storage  
✅ **Positioning Implicito** - "Strategic leader", "at scale", senza "Head of" esplicito  

---

## 🔧 Scripts

```bash
npm run dev        # Dev server (localhost:3000)
npm run build      # Production build
npm run preview    # Preview prod build locally
npm run lint       # Lint code
```

---

## 🔐 Security & RLS

Supabase RLS policies garantiscono:
- 🟢 **Public**: Chiunque può leggere `projects` e `hobbies`
- 🟢 **Public**: Chiunque può inviare lead via contact form
- 🔴 **Admin only**: Solo `***REMOVED-EMAIL***` può modificare projects/hobbies
- 🔴 **Admin only**: Solo tu vedi i leads ricevuti

---

## 📖 Setup Completo (First Time)

Vedi `SETUP.md` per:
- Configurazione Supabase (SQL migrations, Google OAuth)
- Google OAuth credentials setup
- Local development
- Vercel deployment step-by-step

---

## 🌐 Dominio Custom

Una volta deployato su Vercel:

1. Compra dominio (Namecheap, Google Domains, ecc.)
2. Su Vercel dashboard → Project Settings → Domains
3. Aggiungi dominio e configura DNS

Esempio: `antoniocarcagni.com` → `antonio-portfolio.vercel.app`

---

## 💰 Costi Mensili

| Servizio | Costo |
|---|---|
| Supabase | €0-9 (gratuito all'inizio) |
| Vercel | €0 (gratuito) |
| Dominio | ~€12/anno (€1/mese) |
| **TOTALE** | **€10-12/mese** (o gratuito) |

---

## 🆘 Troubleshooting

**Errore: Cannot find module 'react'**
→ Esegui `npm install`

**Login Google non funziona**
→ Verifica su Supabase che Google OAuth sia abilitato in Authentication → Providers

**Projects non compaiono**
→ Esegui migrations.sql su Supabase SQL Editor

**Vercel build fallisce**
→ Controlla che env vars siano corrette in Vercel dashboard

---

## 📝 Roadmap

- [x] Design Ocean Tech
- [x] CMS admin panel
- [x] Google OAuth login
- [x] Lead capture form
- [x] Responsive design
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Analytics (Vercel Analytics)
- [ ] Email notifications per lead

---

## 👤 About

**Antonio Carcagnì** - Digital & IT Leader  
8+ years in cloud architecture, digital transformation, organizational leadership  

- 🏢 Experience: Engie, BIP Consulting, Vodafone
- 🎮 Projects: The Way Of Life (1M+ Steam downloads), Engie App, Engie Portal
- 🎓 Certifications: AWS Solution Architect, PSM I, Cyber Security Foundation
- 📍 Location: Milan, Italy
- 🌐 Languages: Italian (MT), English (C2), French (B1)

---

## 📞 Contact

📧 Email: ***REMOVED-EMAIL***  
📱 Phone: +39 ***REMOVED-PHONE***  
🔗 LinkedIn: https://www.linkedin.com/in/antoniocarcagnì/

---

**Created**: Aug 2026  
**Last Updated**: Aug 20, 2026  
**License**: Proprietary
