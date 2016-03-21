
Installing nodebootstrap and building a new project: 

~~~~~~~~ bash
$ npm install nodebootstrap -g
$ # If you are building a simple web application:
$ nodebootstrap build hello
$ # If you're building just an API 
$ # and/or want to customize destination location:
$ nodebootstrap build best-api -p ~/projects/bestapi --api
~~~~~~~~

Once the project is built, you can start the application in dev-mode:

~~~~ bash
$ cd hello
$ npm run dev
~~~~

or for "production-mode":

~~~~ bash
$ cd hello
$ npm start
~~~~

Dev mode provides hot reloading of code, which shouldn't be required in production mode. In production, you should also make sure that `npm start` is ran by some process manager (e.g. Upstart) to ensure your Node app start on system startup and gets restarted in case the process crashes for whatever reason. Depending on your needs, how you facilitate this in production can vary greatly, so NodeBootstrap lets you make those decisions, getting out of your way.

You can also [start the app as a Docker container](/documentation.html#docker-support), if you have Docker and Docker Composer properly set up, on your machine. [Installing them on Linux](https://docs.docker.com/linux/step_one/) should be trivial. On Windows and Mac, the easiest and the recommended way to get Docker tools installed is: [via Docker Toolbox](https://www.docker.com/products/docker-toolbox).
