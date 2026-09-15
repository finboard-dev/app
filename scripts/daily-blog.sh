#!/bin/bash
set -eu

REPO="/Users/ujjwal/finboard/app"
ENV_FILE="/Users/ujjwal/.blog-pipeline.env"
RUNNER="$REPO/scripts/daily_blog.py"
if [ "${1:-}" = "--test-runner" ]; then
  [ "$#" -eq 2 ] || exit 64
  RUNNER="$2"
else
  LOG_DIR="/Users/ujjwal/Library/Logs/finboard-blog-pipeline"
  mkdir -p "$LOG_DIR"
  if [ -f "$ENV_FILE" ]; then
    set -a
    . "$ENV_FILE"
    set +a
  fi
fi

if ! command -v node >/dev/null 2>&1; then
  NVM_DIR="${NVM_DIR:-/Users/ujjwal/.nvm}"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
    if ! nvm use --silent default >/dev/null 2>&1; then
      echo "Daily blog runner could not activate NVM's default Node version." >&2
      exit 127
    fi
  fi
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Daily blog runner requires Node on PATH for frontend validation." >&2
  exit 127
fi

exec /usr/bin/python3 "$RUNNER" --repo "$REPO"
