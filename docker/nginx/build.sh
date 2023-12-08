#!/usr/bin/env bash

# Remove Old Image
docker rm -f remix_web_app

# No Cache Build
docker build --no-cache -t remix_web_app -f docker/nginx/Dockerfile .

