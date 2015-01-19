var exports = module.exports;

var greeter   = require('../models/greeter');

exports.sayHello = function(req, res) {

  var name = req.query.name || "";

  var context = {
    siteTitle: "Node.js Bootstrap Demo Page"
  , welcomeMessage: greeter.welcomeMessage(name)
  };

  var template = __dirname + '/../views/hello';
  res.render(template, context);

  // More elaborate res.render() format:
  //res.render(template, context, function(err, html) {
  //  console.dir(err);
  //  res.send(html);
  //});

  // Just responding with a string, without any template:
  // res.send('Hello World');
};