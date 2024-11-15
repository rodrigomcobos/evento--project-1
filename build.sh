#!/usr/bin/env bash

# Exit on error
set -e

# Print debugging information
echo "Current working directory: $(pwd)"
echo "Directory contents:"
ls -la

# Ensure we're in the correct directory
if [ -f "package.json" ]; then
    echo "Found package.json"
else
    echo "Error: package.json not found in current directory"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the project
echo "Building the project..."
VITE_APP_ROOT=$(pwd) npm run build

# Verify build output
echo "Build completed. Checking dist directory:"
ls -la dist

echo "Build completed successfully!"