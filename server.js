// Define third-party libraries
var cluster = require('cluster')
    ,express = require('express')
    ,app = express.createServer()
    ,_ = require('underscore')
    ,CONF = require('config')
    ,less = require('less')
    ,handlebars = require('handlebars');

// Local includes
var mod_hello = require('./lib/hello');

var pub_dir = CONF.app.pub_dir;
if (pub_dir[0] != '/') { pub_dir = '/' + pub_dir; } // humans are forgetful
pub_dir = __dirname + pub_dir;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // This is not needed if you handle static with, say, Nginx (recommended in production!)
  // Additionally you should probably precompile your LESS stylesheets in production
  if ((typeof process.env['NODE_SERVE_STATIC'] != 'undefined') && process.env['NODE_SERVE_STATIC'] == 1) {
    app.use(express.static(pub_dir));
    app.use(express.compiler({ src: pub_dir, enable: ['less'] }));
  }
});



//-- Routes configuration.
app.get('/hello', mod_hello.root);

var numCPUs = require('os').cpus().length;
if (cluster.isMaster
    && ((typeof process.env['NODE_NOT_CLUSTERED'] == 'undefined') || process.env['NODE_NOT_CLUSTERED'] == 0)) {

  // Fork as many workers as we have cpu cores.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
  app.listen(CONF.app.port);
  console.log("Express server instance listening on port %d", CONF.app.port);
}
