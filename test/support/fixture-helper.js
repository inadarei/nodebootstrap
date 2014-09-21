var fixtures = require('path').join(__dirname, '../fixtures');

var fs = require('fs');

var exports = module.exports = {};

exports.loadFixture = function(name, cb) {
  var path = fixtures + "/" + name;

  fs.readFile( path, "utf8", function (err, data) {
    if (err) { cb( err, data ); return;}
    cb (null, data);
  });
};
