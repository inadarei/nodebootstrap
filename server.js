// @see: https://gist.github.com/branneman/8048520
require('app-module-path').addPath(__dirname + '/lib');



var server = require('nodebootstrap-server');

var home = require('')

server.setup(function(runningApp) {

  // runningApp.use(require('express-session')({secret: CONF.app.cookie_secret, resave: false, saveUninitialized: false}));

  // Nothing ever comes from "x-powered-by", but a security hole
  runningApp.disable("x-powered-by");
  
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
