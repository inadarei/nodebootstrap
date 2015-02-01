var server = require('nodebootstrap-server');

server.setup(function(runningApp) {
  
  // runningApp.use(require('express-session')({secret: CONF.app.cookie_secret, resave: false, saveUninitialized: false}));
  
  //---- Mounting well-encapsulated application modules
  //---- See: http://vimeo.com/56166857

  runningApp.use('/hello', require('hello')); // attach to sub-route
  runningApp.use(require('routes')); // attach to root route
  
});