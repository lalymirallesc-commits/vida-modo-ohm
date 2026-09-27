#!/usr/bin/env bash
set -euo pipefail

# Preserve the current published site and its Pages Worker, replacing only the two photos.
out="${1:-dist}"
mkdir -p "$out"
cp automation/index.html automation/_worker.js "$out/"
while IFS= read -r path; do
  mkdir -p "$out/$(dirname "$path")"
  curl --fail --location --silent --show-error --retry 3 \
    "https://vida-modo-ohm-prueba.pages.dev/${path}?v=${GITHUB_SHA:-manual}" \
    --output "$out/$path"
done < automation/asset-paths.txt

while read -r expected path; do
  actual="$(sha256sum "$out/$path" | cut -d ' ' -f 1)"
  if [[ "$actual" != "$expected" ]]; then
    echo "Published asset differs from the reviewed site: $path" >&2
    exit 1
  fi
done < automation/asset-checksums.txt

command -v convert >/dev/null || { echo "ImageMagick is required" >&2; exit 1; }
while read -r target url; do
  [[ -n "$target" && -n "$url" ]] || continue
  tmp="$(mktemp)"
  curl --fail --location --silent --show-error --retry 3 "$url" --output "$tmp"
  convert "$tmp" "PNG24:$out/$target"
  rm -f "$tmp"
done < automation/photo-sources.txt

test -s "$out/index.html"
test -s "$out/_worker.js"
test -s "$out/refugio-balcon-limpio.png"
test -s "$out/comunidad-balcon-limpio.png"
