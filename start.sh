#!/bin/bash

# ATTENTION: You probably want to use start_dev.sh script, while developing, instead.
# npm install forever -g

# Let's make sure you have supervisor installed:
if [ ! `which forever` ]; then
    echo "ERROR: Please install forever with:";
    echo "  npm install forever -g";
    exit 1;
fi

export NODE_ENV=production
# Currently supervisor and cluster do not work together: https://github.com/isaacs/node-supervisor/issues/40
export NODE_NOT_CLUSTERED=0

forever start server.js -o forever.log

echo "--------------- NOTE: --------------"
echo "You can stop the application by running (in this folder):"
echo "  > forever stop server.js"
echo "You can see all Forever-running node apps by issuing:"
echo "  > forever list"
echo "See more about Forever at: https://github.com/indexzero/forever"
echo "------------------------------------"

