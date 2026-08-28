# 🎨 Sanity Studio — Setup (deploy standalone)

Guida per creare e deployare il CMS. La Studio è **separata** dal sito
(`studio-config/`), deployata su un suo URL dedicato — non fa parte
del build del sito su Vercel.

Serve un terminale con **Node.js 20+**. Opzioni:
- **GitHub Codespaces** (consigliato, zero installazione): sul repo →
  `Code` → `Codespaces` → `Create codespace on main`
- Un terminale locale, se disponibile

---

## STEP 1 — Crea il progetto Sanity

Nel terminale (Codespace o locale):

```bash
cd studio-config
npm install
npx sanity login
```

Si apre il browser: login con **"Continue with Google"** (nessuna
configurazione OAuth custom necessaria — è nativo di Sanity).

```bash
npx sanity init --dataset production
```

Segui il prompt:
- "Create new project" → nome: `antonio-portfolio`
- Dataset: `production`
- Visibility: **Public**
- Quando chiede se usare la config esistente → **sì / rileva
  `sanity.config.ts` esistente** (non sovrascrivere gli schemi)

Al termine annota il **Project ID** stampato in console.

---

## STEP 2 — Variabili d'ambiente

Crea `studio-config/.env` (mai commitarlo, già in `.gitignore`):

```
SANITY_STUDIO_PROJECT_ID=<il tuo project id>
SANITY_STUDIO_DATASET=production
```

---

## STEP 3 — Deploy della Studio

```bash
npx sanity deploy
```

Chiede un hostname (es. `antonio-portfolio` → risultato:
`https://antonio-portfolio.sanity.studio`). Da qui in poi la Studio
è live e accessibile con login Google.

---

## STEP 4 — Collega il sito ai contenuti

Su **Vercel** → Project Settings → Environment Variables, aggiungi
(o verifica) — queste alimentano il sito pubblico, non la Studio:

```
VITE_SANITY_PROJECT_ID=<lo stesso project id di sopra>
VITE_SANITY_DATASET=production
```

Redeploy dopo averle impostate.

---

## Content types disponibili in Studio

- **Projects** — progetti del portfolio
- **Hobbies** — interessi personali
- **About** — testo sezione About
- **Skills** — competenze per categoria
- **Certifications** — certificazioni
- **Leads** — contatti ricevuti dal form (sola lettura consigliata)

Sanity salva automaticamente, nessun bottone "Save" da premere.

---

## Troubleshooting

**Il sito non mostra contenuti** → verifica che
`VITE_SANITY_PROJECT_ID` su Vercel combaci col Project ID della
Studio, e che i documenti siano effettivamente pubblicati (non solo
in bozza).

**`npx sanity deploy` fallisce** → assicurati di essere nella cartella
`studio-config/` e di aver fatto `npx sanity login` prima.

**Hostname studio già in uso** → sceglierne un altro, es.
`antonio-carcagni-portfolio`.
