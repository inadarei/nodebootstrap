# Ubuntu-based, larger container:
# FROM node:latest

# Alpine Linux-based, tiny Node container:
FROM irakli/node-alpine:6.9.2

ENV REFRESHED_AT 2016-12-26_0402_EST

ADD ./ /opt/application
WORKDIR /opt/application

USER root

RUN adduser -s /bin/false -u 7007 -D appuser \
 && npm install -g nodemon \
 && npm install \
 && chown -R appuser /opt/application

USER appuser

EXPOSE 3000

ENV HOME_DIR=/opt/application \
    NODE_ENV=production \
    NODE_HOT_RELOAD=0 \
    NB_IS_CONTAINER=1
