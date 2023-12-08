#!/usr/bin/env bash

service nginx start
pm2 start /myapp/pm2/pm2-development.json

# npm run start
# Keep Container Running
tail -f /dev/null
