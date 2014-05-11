require('nodebootstrap-server').setup(function(runningApp) {

  //---- Mounting well-encapsulated application modules
  //---- See: http://vimeo.com/56166857

  runningApp.use('/hello', require('./lib/hello')); // attach to sub-route
  runningApp.use(require('./lib/routes')); // attach to root route

});