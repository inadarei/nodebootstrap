// Define third-party libraries
var util    = require('util')
  , cluster = require('cluster')
  , express = require('express')
  , app     = express()
  , _       = require('underscore')
  , CONF    = require('config')
  , less    = require('less')
  , log     = require('metalogger')()
  , hbs     = require('hbs');

if ('log' in CONF) {

  if ('plugin' in CONF.log) { process.env.NODE_LOGGER_PLUGIN = CONF.log.plugin; }
  if ('level'  in CONF.log) { process.env.NODE_LOGGER_LEVEL  = CONF.log.level; }

  if ('customlevels' in CONF.log) {
    for (var key in CONF.log.customlevels) {
      process.env['NODE_LOGGER_LEVEL_' + key] = CONF.log.customlevels[key];
    }
  }     
}

require('./lib/app').setup(app);

var isClusterMaster = (cluster.isMaster && (process.env.NODE_CLUSTERED == 1));

var is_http_thread = true;
if (isClusterMaster ||
    ( 'undefined' !== typeof process.env.NODE_ISNOT_HTTP_SERVER_THREAD &&
        process.env.NODE_ISNOT_HTTP_SERVER_THREAD != 'true')) {
  is_http_thread = false;
}


log.debug("is http thread? " + is_http_thread);

if (isClusterMaster) {
  require('./lib/clustering').setup();
}

if (is_http_thread) {
  app.listen(CONF.app.port);
}

// If we are not running a cluster at all:
if (!isClusterMaster && cluster.isMaster) {
  log.notice("Express server instance listening on port " + CONF.app.port);
}