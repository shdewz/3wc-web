#!/bin/bash
cd "$(dirname "$0")/.."

echo "Pulling updates from git..."
git pull

echo "Rebuilding and starting containers..."
docker compose up -d --build

echo "Deployment complete."
