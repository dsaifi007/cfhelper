#!/bin/bash

set -e

cd /var/www/cfhelper.com/cloudflare
echo "Current directory: $(pwd)"

echo "Sourcing .bashrc..."
source ~/.bashrc || true 

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

echo "Running npm install..."
npm install

echo "Running npm run build..."
npm run build

echo "Restarting PM2 process..."
pm2 restart cloudflare

echo "Deployment completed successfully."
