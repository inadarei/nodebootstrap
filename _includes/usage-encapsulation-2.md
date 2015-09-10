
Compare this, in your main server.js file:

~~~~~
app.use('/users', require('./lib/user')); // attach to sub-route
~~~~~

to this:

~~~~~
app.get('/user', user.get);
app.post('/user', user.new);
app.delete('/user', user.remove);
...
app.get('/users/locations', user.getLocations);
app.post('/users/photos', user.getAvatars);
~~~~~

First is how NodeBootstrap handles things, the latter: what you may, alas, see in many projects that don't use
elegant componentization similar to NodeBootstrap style.