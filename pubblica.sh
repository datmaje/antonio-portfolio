#!/usr/bin/env bash
# Reimporta le 20 schede su Sanity dal file ndjson (published + on-hold gia' impostati).
# Uso: cd ~/Dropbox/antonio-portfolio && bash pubblica.sh
set -e

SITE="$HOME/Dropbox/antonio-portfolio"
cd "$SITE/studio-config"
export SANITY_STUDIO_PROJECT_ID=7xlsgxia
export SANITY_STUDIO_DATASET=production

echo "== Import delle 20 schede =="
npx sanity dataset import "$SITE/projects-published.ndjson" production --replace

echo
echo "== Rimozione di eventuali bozze duplicate =="
for s in engie-b2c-mobile-app online-customer-area meter-to-cash-programme \
  technology-leadership-and-governance agile-and-safe-delivery \
  vodafone-data-centre-operations vodafone-technology-innovation-center \
  fca-wiadvisor-field-rollout the-way-of-life-steam-game metering-and-master-data \
  billing-and-invoicing credit-and-collections regulatory-compliance \
  customer-care-and-feedback data-platform-and-analytics cloud-operations-and-devops \
  erp-modernization-as400-to-dynamics aws-cloud-training \
  switching-and-market-processes werank; do
  npx sanity documents delete "drafts.project-$s" || true
done

echo
echo "Fatto. Controlla https://antonio-portfolio-nine.vercel.app/projects"

# Il prerender congela i contenuti alla build: dopo ogni import serve un rebuild.
git -C /home/voidmaje/Dropbox/antonio-portfolio commit --allow-empty -m "rebuild: contenuti aggiornati"
git -C /home/voidmaje/Dropbox/antonio-portfolio push origin main
