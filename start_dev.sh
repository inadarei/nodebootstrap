#!/bin/bash

# ATTENTION:
# npm install supervisor -g

# Let's make sure you have supervisor installed:
if [ ! `which supervisor` ]; then
    echo "ERROR: Please install supervisor with:";
    echo "  npm install supervisor -g";
    exit 1;
fi

export NODE_ENV=development
# set node_not_clustered to 1, if you do not need clustering in dev environment
export NODE_NOT_CLUSTERED=0
export NODE_SERVE_STATIC=1

supervisor -n exit -w lib,config,server.js server.js

