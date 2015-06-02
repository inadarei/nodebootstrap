# Written after: https://github.com/phusion/passenger-docker

FROM phusion/passenger-nodejs:latest

# Set correct environment variables.
ENV HOME /opt/application

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

COPY ./ /opt/application

COPY runit /etc/service/node-app
RUN chmod -R 755 /etc/service/node-app

EXPOSE 3000

ENV NODE_PATH="/opt/application/lib" \
    NODE_CONFIG_DISABLE_FILE_WATCH="Y" \
    NODE_LOGGER_LEVEL="warning" \ 
    NODE_LOGGER_GRANULARLEVELS=0 \
    NODE_LOGGER_PLUGIN="util" \
    NODE_LAUNCH_SCRIPT="/opt/application/server.js" \
    NODE_ENV=production \
    NODE_CLUSTERED=1 \
    NODE_SERVE_STATIC=1 \
    NODE_HOT_RELOAD=0 \
    NODE_CONFIG_DIR="/opt/application/config" \
    NODE_LOG_DIR=/opt/application/logs"


# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
