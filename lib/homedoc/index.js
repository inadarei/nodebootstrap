var router = require('express').Router({ mergeParams: true });
module.exports = router;

var bodyParser = require('body-parser');

// parse application/anything+json
// router.use(bodyParser.json({ type: 'application/*+json' }))

router.get('/', function(req, res) {

  var context = {};
  context.layout = null;

  context.title = "API Response Home Document";
  context.base_url = "http://api.froyo.io";

  var template = __dirname + '/views/homedoc';

  res.set('Content-Type', 'application/vnd.uber+json');

  return res.status(200).render(template, context);

});