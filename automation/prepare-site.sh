#!/usr/bin/env bash
set -euo pipefail

out="${1:-dist}"
mkdir -p "$out"
cp automation/index.html automation/_worker.js "$out/"
cp -R automation/regalo "$out/"
python automation/regalo/make_pdf.py "$out/regalo/Mi_primer_encuentro_contigo_CORREGIDO.pdf"


# Source edits come from GitHub; unchanged assets are pinned to this snapshot.
while IFS= read -r path; do
  mkdir -p "$out/$(dirname "$path")"
  curl --fail --location --silent --show-error --retry 3 \
    "https://vida-modo-ohm-prueba.pages.dev/${path}" \
    --output "$out/$path"
done < automation/asset-paths.txt

cp automation/cofre-hydro-active-vmo-20261104.jpg "$out/cofre-hydro-active-vmo-20261104.jpg"
# Keep the previously published URL working for browsers with cached HTML.
cp automation/cofre-hydro-active-vmo-20261104.jpg "$out/cofre-hydro-active-vmo.jpeg"

(cd "$out" && sha256sum -c ../automation/asset-checksums.txt)
test -s "$out/index.html"
test -s "$out/_worker.js"
test -s "$out/calendario-adviento-dr-grandel.jpeg"
test -s "$out/cofre-hydro-active-vmo-20261104.jpg"
test -s "$out/cofre-hydro-active-vmo.jpeg"
