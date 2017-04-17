
### Docker Support

Docker containers are an extremely convenient way of pre-packaging complex
applications for easy installation on large number of hosting providers and
systems.

Nodebootstrap comes with Docker batteries included. As soon as you create a new
project you can launch it in a container, given that you have Docker tooling on
your machine. If you installation steps looked like the following:

~~~~ bash
> nodebootstrap build firstapp
~~~~

You can easily launch the app in dev mode (hot-reloading enable) with:

~~~~ bash
> cd firstapp
> npm run docker-dev
~~~~

After which you can access your app at: `http://<docker-host>:5000/`

Where `<docker-host>` may either be 127.0.0.1 or whatever the IP of
your Docker Machine happens to be (e.g. on Mac and Windows). If you
need to find it, run: `docker-machine ls` and write-down the IP in
the URL column.

Please note: even if you are using Docker Machine, you will be able to 
edit project files locally. And since hot-reloading is enabled in dev
mode, changes will be immediately reflected.

Once you are ready to deploy your application in production, you can
do it using a different npm script:

~~~~ bash
> npm run docker-start
~~~~

The difference, in production mode is that: hot reloading is disabled. Also,
the port which the service starts on is "random" (please ignore the service
reporting port 3000) – Docker will assign first available port. This is 
highly recommended behavior in production environments, to ensure that
various services won't accidentally try to bind to the same port. In order
to discover the current port, most people use a service discovery such as:
Consul or etcd.

There are other useful scripts coded as npm scripts that you will need when
using NodeBootstrap in Docker:

~~~~ bash
> npm run docker-test
~~~~

will run automated tests inside the container.

Likewise, if you need to install an NPM package, you should not just issue "npm install"
but should rather run a command such as: 

~~~~ bash
> npm run docker-install-package lodash
~~~~

This way module will be built inside the container, not on your host and that can make
a huge difference for modules with native bindings (but may not matter as much for
pure-JS modules).

By default, container uses Alpine Linux-based Node distribution, to minimize
the container size. If you need full power of Ubuntu, edit Dockerfile
in the project root and change the commented-out line accordingly.
