#!/bin/bash

# Exit on error
set -e

ENVIRONMENT=$1
BRANCH="staging"

if [ -z "$ENVIRONMENT" ]; then
  echo "Usage: $0 <staging|production>"
  exit 1
fi

if [ "$ENVIRONMENT" == "production" ]; then
  BRANCH="main"
fi

if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
  echo "Invalid environment: $ENVIRONMENT, it should be staging or production"
  exit 1
fi

echo "Starting update process to $ENVIRONMENT... 🕹️"

echo "Pulling the latest changes from the $BRANCH branch... 🔄"
git checkout $BRANCH
git pull origin $BRANCH

echo "Installing dependencies... 📦"
pnpm i --frozen-lockfile

# Build the project
echo "Building project... 🔨"
pnpm build

echo "Update process completed! 🎉"
