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

exec /usr/bin/python3 "$RUNNER" --repo "$REPO"
