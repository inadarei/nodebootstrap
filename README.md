[![GitHub Link](https://img.shields.io/github/stars/inadarei/nodebootstrap.svg?style=flat)](https://github.com/inadarei/nodebootstrap)
![npm version](https://img.shields.io/npm/v/nodebootstrap.svg?style=flat)
![build status](https://travis-ci.org/inadarei/nodebootstrap.svg?branch=master)
[![Codacy Badge](https://www.codacy.com/project/badge/41c49bb9c9384b7e8042f1e6c9645431)](https://www.codacy.com/public/irakli/nodebootstrap_2)
[![Code Climate](https://codeclimate.com/github/inadarei/nodebootstrap/badges/gpa.svg)](https://codeclimate.com/github/inadarei/nodebootstrap)

NodeBootstrap is a project skeleton for [Node.js](http://nodejs.org/)/[Express.js](http://expressjs.com)
development. It captures common best-practices, used by Node community, for project layout and setup configuration.

For demonstration purposes NodeBootstrap also packs Twitter's [Bootstrap](http://twitter.github.com/bootstrap/)
framework and shows how to manage Mustache/Handlebars-based view. It's not a mandatory part of the project.
NodeBootstrap is often used for web API projects, where there is no human-centric UI.

## Quick Start:

Assuming you already have node and npm installed (if not: 
I recommend using [nvm](https://github.com/creationix/nvm)), run
following commands to bootstrap a new Node/Express project:

```console
$ npm install nodebootstrap -g
$ nodebootstrap build hello
```

You can replace `hello` in the above example with a sensible name for your project. Once the project is built, start the application by:

```console
$ cd hello
$ ./bin/dev_start.sh
```

and you should see a simple "hello" response at:

```
http://localhost:3000/hello
```

You can also customize it by visiting `http://localhost:3000/hello?name=yourname`, but really
what you should probably do instead is — dive into the code and see how everything is put together.

## Encapsulated Components

In addition to solving common boilerplate, central design principle of NodeBootstrap is to compose applications with
re-usable, fully encapsulated, targeted set of modules.

[TJ Holowaychuk](https://twitter.com/tjholowaychuk) explains this approach in a video screencast:
<http://vimeo.com/56166857>

In a more "spaghetti" Node project you may see HTTP route handlers in the main script or application area, tangled
together. What TJ argues for and NodeBootstrap implements is: letting each module declare their own handlers, so if you are installing
a "user management" or "blog" module, all you need to do is NPM install that module and indicate from the main app where
in the URL path the routes get attached. Compare this, in your main server.js file:

```javascript
app.use('/users', require('./lib/user')); // attach to sub-route
```

to this:

```javascript
app.get('/user', user.get);
app.post('/user', user.new);
app.delete('/user', user.remove);
...
app.get('/users/locations', user.getLocations);
app.post('/users/photos', user.getAvatars);
```

First is how NodeBootstrap handles things, the latter: what you may, alas, see in many projects that don't use
elegant componentization similar to NodeBootstrap style.

Feel free to check-out more details about module design per NodeBootstrap in the source code of the
sample module: <https://github.com/inadarei/nodebootstrap/tree/master/lib/hello>


## Shell Scripts

NodeBootstrap comes with three shell scripts (located in the `bin` folder):

* dev_start.sh will start your server.js node app in single-CPU mode with hot-realoading of code enabled. Convenient for
active development.
* start.sh will start your server.js without hot-reloading, but with as many child processes as you have CPU cores.
Recommended for production.
* stop.sh is a counterpart of start.sh to easily stop running background processes.

By default, dev_start.sh also lets Express.js handle static files so you don't have to have a web server. The production
version: start.sh assumes that you want your web-server (Nginx?) to take on this job.

## Contextualizing Runtime Environment

Following environmental variables can affect the runtime behavior and startup mode:

* NODE_LAUNCH_SCRIPT - defaults to "server.js"
* NODE_ENV - defaults to "production"
* NODE_CLUSTERED - defaults to 1 (on)
* NODE_HOT_RELOAD - defaults to 0 (off)
* NODE_SERVE_STATIC - defaults to 0 (off) - in production you should serve static content with NginX, not: Node.
* NODE_CONFIG_DIR - defaults to "config" folder in the current folder
* NODE_LOG_DIR - defaults to "logs" folder in the current folder

## Customization:

It's not a bad idea to use more expressive name than default server.js for your main script. If you run multiple 
scripts on the server it can really help differentiate between various forever or "ps" processes. However, if you
do rename server.js, please make sure to also update corresponding lines in start.sh script.

Most of the launch logic is located in start.sh. By looking at dev_start.sh you can see that it is just altering
some environmental variables. Following this pattern you can easily create launch scripts for other environments
e.g. stage_start.sh, if needed.

## Hot Reloading vs. Daemon-izing Script.

In production environments it is a good idea to daemon-ize your Node process using Forever.js. Forever will restart
the process if it accidentally crashes.

In development, it is much more important to have "hot-reloading" of code available. This feature can be provided
with Supervisor.js package. If you set NODE_HOT_RELOAD to 1, start.sh will run in hot-reloading mode watching your
main script, libs folder and config folder.

Unfortunately, Supervisor and Forever packages do not work nicely with each other, so you can only use one
or the other, at this point. Setting NODE_HOT_RELOAD to 1 disables backgrounding of your script and runs your Node
application in foreground (which, to be fair, in most cases, is what you probably want during development, anyway).

## File Limits

Hot reloading uses native file watching features of *nix systems. This is extremely handy and efficient, but 
unfortunately most systems have very low limits on watched and open files. If you use hot reloading a lot, you should
expect to see: "Error: watch EMFILE" or similar.

To solve the problem you need to raise your filesystem limits. This may be a two-step process. On Linux, there're hard
limits (something root user can change in /etc/limits.conf or /ets/security/limits.conf) that govern the limits individual
users can alter from command-line.

Put something like this (as root) in your /etc/limits.conf or /etc/security/limits.conf:

```bash
* hard nofile 10000
```

Then log out, log back in and run:

```bash
> ulimit -n 10000
```

You should probably put `ulimit -n 10000` in your .profile file, because it does not persist between restarts.

For OS-X and Solaris-specific instructions see [a Stackoverflow Answer](http://stackoverflow.com/questions/34588/how-do-i-change-the-number-of-open-files-limit-in-linux/34645#34645)

On certain Linux distributions you may also need to raise iNotify limit:

```bash
sysctl fs.inotify.max_user_instances=16384 && echo sysctl fs.inotify.max_user_instances=16384  | sudo tee /etc/rc.local  
```

And last, but not least, it's a good idea to also run:

```bash
> sudo sysctl -w kern.maxfiles=40960 kern.maxfilesperproc=20480
```

## Compatibility

We try to keep Node Bootstrap updated with the latest versions of Node, Express and Bootstrap. In some cases, where it
makes sense, branches compatible with older versions are created: <https://github.com/inadarei/nodebootstrap/branches> to
make upgrade path smoother.

## License

(The MIT License)

Copyright (c) 2012-2015 Irakli Nadareishvili [@inadarei](http://twitter.com/inadarei)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
