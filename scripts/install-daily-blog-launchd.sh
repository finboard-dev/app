#!/bin/bash
set -eu
umask 077

LABEL="ai.ujjwalks.blog-pipeline.app"
REPO="${BLOG_PIPELINE_REPO:-/Users/ujjwal/finboard/app}"
USER_ROOT="${BLOG_PIPELINE_USER_ROOT:-/Users/ujjwal}"
SOURCE="$REPO/ops/launchd/$LABEL.plist"
DEST="$USER_ROOT/Library/LaunchAgents/$LABEL.plist"
LOG_DIR="$USER_ROOT/Library/Logs/finboard-blog-pipeline"
CURRENT_UID="$(id -u)"
DOMAIN="gui/$CURRENT_UID"

plutil -lint "$SOURCE"
mkdir -p "$LOG_DIR" "$USER_ROOT/Library/LaunchAgents"
chmod 700 "$LOG_DIR"
install -m 600 "$SOURCE" "$DEST"
launchctl bootout "$DOMAIN" "$DEST" 2>/dev/null || true
launchctl bootstrap "$DOMAIN" "$DEST"
launchctl print "$DOMAIN/$LABEL"
