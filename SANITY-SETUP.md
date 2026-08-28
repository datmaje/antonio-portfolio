# 🎨 Sanity CMS Setup

Guida rapida per configurare il CMS Sanity con il portfolio.

---

## 🚀 STEP 1: Crea Sanity Project

1. Vai su https://sanity.io
2. Clicca **"Get started"** o **"Create project"**
3. Compila:
   - **Project name**: `antonio-portfolio`
   - **Dataset name**: `production`
   - **Privacy**: `Public` (API access)
4. Clicca **"Create"**

Aspetta ~30 secondi per l'attivazione.

---

## 🔑 STEP 2: Recupera Project ID

Nella Sanity dashboard:

1. Vai su **Settings** (in alto)
2. Clicca **API**
3. Copia il **Project ID** (lungo alfanumerico)

Salva questo ID → servirà per `.env.local`

---

## ✅ STEP 3: Configura Google OAuth (Accesso Gmail)

Nel progetto Sanity:

1. Vai su **Settings** → **Authentication**
2. Clicca **"Add Authentication Provider"**
3. Seleziona **"Google"**
4. Compila:
   - **Client ID**: (vedi STEP 4 sotto)
   - **Client Secret**: (vedi STEP 4 sotto)

Per ora SALVA senza ID/Secret (li ricaverrai dopo).

---

## 🔐 STEP 4: Crea Google OAuth Credentials

1. Vai su https://console.cloud.google.com
2. Crea nuovo progetto: `antonio-portfolio`
3. Abilita **Google+ API**
4. Crea **OAuth Consent Screen** (External)
5. Crea **OAuth Client ID** (Web application)

Autorizzato redirect URIs:
- `https://<sanity-project>.sanity.studio/auth/google/callback`
- Sostituisci `<sanity-project>` con il tuo project ID

6. Copia **Client ID** e **Client Secret**
7. Incolla su Sanity → Settings → Authentication → Google

---

## 📝 STEP 5: Crea `.env.local`

Nella root del progetto:

```
VITE_SANITY_PROJECT_ID=your_project_id_qui
VITE_SANITY_DATASET=production
```

Sostituisci `your_project_id_qui` con il tuo Project ID da STEP 2.

---

## 🎯 STEP 6: Accedi a Sanity Studio

Sanity Studio (il CMS) è automaticamente disponibile su:

```
https://<project-id>.sanity.studio
```

Oppure in locale dopo `npm run dev`:
```
http://localhost:3000/studio
```

Login con il tuo **Gmail account** (usando Google OAuth) ✅

---

## 📊 STEP 7: Aggiungi Contenuto

Nel Sanity Studio, avrai questi document types:

- **Projects** - Aggiungi i tuoi progetti
- **Hobbies** - I tuoi interessi
- **About** - Sezione About
- **Skills** - Competenze per categoria
- **Certifications** - Le tue certificazioni
- **Leads** - I contatti ricevuti (read-only)

Tutti i campi sono **completamente editabili**.

---

## 🚀 Deploy su Vercel

Quando deployi su Vercel:

Aggiungi le env vars:
```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

Il tuo CMS sarà disponibile su:
```
https://sito.vercel.app/studio
```

---

## 📖 Accesso CMS in Produzione

Una volta deployato:

1. Vai a `https://tuo-dominio.com/studio` (o `/admin/studio`)
2. Clicca **"Sign in with Google"**
3. Accedi con il tuo account Gmail
4. Modifica TUTTO da Sanity Studio

**Niente backend custom, niente complicazioni!** ✨

---

## 💡 Tips

- Sanity salva automaticamente (non serve button "Save")
- Preview in tempo reale se hai fretta
- Puoi invitare collaboratori (Settings → Team)
- API GraphQL disponibile per query avanzate

---

## 🎉 Fatto!

Sanity CMS è pronto. Vai a deploy su Vercel! 🚀
