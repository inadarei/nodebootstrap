
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
