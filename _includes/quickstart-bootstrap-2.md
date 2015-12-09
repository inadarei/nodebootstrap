
Installing nodebootstrap and building a new project: 

~~~~~~~~ bash
$ npm install nodebootstrap -g
$ nodebootstrap build hello
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

Dev mode provides hot reloading of code, whereas production mode keeps your Node process up, even if it crashes (restarts).

You can also [start the app as a Docker container](/documentation.html#docker-support), if you have Docker and Docker Composer properly set up, on your machine. [Installing them on Linux](https://docs.docker.com/linux/step_one/) should be trivial. On Windows and Mac, the easiest way to get Docker tools installed is: [via Docker Machine](https://docs.docker.com/machine/).
