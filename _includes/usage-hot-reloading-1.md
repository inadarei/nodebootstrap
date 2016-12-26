
### Hot Reloading vs. Daemon-izing Script.

In production environments it is a good idea to daemon-ize your Node process using so that it restarts if the 
process gets killed or crashes for some reason Nodemon. In non-Docker version Nodemon package is used for this
purpose. In Docker version of NodeBootstrap installation runit manages the same.

While actively developing a project, it is very convenient to have “hot-reloading” of code available i.e. to have 
Node processes automatically restart themselves when you save a source file. If you set NODE_HOT_RELOAD to 1, 
start.sh will run in hot-reloading mode watching your: main script, as well as libs and config folders.
