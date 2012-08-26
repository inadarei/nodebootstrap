// Define third-party libraries
var util = require('util')
    ,cluster = require('cluster')
    ,express = require('express')
    ,app = express()
    ,_ = require('underscore')
    ,CONF = require('config')
    ,less = require('less')
    ,hbs = require('hbs');

var pub_dir = CONF.app.pub_dir;
if (pub_dir[0] != '/') { pub_dir = '/' + pub_dir; } // humans are forgetful
pub_dir = __dirname + pub_dir;

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
  //app.use(express.responseTime());

  // This is not needed if you handle static files with, say, Nginx (recommended in production!)
  // Additionally you should probably precompile your LESS stylesheets in production
  // Last, but not least: Express' default error handler is very useful in dev, but probably not in prod.
  if ((typeof process.env['NODE_SERVE_STATIC'] !== 'undefined') && process.env['NODE_SERVE_STATIC'] == 1) {
    app.use(require('less-middleware')({ src: pub_dir }));
    app.use(express.static(pub_dir));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  }

  // Catch-all error handler. Override as you see fit
  app.use(function(err, req, res, next){
      console.error(err.stack);
      res.send(500, 'An unexpected error occurred! Please check logs.');
  });

});


//-- Routes configuration is externalized in a different module (can be multiple) for cleaner code.
    module.exports.app = app;
    require('./lib/routes');
//-- End routes configuration.

var numCPUs = require('os').cpus().length;
if (cluster.isMaster
    && ((typeof process.env['NODE_CLUSTERED'] !== 'undefined') && process.env['NODE_CLUSTERED'] == 1)) {

    util.log("Starting app in clustered mode");
    var childProcesses = [];
    // Fork as many workers as we have cpu cores.
    for (var i = 0; i < numCPUs; i++) {
        var subprocess = cluster.fork();
        childProcesses[process.pid] = subprocess;
        util.log("Started process with pid: " + subprocess.pid);
    }

    // Restart sub-process if one dies. Forever only handles master process!
    cluster.on('death', function(worker) {
        util.log('worker ' + worker.pid + ' died. Restarting new one.');
        delete childProcesses[worker.pid];

        var subprocess = cluster.fork();
        childProcesses[process.pid] = subprocess;
        util.log("Restarted process with pid: " + subprocess.pid);
    });

    // Trick suggested by Ian Young (https://github.com/isaacs/node-supervisor/issues/40#issuecomment-4330946)
    // to make cluster and supervisor play nicely together:
    if ((typeof process.env['NODE_HOT_RELOAD'] !== 'undefined') && process.env['NODE_HOT_RELOAD'] === 1) {
        var signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
        for (i in signals) {
            process.on(signals[i], function() {
                for (j in childProcesses) {
                    childProcesses[j].kill();
                }
                process.exit();
            })
        }
    }

} else {
    app.listen(CONF.app.port);
    util.log("Express server instance listening on port " + CONF.app.port);
}

