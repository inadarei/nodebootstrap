if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

var app = module.parent.exports.app;

// Local includes
var mod_hello = require('./hello');


/** ROUTES **/
app.get('/hello', mod_hello.root);