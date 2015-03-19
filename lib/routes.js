/**
* This is a file where you can define various routes globally. It's better than
* defining those in server.js, but ideally you should be defining routes as part of
* modules. @see example "hello" module to get a taste of how this works.
*/

var app = module.exports = module.parent.exports.setAppDefaults();

// Local includes
var modHello = require('./hello');

/** Global ROUTES **/
app.get('/globalhello', modHello.callbacks.sayHello);
