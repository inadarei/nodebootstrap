#!/usr/bin/env sh

export NODE_ENV=development
# Note: hot reloading and clustering don't always work well together so you may want to disable clustering in dev
export NODE_SERVE_STATIC=1
export NODE_HOT_RELOAD=1
export NODE_LOGGER_GRANULARLEVELS=1

./bin/start.sh
