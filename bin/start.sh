#!/usr/bin/env sh

# A generic script that can be customized using various environmental variables (@see: README.md)
# Defaults in this script are suitable for production use.
#
# ATTENTION: You would want to use dev_start.sh script, while developing, instead.

if [ ! -d "$PWD/node_modules" ]; then
  echo "Please run the shell script from project's root folder"
  exit
fi

# Disable the runtime.json thing of config.js. It's annoying and sometimes breaks clustering.
export NODE_CONFIG_DISABLE_FILE_WATCH="Y"

# Setup metalogger
if [ ! $NODE_LOGGER_LEVEL ]; then
  export NODE_LOGGER_LEVEL='notice'
fi
if [ ! $NODE_LOGGER_GRANULARLEVELS ]; then
  export NODE_LOGGER_GRANULARLEVELS=0
fi
if [ ! $NODE_LOGGER_PLUGIN ]; then
  export NODE_LOGGER_PLUGIN='util'
fi

NBS_CURR_PROJECT_PATH=$PWD

if [ ! $NODE_LAUNCH_SCRIPT ]; then
  export NODE_LAUNCH_SCRIPT="$NBS_CURR_PROJECT_PATH/server.js"
fi

if [ ! -f "$NODE_LAUNCH_SCRIPT" ]; then
  echo "Launch script: '$NODE_LAUNCH_SCRIPT' could not be located. Aborting..."
  exit
fi

if [ ! $NODE_ENV ]; then
  export NODE_ENV=production
fi

if [ ! $NODE_CLUSTERED ]; then
  export NODE_CLUSTERED=1
fi

if [ ! $NODE_SERVE_STATIC ]; then
  export NODE_SERVE_STATIC=1
fi

if [ ! $NODE_HOT_RELOAD ]; then
  export NODE_HOT_RELOAD=0
fi

if [ !  $NODE_CONFIG_DIR ]; then
  export NODE_CONFIG_DIR="$NBS_CURR_PROJECT_PATH/config"
fi
if [ ! -d "$NODE_CONFIG_DIR" ]; then
  mkdir $NODE_CONFIG_DIR
fi

if [ ! $NODE_LOG_DIR ]; then
  export NODE_LOG_DIR="$NBS_CURR_PROJECT_PATH/logs"
fi
if [ ! -d "$NODE_LOG_DIR" ]; then
  mkdir $NODE_LOG_DIR
fi

if [ $NODE_ENV == 'development' ]; then

  # Let's make sure you have nodemon installed, if we are gonna need it:
  if [ ! `which nodemon` ]; then
    echo "ERROR: nodemon missing. Will try to install.";
    npm install nodemon -g
  fi

  nodemon -e js,coffee,jade,handlebars ${NODE_LAUNCH_SCRIPT}
else
  node ${NODE_LAUNCH_SCRIPT}
fi
