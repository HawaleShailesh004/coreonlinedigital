#!/usr/bin/env bash
# Full-page screenshot of a local route, for eyeballing the sample builds.
#
#   bash scripts/shot.sh samples/clinic [width] [height]
#
# Writes .tmp-img/shot-<slug>.png
set -euo pipefail

CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
ROUTE="${1:?usage: shot.sh <route> [width] [height]}"
WIDTH="${2:-1440}"
HEIGHT="${3:-2400}"

SLUG=$(echo "$ROUTE" | tr '/' '-' | sed 's/^-//;s/^$/home/')
OUT=".tmp-img/shot-${SLUG}.png"
PROFILE=$(mktemp -d)

mkdir -p .tmp-img
rm -f "$OUT"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --user-data-dir="$PROFILE" \
  --virtual-time-budget=12000 \
  --window-size="${WIDTH},${HEIGHT}" \
  --screenshot="$(pwd -W 2>/dev/null || pwd)/${OUT}" \
  "http://localhost:3000/${ROUTE}" >/dev/null 2>&1 || true

rm -rf "$PROFILE"

if [ -f "$OUT" ]; then
  echo "$OUT ($(wc -c < "$OUT") bytes)"
else
  echo "FAILED: no screenshot written for /${ROUTE}" >&2
  exit 1
fi
