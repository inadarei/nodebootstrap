# Ubuntu-based, larger container:
# FROM irakli/nodejs:latest

# Alpine Linux-based, tiny Node container:
FROM irakli/node-alpine:4.3-runit


ENV REFRESHED_AT 2016-02-15_1044_EST

ADD ./ /opt/application
WORKDIR /opt/application
RUN npm install

COPY runit /etc/service/node-app
RUN chmod -R 755 /etc/service/node-app
RUN npm install -g nodemon

EXPOSE 3000


# In dev we will always be using docker-compose anyway so values there will override the ENV values in Dockerfile.
# By having Dockerfile values be sensible production values, you can easily run the
# container in prod, without using docker-compose (which is nice)
ENV HOME_DIR=/opt/application \
    NODE_CONFIG_DISABLE_FILE_WATCH=Y \
    NODE_LOGGER_LEVEL=warning \
    NODE_LOGGER_GRANULARLEVELS=0 \
    NODE_LOGGER_PLUGIN=util \
    NODE_ENV=production \
    NODE_HOT_RELOAD=1 \
    NODE_CONFIG_DIR=/opt/application/config \
    NODE_LOG_DIR=/opt/application/logs

# Clean up. Un-comment if using Ubuntu variant
# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

CMD ["/sbin/runit_init"]
