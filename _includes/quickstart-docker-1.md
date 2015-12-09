
### Docker Support

Docker containers are an extremely convenient way of pre-packaging complex applications for easy installation on large number of hosting providers and systems.

Nodebootstrap comes with Docker batteries included. As soon as you create a new project you can launch it in a container, given that you have Docker tooling on your machine. If you installation steps looked like the following:

~~~~ bash
> nodebootstrap build firstapp
~~~~

You can easily launch the app with:

~~~~ bash
> cd firstapp
> docker-compose up -d
~~~~

After which you can access your app at: `http://<docker-host>:5000/`

Where `<docker-host>` may either be 127.0.0.1 or whatever the IP of
your Docker Machine happens to be (e.g. on Mac and Windows).

Even if you are using Docker Machine, you will be able to edit project 
files locally. Hot realoading is enabled.

By default, container uses Alpine Linux-based Node distribution, to minimize
the container size. If you need full power of Ubuntu, edit Dockerfile
in the project root and change the commented-out line accordingly.
