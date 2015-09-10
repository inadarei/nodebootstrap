
### Hot Reloading vs. Daemon-izing Script.

In production environments it is a good idea to daemon-ize your Node process using Forever.js. Forever will restart
the process if it accidentally crashes.

In development, it is much more important to have "hot-reloading" of code available. This feature can be provided
with Supervisor.js package. If you set NODE_HOT_RELOAD to 1, start.sh will run in hot-reloading mode watching your
main script, libs folder and config folder.

Unfortunately, Supervisor and Forever packages do not work nicely with each other, so you can only use one
or the other, at this point. Setting NODE_HOT_RELOAD to 1 disables backgrounding of your script and runs your Node
application in foreground (which, to be fair, in most cases, is what you probably want during development, anyway).