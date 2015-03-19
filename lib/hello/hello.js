/**
* This is a self-contained module that defines its routes, callbacks, models and views
* all internally. Such approach to code organization follows the recommendations of TJ:
*
* http://vimeo.com/56166857
* 
*/

var app = module.exports = module.parent.exports.setAppDefaults();

// Don't just use, but also export in case another module needs to use these as well.
app.callbacks    = require('./controllers/hello');
app.models       = require('./models'); 

//-- For increased module encapsulation, you could also serve templates with module-local 
//-- paths, but using shared layouts and partials may become tricky
//var hbs = require('hbs');
//app.set('views', __dirname + '/views');
//app.set('view engine', 'handlebars');
//app.engine('handlebars', hbs.__express);

// Module's Routes. Please note this is actually under /hello, because module is attached under /hello
app.get('/', app.callbacks.sayHello);
