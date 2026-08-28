# Setup Guida - Antonio Carcagnì Portfolio

## 🎯 Panoramica Architettura
- **Frontend**: React + TypeScript + Tailwind (Ocean Tech Design)
- **Backend**: Supabase (PostgreSQL, Auth Google OAuth, Storage)
- **Deploy**: Vercel (frontend) + Supabase (backend)
- **CMS**: Admin panel con Google OAuth - solo tu puoi accedere

---

## 📋 SETUP STEP-BY-STEP (Sintetizzato)

### **FASE 1: Supabase Setup (10 minuti)**

**1.1** Vai su https://supabase.com → Crea account (o login)

**1.2** Crea nuovo progetto:
   - Nome: `antonio-portfolio`
   - Region: `eu-west-1` (Europa - più veloce da Milano)

**1.3** Una volta creato, vai su **SQL Editor** → copia-incolla il contenuto di `/supabase/migrations.sql` → Esegui

**1.4** Abilita Google OAuth:
   - Vai su **Authentication** → **Providers**
   - Abilita **Google**
   - Ti serviranno le credenziali Google (vedi step 1.5)

**1.5** Crea Google OAuth Credentials:
   - Vai su https://console.cloud.google.com
   - Crea nuovo progetto: `antonio-portfolio`
   - Vai su **APIs & Services** → **Credentials**
   - Crea **OAuth 2.0 Client ID** (Web application):
     - Authorized redirect URIs:
       - `https://<your-supabase-project>.supabase.co/auth/v1/callback`
       - `http://localhost:3000/auth/v1/callback` (per testing locale)
   - Copia **Client ID** e **Client Secret**

**1.6** Torna su Supabase → Authentication → Google Provider:
   - Incolla Client ID e Client Secret
   - Save

**1.7** Recupera le credenziali Supabase:
   - Vai su **Settings** → **API**
   - Copia:
     - `Project URL` → sarà `VITE_SUPABASE_URL`
     - `anon public` key → sarà `VITE_SUPABASE_ANON_KEY`

---

### **FASE 2: Environment Variables Setup (2 minuti)**

**2.1** Nel root del progetto, crea file `.env.local`:
   ```
   VITE_SUPABASE_URL=<Project URL da 1.7>
   VITE_SUPABASE_ANON_KEY=<anon public key da 1.7>
   VITE_ADMIN_EMAIL=***REMOVED-EMAIL***
   ```

**2.2** Salva e verifica che `.env.local` sia nel `.gitignore` (non deve essere committato)

---

### **FASE 3: Frontend Setup & Test Locale (5 minuti)**

**3.1** Nel terminal, naviga nella cartella del progetto:
   ```bash
   cd antonio-portfolio
   ```

**3.2** Installa dipendenze:
   ```bash
   npm install
   ```

**3.3** Avvia dev server:
   ```bash
   npm run dev
   ```
   → Dovrebbe aprire http://localhost:3000

**3.4** Testa il sito:
   - Vedi hero section, projects, skills, hobbies
   - Clicca **CMS** in navbar (in alto a destra)
   - Verrai reindirizzato a login

**3.5** Login CMS:
   - Clicca **"Sign in with Google"**
   - Google ti chiederà di confirmare → accetta
   - Se tutto OK, sarai reindirizzato al `/admin` panel
   - Dovresti vedere **Projects**, **Hobbies**, **Leads** tabs

**3.6** Testa modifica:
   - Clicca "Add Project" → riempi form → "Save Project"
   - Torna a home (clicca "Back to Portfolio")
   - Vedi il progetto nel portfolio? ✅

---

### **FASE 4: Deploy su Vercel (5 minuti)**

**4.1** Prepara il repo GitHub:
   ```bash
   git add .
   git commit -m "Initial commit: Ocean Tech portfolio with CMS"
   git push origin main
   ```

**4.2** Vai su https://vercel.com → Import Project
   - Seleziona repo GitHub
   - Framework Preset: **Vite**
   - Environment Variables:
     - `VITE_SUPABASE_URL` = <valore da .env.local>
     - `VITE_SUPABASE_ANON_KEY` = <valore da .env.local>
     - `VITE_ADMIN_EMAIL` = ***REMOVED-EMAIL***
   - Deploy

**4.3** Attendi build (~2 minuti)

**4.4** URL live sarà qualcosa come: `https://antonio-portfolio.vercel.app`

**4.5** Testa il login live:
   - Vai su `https://antonio-portfolio.vercel.app/admin/login`
   - Accedi con Google
   - Se funziona, tutto è ok! ✅

---

### **FASE 5: Dominio Custom (Opzionale - 2 minuti)**

**5.1** Compra dominio (Namecheap, Google Domains, ecc.) → es: `antoniocarcagni.com`

**5.2** Su Vercel:
   - Vai su Project Settings → **Domains**
   - Aggiungi dominio
   - Segui le istruzioni per DNS (dipende dal registrar)

**5.3** Email notifiche (Opzionale):
   - Aggiungi Resend o SendGrid per notifiche form
   - Ora il form invia a Supabase, ma potresti aggiungere email

---

## 🔧 Comandi Utili

```bash
# Dev server
npm run dev

# Build produzione
npm run build

# Preview build locale
npm run preview

# Lint
npm run lint
```

---

## 📊 Costi Mensili Stimati

| Servizio | Costo | Note |
|---|---|---|
| **Supabase** | €0-9 | Gratuito fino 500MB, poi €9 |
| **Vercel** | €0 | Gratuito per portfolio |
| **Dominio** | €12/anno | ~€1/mese |
| **Google Cloud** | €0 | Gratuito OAuth |
| **TOTALE** | **€10-12/mese** | *O gratuito se rimani negli free tier* |

---

## 🚨 Troubleshooting

**Login Google non funziona?**
- Verifica che `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` siano corretti
- Controlla che Google OAuth sia abilitato su Supabase
- Verifica che il redirect URI sia configurato correttamente

**Projects/Hobbies non compaiono?**
- Controlla che le tabelle siano state create (vai su Supabase SQL, esegui migrations)
- Verifica che RLS policies siano corrette

**Errori sui CSS/styling?**
- Esegui `npm install` per assicurarti che tailwindcss sia installato
- Riavvia dev server

---

## 📝 Prossimi Step Consigliati

1. ✅ Completa il setup locale (fino a FASE 3.6)
2. ✅ Deploy su Vercel (FASE 4)
3. ✅ Connetti dominio custom (FASE 5)
4. ⚙️ Aggiungi foto ai progetti (migliora le immagini placeholder)
5. ⚙️ Configura email notifications per i lead (Resend/SendGrid)
6. ⚙️ SEO: sitemap.xml, robots.txt, meta tags

---

## 📞 Su cosa puoi contarmi

- Debugging di errori setup
- Miglioramenti CMS (drag-drop reordering, edit projects)
- Aggiungere features (analytics, newsletter, ecc.)
- Ottimizzazioni performance

Buon lavoro! 🚀
