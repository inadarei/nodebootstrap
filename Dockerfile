FROM irakli/nodejs:latest

# Set correct environment variables.
# ENV HOME /opt/application
VOLUME /opt/application

ENV REFRESHED_AT 2015-10-22-15_31

COPY runit /etc/service/node-app
RUN chmod -R 755 /etc/service/node-app
RUN npm install -g supervisor

ONBUILD ADD ./ /opt/application
ONBUILD WORKDIR /opt/application
ONBUILD RUN npm install

EXPOSE 3000

ENV NODE_PATH="/opt/application/lib" \
    NODE_CONFIG_DISABLE_FILE_WATCH="Y" \
    NODE_LOGGER_LEVEL="warning" \ 
    NODE_LOGGER_GRANULARLEVELS=0 \
    NODE_LOGGER_PLUGIN="util" \
    NODE_LAUNCH_SCRIPT="/opt/application/server.js" \
    NODE_ENV=development \
    NODE_CLUSTERED=1 \
    NODE_SERVE_STATIC=1 \
    NODE_HOT_RELOAD=1 \
    NODE_CONFIG_DIR="/opt/application/config" \
    NODE_LOG_DIR=/opt/application/logs"
    
# Clean up
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
