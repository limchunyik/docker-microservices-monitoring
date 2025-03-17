#!/bin/bash

echo "Starting deployment process..."

# Pull latest changes
git pull

# Build and start containers
docker-compose down
docker-compose build
docker-compose up -d

echo "Deployment completed successfully!"
