#!/usr/bin/env bash
# Mide Lighthouse (móvil y escritorio) contra un servidor en marcha.
# Uso: npm run preview &  luego  bash tests/lighthouse.sh [http://localhost:4321]
set -euo pipefail
BASE="${1:-http://localhost:4321}"
OUT="test-results/lighthouse"; mkdir -p "$OUT"
for u in / /servicios/ /servicios/sonografia-4d/; do
  for mode in mobile desktop; do
    name="${mode}$(echo "$u" | tr '/' '_')"
    preset=""; [ "$mode" = desktop ] && preset="--preset=desktop"
    npx lighthouse "$BASE$u" $preset --chrome-flags="--headless=new --no-sandbox" \
      --output=json --output=html --output-path="$OUT/$name" --quiet
    node -e "const r=require('./$OUT/$name.report.json');console.log('$mode $u',Object.values(r.categories).map(c=>c.title+': '+Math.round(c.score*100)).join(' · '))"
  done
done
