#!/bin/bash -e
# Tool that makes it easy to publish and npm install
# This is mostly necessary because we keep CLI and Skeleton code in one repo (which is handy otherwise).
###############################################################################

set -e          # exit on command errors (MUST handle exit codes properly!)
set -E          # pass trap handlers down to subshells
set -o pipefail # capture fail exit codes in piped commands
#set -x         # execution tracing debug messages

VERSION=0.1.0
PROGNAME=butler

# Show help function to be used below
show_help() {
	echo "Usage: $PROGNAME <command>"
    echo ""
    echo "       where <command> is one of:"
    echo "            publish  - publishes nodebootstrap to npm registry"
    echo "            devbuild - npm installs skeleton's package.json for local development"
    echo " "
}

# --- Options processing -------------------------------------------
if [ $# == 0 ] ; then
    show_help;
    exit 1;
fi

while getopts ":vh" optname
  do
    case "$optname" in
      "v")
        echo "$PROGNAME version $VERSION"
        exit 0;
        ;;
      "h")
        show_help;
        exit 0;
        ;;
      *)
        echo "Unrecognized parameter"
        exit 1;
        ;;
    esac
  done

shift $(($OPTIND - 1))
cmd=$1;

case "$cmd" in
  "publish")
    echo "publishing..."
    rm -rf node_modules && cp package.json.cli package.json && npm publish && rm package.json
    exit 0;
    ;;
  "devbuild")
    echo "building dev setup..."
    rm -rf node_modules && cp package.json.skeleton package.json && npm install && rm package.json
    rm -rf bin/node_modules && cp package.json.cli bin/package.json && cd bin && npm install && rm package.json && cd ..
    exit 0;
    ;;
  *)
    echo "Unrecognized command(s)"
    exit 1;
    ;;
esac
