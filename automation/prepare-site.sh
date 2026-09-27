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

# New URLs force browsers and edge caches to request the new photographs.
# Rewrite the rendered HTML and the hydrated page module together.
python3 - "$out" <<'PY'
from pathlib import Path
import sys

out = Path(sys.argv[1])
changes = {
    'refugio-balcon-limpio.png': 'refugio-de-paz-20260927-v2.png',
    'comunidad-balcon-limpio.png': 'vibrando-en-positivo-20260927-v2.png',
    'page-DcPYYahK.js': 'page-fotos-20260927-v2.js',
}
for path in [out / 'index.html', out / 'robots.txt.html', out / 'assets/page-DcPYYahK.js']:
    content = path.read_text()
    for old, new in changes.items():
        content = content.replace(old, new)
    path.write_text(content)
(out / 'assets/page-DcPYYahK.js').rename(out / 'assets/page-fotos-20260927-v2.js')
PY

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
test -s "$out/refugio-de-paz-20260927-v2.png"
test -s "$out/vibrando-en-positivo-20260927-v2.png"
