var express   = require('express')
    , log     = require('metalogger')()
    , hbs     = require('hbs')
    , CONF    = require('config');

exports = module.exports;

exports.setup = function(app) {
  /**
   * All environments
   */
  app.configure(function globalConfiguration() {

    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');
    app.engine('handlebars', hbs.__express);

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.query());
    app.use(express.cookieParser(CONF.app.cookie_secret));
    app.use(express.session());
    app.use(app.router);
    //app.use(express.responseTime());

    // This is not needed if you handle static files with, say, Nginx (recommended in production!)
    // Additionally you should probably pre-compile your LESS stylesheets in production
    // Last, but not least: Express' default error handler is very useful in dev, but probably not in prod.
    if (('NODE_SERVE_STATIC' in process.env) && process.env['NODE_SERVE_STATIC'] == 1) {

      var pub_dir = CONF.app.pub_dir;
      if (pub_dir[0] != '/') { pub_dir = '/' + pub_dir; } // humans are forgetful
      pub_dir = __dirname + pub_dir;

      app.use(require('less-middleware')({ src: pub_dir }));
      app.use(express.static(pub_dir));
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    }

    // Catch-all error handler. Override as you see fit
    app.use(function catchAllErrorHandler(err, req, res, next){
      log.error(err);
      log.error(err.stack);
      if(typeof err.body === "string" && err.status === 400) {
        var message = {error: "Invalid JSON", body: err.body};
        res.send(err.status, message);
      } else {
        res.type('text/html');
        res.send(500, 'An unexpected error occurred! Please check logs.');
      }
    });
  });

//---- INTERNAL MODULES
  app.use('/hello', require('../hello')); // attach to sub-route
  app.use(require('../routes')); // attach to root route

//--- End of Internal modules

};
