#!/bin/bash
set -eu

REPO="/Users/ujjwal/finboard/app"
ENV_FILE="/Users/ujjwal/.blog-pipeline.env"
LOG_DIR="/Users/ujjwal/Library/Logs/finboard-blog-pipeline"

mkdir -p "$LOG_DIR"
if [ -f "$ENV_FILE" ]; then
  set -a
  . "$ENV_FILE"
  set +a
fi

exec /usr/bin/python3 "$REPO/scripts/daily_blog.py" --repo "$REPO"
