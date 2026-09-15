#!/usr/bin/env bash
# Allinea Sanity (status published + periodo scheda 05) e pubblica il frontend con il filtro status.
# Da eseguire una volta: cd ~/Dropbox/antonio-portfolio && bash applica-fix.sh
set -e

SITE="$HOME/Dropbox/antonio-portfolio"
NDJSON="$SITE/projects-published.ndjson"

echo "== 1/2 Import su Sanity: 20 documenti, 19 published + 1 on-hold =="
cd "$SITE/studio-config"
export SANITY_STUDIO_PROJECT_ID=7xlsgxia
export SANITY_STUDIO_DATASET=production
npx sanity dataset import "$NDJSON" production --replace

echo
echo "== 2/2 Commit e push del frontend =="
cd "$SITE"
git add src
git commit -m "Filtro status published sulle query Sanity; fix link LinkedIn"
git push origin main

echo
echo "Fatto. Vercel ridistribuisce da solo. Verifiche:"
echo "  /projects                                -> 19 case, Switching assente"
echo "  /projects/switching-and-market-processes  -> Project not found"
