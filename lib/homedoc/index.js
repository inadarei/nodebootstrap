var router = require('express').Router({ mergeParams: true });
module.exports = router;

router.get('/', function(req, res) {

  var context = {};
  context.layout = null;

  context.title = "API Response Home Document";
  context.external_api_url = "http://api.froyo.io";

  context.base_url = require("config").app.base_url || req.protocol + "://" + req.headers.host;


  var template = __dirname + '/views/homedoc';

  res.set('Content-Type', 'application/vnd.uber+json');

  return res.status(200).render(template, context);

});
