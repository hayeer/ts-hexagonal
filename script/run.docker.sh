#!/bin/bash
set -e

source "$(dirname "$0")/load_env.sh"

if [ "$APP_ENV" = "production" ]; then
    BRANCH="master"
else
    BRANCH="develop"
fi

echo "Pulling latest code from $BRANCH..."
git pull origin "$BRANCH"

if command -v docker &> /dev/null && docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
    RUNNER_CMD="docker"
elif command -v podman &> /dev/null; then
    if podman compose version &> /dev/null; then
        COMPOSE_CMD="podman compose"
        RUNNER_CMD="podman"
    elif command -v podman-compose &> /dev/null; then
        COMPOSE_CMD="podman-compose"
        RUNNER_CMD="podman"
    else
        echo "Docker is not installed and Podman Compose is missing, aborting."
        exit 1
    fi
else
    echo "Neither Docker nor Podman found, aborting."
    exit 1
fi

echo "Building image and starting container..."
if ! $COMPOSE_CMD up -d --build --remove-orphans; then
    echo "Docker build or start failed, aborting deploy."
    exit 1
fi

echo "Cleaning up dangling images..."
$RUNNER_CMD image prune -f

$RUNNER_CMD compose ps
