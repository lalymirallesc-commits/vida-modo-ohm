#!/usr/bin/env bash
set -euo pipefail

out="${1:-dist}"
mkdir -p "$out"
cp automation/index.html automation/_worker.js "$out/"

# Source edits come from GitHub; unchanged assets are pinned to this snapshot.
while IFS= read -r path; do
  mkdir -p "$out/$(dirname "$path")"
  curl --fail --location --silent --show-error --retry 3 \
    "https://vida-modo-ohm-prueba.pages.dev/${path}" \
    --output "$out/$path"
done < automation/asset-paths.txt

(cd "$out" && sha256sum -c ../automation/asset-checksums.txt)
test -s "$out/index.html"
test -s "$out/_worker.js"
test -s "$out/calendario-adviento-dr-grandel.jpeg"
