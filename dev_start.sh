#!/bin/bash

export NODE_ENV=development
# Note: hot reloading and clustering don't always work well together so it's recommended to disable clustering in dev
export NODE_CLUSTERED=0
export NODE_SERVE_STATIC=1
export NODE_HOT_RELOAD=1


./start.sh

