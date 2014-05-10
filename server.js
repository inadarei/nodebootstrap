require('./lib/app').setup(function(runningApp) {

  //---- Mounting application modules
  runningApp.use('/hello', require('./lib/hello')); // attach to sub-route
  runningApp.use(require('./lib/routes')); // attach to root route

});