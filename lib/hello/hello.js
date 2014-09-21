/**
* This is a self-contained module that defines its routes, callbacks, models and views
* all internally. Such approach to code organization follows the recommendations of TJ:
*
* http://vimeo.com/56166857
* 
*/

// Third-party libraries
var _ = require('underscore')
  , express = require('express')
  , exports = module.exports = express()
  , app = exports;

// Don't just use, but also export in case another module needs to use these as well.
exports.callbacks    = require('./controllers/hello');
exports.models       = require('./models'); 

//-- For increased module encapsulation, you could also serve templates with module-local 
//-- paths, but using shared layouts and partials may become tricky
//var hbs = require('hbs');
//app.set('views', __dirname + '/views');
//app.set('view engine', 'handlebars');
//app.engine('handlebars', hbs.__express);

// Module's Routes. Please note this is actually under /hello, because module is attached under /hello
app.get('/', exports.callbacks.sayHello);
