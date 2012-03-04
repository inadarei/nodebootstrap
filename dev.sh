#!/bin/bash

# ATTENTION:
# npm install supervisor -g

# Let's make sure you have supervisor installed:
if [ ! `which supervisor1` ]; then
    echo "Please install supervisor with:";
    echo "  npm install supervisor -g";
    exit 1;
fi

supervisor -w lib,config,server.js server.js

