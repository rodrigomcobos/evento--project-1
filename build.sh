#!/usr/bin/env bash

# Exit on error
set -e

echo "Current directory: $(pwd)"
echo "Directory contents: $(ls -la)"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Clean install
echo "Installing dependencies..."
rm -rf node_modules package-lock.json
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Build completed successfully!"
echo "Dist directory contents: $(ls -la dist)"