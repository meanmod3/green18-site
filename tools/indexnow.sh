#!/usr/bin/env bash
# Submit changed URLs to IndexNow (Bing, Yandex, Seznam, Naver — submitting to
# one participating engine shares the notification with all of them).
#
# Fantasy content decays in hours, so this should run on every content deploy
# during draft season, not weekly.
#
#   Tools/indexnow.sh              # submit every URL in the sitemaps
#   Tools/indexnow.sh /a /b/c      # submit only these paths
#
# The key is published by the build at /<key>.txt, whose filename and body are
# both the key. That file must be live BEFORE submitting or the endpoint
# returns 403.
set -euo pipefail

KEY="a7f3c1e9b48d4a2f9c6e0b5d3a81f742"
HOST="green18.app"
ORIGIN="https://${HOST}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Verify the key file is actually reachable — a 403 from a missing key is the
# single most common IndexNow failure, and it is silent if you don't look.
key_status=$(curl -s -o /dev/null -w "%{http_code}" "${ORIGIN}/${KEY}.txt")
if [ "$key_status" != "200" ]; then
  echo "IndexNow key file is not live at ${ORIGIN}/${KEY}.txt (HTTP ${key_status})." >&2
  echo "Deploy first, then submit." >&2
  exit 1
fi

if [ "$#" -gt 0 ]; then
  URLS=("$@")
else
  mapfile -t URLS < <(grep -ho '<loc>[^<]*</loc>' "$ROOT"/sitemap-*.xml \
    | sed 's|<loc>||; s|</loc>||' | sed "s|^${ORIGIN}||" | sort -u)
fi

PAYLOAD=$(python3 - "$HOST" "$KEY" "$ORIGIN" "${URLS[@]}" <<'PY'
import json, sys
host, key, origin, *paths = sys.argv[1:]
urls = [p if p.startswith("http") else origin + p for p in paths]
print(json.dumps({"host": host, "key": key, "urlList": urls}))
PY
)

echo "submitting ${#URLS[@]} urls to IndexNow…"
code=$(curl -s -o /tmp/indexnow-response.txt -w "%{http_code}" \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  --data "$PAYLOAD")

case "$code" in
  200) echo "OK — accepted." ;;
  202) echo "OK — accepted, key validation pending." ;;
  400) echo "FAILED (400): bad request format." >&2; cat /tmp/indexnow-response.txt >&2; exit 1 ;;
  403) echo "FAILED (403): key not valid or not retrievable at ${ORIGIN}/${KEY}.txt." >&2; exit 1 ;;
  422) echo "FAILED (422): URLs do not match the declared host, or the key does not match." >&2; exit 1 ;;
  429) echo "FAILED (429): rate limited — too many submissions." >&2; exit 1 ;;
  *)   echo "FAILED (${code})." >&2; cat /tmp/indexnow-response.txt >&2; exit 1 ;;
esac
