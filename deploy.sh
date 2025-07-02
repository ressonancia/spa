#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Variables
BUILD_DIR="dist"
LOCAL_BUILD_COMMAND="npm run build"
REMOTE_USER="ressonance_spa"               # Replace with your remote server username
REMOTE_HOST="10.0.0.136" # Replace with your server IP or domain
REMOTE_PATH="/var/www/html/ressonance-spa"      # Path to the Nginx root on the server
SSH_KEY_NAME="id_rsa_ressonance"      # Path to the Nginx root on the server

# Step 1: Run the Vue.js build
echo "Building Vue.js application..."
$LOCAL_BUILD_COMMAND

# Check if the build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "Error: Build directory '$BUILD_DIR' does not exist. Build failed."
    exit 1
fi
echo "Build completed successfully."

# Step 2: Copy the build files to the remote server
echo "Deploying files to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH..."
scp -i ~/.ssh/$SSH_KEY_NAME -r $BUILD_DIR/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo "Deployment completed successfully!"
