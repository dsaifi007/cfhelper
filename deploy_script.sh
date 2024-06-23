#!/bin/bash

set -e  # Exit immediately if any command fails

cd /var/www/cfhelper.com/cloudflare
echo "Current directory: $(pwd)"

git reset --hard
git checkout master
git pull

echo "Sourcing .bashrc..."
source ~/.bashrc

echo "Running npm install..."
npm install

echo "Running npm run build..."
npm run build

echo "Restarting PM2 process..."
pm2 restart cloudflare

echo "Deployment completed successfully."
