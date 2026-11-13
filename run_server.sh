#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
if [[ -f ../scripts/serve.sh ]]; then
  bash ../scripts/serve.sh
else
  npm run dev -- --host 127.0.0.1 --port "${PORT:-4000}"
fi
