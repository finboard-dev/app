#!/bin/bash
set -eu

LABEL="ai.ujjwalks.blog-pipeline.app"
REPO="/Users/ujjwal/finboard/app"
SOURCE="$REPO/ops/launchd/$LABEL.plist"
DEST="/Users/ujjwal/Library/LaunchAgents/$LABEL.plist"
LOG_DIR="/Users/ujjwal/Library/Logs/finboard-blog-pipeline"
CURRENT_UID="$(id -u)"
DOMAIN="gui/$CURRENT_UID"

plutil -lint "$SOURCE"
mkdir -p "$LOG_DIR" "/Users/ujjwal/Library/LaunchAgents"
cp "$SOURCE" "$DEST"
launchctl bootout "$DOMAIN" "$DEST" 2>/dev/null || true
launchctl bootstrap "$DOMAIN" "$DEST"
launchctl print "$DOMAIN/$LABEL"
