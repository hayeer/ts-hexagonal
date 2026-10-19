#!/bin/bash
set -e

if [ -f .env ]; then
    set -a
    source .env
    set +a
else
    echo ".env file not found, aborting."
    exit 1
fi

if [ -z "${APP_ALIAS}" ]; then
    echo "APP_ALIAS is missing or empty in .env, aborting."
    exit 1
fi

if [ -z "${APP_ENV}" ]; then
    echo "APP_ENV is missing or empty in .env, aborting."
    exit 1
fi

if [ -z "${APP_PORT}" ]; then
    echo "APP_PORT is missing or empty in .env, aborting."
    exit 1
fi
