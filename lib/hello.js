if (!module.parent) { console.log("Please don't call me directly. I am just the main app's minion."); process.exit(1); }

// Third-party libraries
var _ = require('underscore')
    ,CONF = require('config');

// Note: if you need to access smth in parent:
// var something = module.parent.exports.something

var mod_hello = module.exports;

mod_hello.root = function(req, res) {

  var name = req.param('name', 'stranger');

  var context = {
    site_title: "Node.js Bootstrap Demo Page"
    ,name: name
  }

  res.render('hello_index', context);

  // More elaborate res.render() format:
  //res.render('hello_index', context, function(err, html) {
  //  console.dir(err);
  //  res.send(html);
  //});

  // Just responding with a string, without any template:
  //res.send('Hello World');
};
