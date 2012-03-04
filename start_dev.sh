#!/bin/bash

# ATTENTION:
# npm install supervisor -g

# Let's make sure you have supervisor installed:
if [ ! `which supervisor` ]; then
    echo "ERROR: Please install supervisor with:";
    echo "  npm install supervisor -g";
    exit 1;
fi

# Currently supervisor and cluster do not work together: https://github.com/isaacs/node-supervisor/issues/40
export NODE_NOT_CLUSTERED=1
supervisor -n exit -w lib,config,server.js server.js

