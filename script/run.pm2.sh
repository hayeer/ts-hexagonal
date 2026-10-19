#!/bin/bash
set -e

source "$(dirname "$0")/load_env.sh"

APP_NAME="${APP_ALIAS}"
PACKAGE_HASH_FILE=".package-json.hash"

echo "Pulling latest code..."

if [ "$APP_ENV" = "production" ]; then
    BRANCH="master"
else
    BRANCH="develop"
fi

echo "Pulling latest code from $BRANCH..."
git pull origin "$BRANCH"

NEW_HASH=$(md5sum package.json pnpm-lock.yaml 2>/dev/null | md5sum | awk '{print $1}')

if [ -f "$PACKAGE_HASH_FILE" ]; then
    OLD_HASH=$(cat "$PACKAGE_HASH_FILE")
else
    OLD_HASH=""
fi

[ -d "dist" ] && rm -rf dist

if [ "$NEW_HASH" != "$OLD_HASH" ]; then
    echo "📦 Dependencies changed, running pnpm install..."
    pnpm install --frozen-lockfile
    echo "$NEW_HASH" > "$PACKAGE_HASH_FILE"
else
    echo "✅ Dependencies unchanged, skipping install..."
fi

echo "Building project..."
if ! ./node_modules/.bin/tsc; then
    echo "Build failed, aborting deploy."
    exit 1
fi

echo "Deploying with PM2..."
if pm2 describe "$APP_NAME" 2>/dev/null | grep -q "online"; then
    echo "App already running, reloading..."
    pm2 reload ecosystem.config.js --only "$APP_NAME" --update-env
else
    echo "🚀 App not running, starting..."
    pm2 start ecosystem.config.js --only "$APP_NAME"
fi

echo "✅ Done!"
