var server = require('nodebootstrap-server');

server.setup(function(runningApp) {

  // runningApp.use(require('express-session')({secret: CONF.app.cookie_secret, resave: false, saveUninitialized: false}));

  // Choose your favorite view engine(s)
  runningApp.set('view engine', 'handlebars');
  runningApp.engine('handlebars', require('hbs').__express);

  //// you could use two view engines in parallel (if you are brave):  
  // runningApp.set('view engine', 'j2');
  // runningApp.engine('j2', require('swig').renderFile);


  //---- Mounting well-encapsulated application modules (so-called: "mini-apps")
  //---- See: http://expressjs.com/guide/routing.html and http://vimeo.com/56166857
  runningApp.use('/hello', require('hello')); // attach to sub-route

  // API endpoint attached to root route:
  runningApp.use('/', require('homedoc')); // attach to root route

  // If you need websockets:
  // var socketio = require('socket.io')(runningApp.http);
  // require('fauxchatapp')(socketio);

  // Catch-all error handler.
  // runningApp.use(require('errorhandler')({ dumpExceptions: true, showStack: true }));
  // Write your own if you need such thing. @see: http://expressjs.com/guide/error-handling.html
  // runningApp.use(function(err, req, res, next) {
  //   logic
  // });



});
