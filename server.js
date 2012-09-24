// Define third-party libraries
var util = require('util')
  , cluster = require('cluster')
  , express = require('express')
  , app = express()
  , _ = require('underscore')
  , CONF = require('config')
  , less = require('less')
  , hbs = require('hbs');

var pub_dir = CONF.app.pub_dir;
if (pub_dir[0] != '/') { pub_dir = '/' + pub_dir; } // humans are forgetful
pub_dir = __dirname + pub_dir;

/**
 * All environments
 */
app.configure(function() {

  app.set('views', __dirname + '/views');

  app.set('view engine', 'handlebars');
  app.engine('handlebars', require('hbs').__express);

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.query());
  app.use(express.cookieParser(CONF.app.cookie_secret));
  app.use(express.session());
  app.use(app.router);

  // Catch-all error handler. Override as you see fit
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'An unexpected error occurred! Please check logs.');
  });
});

/**
 * Setup for development environments
 */
app.configure('development',function(){
  app.use(require('less-middleware')({src: pub_dir}));
  app.use(express.static(pub_dir));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


//-- Routes configuration is externalized in a different module (can be multiple) for cleaner code.
  module.exports.app = app;
  require('./lib/routes');
//-- End routes configuration.

var numCPUs = require('os').cpus().length;
if (cluster.isMaster
    && (process.env.NODE_CLUSTERED === 1)) {

  util.log("Starting app in clustered mode");
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', function(worker) {
    util.log('Forking worker #', worker.id);
    timeouts[worker.id] = setTimeout(errorMsg, 2000);
  });
  cluster.on('listening', function(worker, address) {
    util.log('Worker #'+worker.id+' listening on port: ' + address.port);
    clearTimeout(timeouts[worker.id]);
  });
  cluster.on('online', function(worker) {
    util.log('Worker #'+worker.id+' is online');
  });
  cluster.on('exit', function(worker, code, signal) {
    util.error(['The worker #'+worker.id+' has exited with exitCode ' + worker.process.exitCode]);
    clearTimeout(timeouts[worker.id]);
    // Don't try to restart the workers when disconnect or destroy has been called
    if(worker.suicide !== true) {
      util.debug('Worker #' + worker.id + ' did not commit suicide, restarting');
      cluster.fork();
    }
  });
  cluster.on('disconnect', function(worker) {
    util.debug('The worker #' + worker.id + ' has disconnected');
  });

  function errorMsg() {
    util.error(['Worker taking to long to start']);
  }

  // Trick suggested by Ian Young (https://github.com/isaacs/node-supervisor/issues/40#issuecomment-4330946)
  // to make cluster and supervisor play nicely together:
  if (process.env.NODE_HOT_RELOAD === 1) {
    var signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    _.each(signals, function(signal){
      process.on(signal, function(){
        _.each(cluster.workers, function(worker){
          worker.destroy();
        })
      })
    })
  }
} else {
  app.listen(CONF.app.port);
  util.log("Express server instance listening on port " + CONF.app.port);
}
