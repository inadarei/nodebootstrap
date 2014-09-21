var util = require('util');

function Greeter() {}

Greeter.prototype.welcomeMessage = function(argName) {
  var name = argName || "Stranger";
  return util.format('Hello %s! Welcome to NodeBootstrap!', name);  
};

// Typical CRUD

Greeter.prototype.find = function(id) {
  // @TODO
};

Greeter.prototype.save = function() {
  // @TODO
};

Greeter.prototype.delete = function() {
  // @TODO
};

module.exports = new Greeter();