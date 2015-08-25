var app = module.exports = module.parent.exports.setAppDefaults();

app.get('/', function(req, res) {

  var context = {};
  context.layout = null;

  context.title = "API Response Home Document";

  var template = __dirname + '/views/homedoc';

  res.set('Content-Type', 'application/vnd.uber+json');
  
  return res.status(200).render(template, context);

});