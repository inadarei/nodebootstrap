var server = require('nodebootstrap-server')
  , express = require('express')
  , appConfig = require('../../appConfig');

exports.beforeEach = function(app, callback) {
  server.setupTest(app, function(app) {
    appConfig.setup(app, callback);
  });
};

exports.express = function() {
  return express();
};
