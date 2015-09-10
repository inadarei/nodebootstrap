
### Startup Scripts

NodeBootstrap comes with three shell scripts (located in the `bin` folder):

dev_start.sh 
: will start your server.js node app in single-CPU mode with hot-realoading of code enabled. Convenient for
active development.

start.sh 
: will start your server.js without hot-reloading, but with as many child processes as you have CPU cores.
Recommended for production.

stop.sh 
: is a counterpart of start.sh to easily stop running background processes.

By default, dev_start.sh also lets Express.js handle static files so you don't have to have a web server. The production
version: start.sh assumes that you want your web-server (Nginx?) to take on this job.