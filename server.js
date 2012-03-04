// Define third-party libraries
var cluster = require('cluster')
    ,express = require('express')
    ,app = express.createServer()
    ,_ = require('underscore')
    ,CONF = require('config')
    ,handlebars = require('handlebars');

// Local includes
var mod_hello = require('./lib/hello');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
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
