#!/usr/bin/env bash
# Copia i file aggiornati del sito nella clone locale e avvia l'anteprima.
set -e
SRC="$HOME/Dropbox/antonio-portfolio/site-update"
DST="$HOME/antonio-portfolio"
cp -r "$SRC/src/." "$DST/src/"
echo "File copiati in $DST/src"
cd "$DST"
npm install --no-audit --no-fund
VITE_SANITY_PROJECT_ID=7xlsgxia VITE_SANITY_DATASET=production npm run dev
