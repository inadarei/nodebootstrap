Node Bootstrap is a project skeleton for [Node.js](http://nodejs.org/) 0.8.x+ and [Express.js](http://expressjs.com)
development with Twitter's [Bootstrap](http://twitter.github.com/bootstrap/) (no pun intended) framework.

Project skeleton provides: common node.js webapp layout for responsive web development, suggests some common Node
modules and best-practices, as well as provides two convenient shell scripts:

* dev_start.sh will start your server.js node app in single-CPU mode with hot-realoading of code enabled.
* start.sh will start your server.js without hot-reloading, but with as many child processes as you have CPU cores.

By default, dev_start.sh also lets Express.js handle static files so you don't have to have a web server. The production
version: start.sh assumes you want your web-server (Nginx?) to take on this job.

## Compatibility

We try to keep Node Bootstrap updated with the latest versions of Node, Express and Bootstrap. In some cases, where it
makes sense, branches compatible with older versions are created: https://github.com/inadarei/nodebootstrap/branches to
make upgrade path a little smoother.

## Quick Test:

Assuming you already have node and npm installed (If not: 
[this blog post](http://freshblurbs.com/install-node-js-and-express-js-nginx-debian-lenny) can help on Debian/Ubuntu
and you can figure out similar steps, with the help of [HomeBrew](http://mxcl.github.com/homebrew/) on Mac):

    > npm install supervisor -g
    > npm install
    > chmod u+x dev_start.sh
    > ./dev_start.sh

You should see a simple "hello" at: http://localhost:3000/hello.
You can customize it by visiting http://localhost:3000/hello?name=yourname but really what you should probably do
instead is dive into the code and see how it is put together.

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

## License

(The MIT License)

Copyright (c) 2012 Irakli Nadareishvili [@inadarei](http://twitter.com/inadarei)

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
