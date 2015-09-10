
To build a Docker image:

~~~~~console
> docker build -t <reponame>/<projectname> .
# for instance:
> docker build -t irakli/nodebootstrap-hello .
# to see newly minted image:
> docker images
~~~~~

To (re-)run an image once it's built:

~~~~~console
> docker run -ti -p 5000:3000 irakli/nodebootstrap-hello
~~~~~

where `5000` is the port which will be exposed to the outside world (well, Docker host) and `3000` is the port which the service is running on, inside the container.

If you need to daemonize the Docker process and (optionally) save the process ID in a shell variable:

~~~~~console
> PROC_ID=$(docker run -ti -p 5000:3000 -d irakli/nodebootstrap-hello)
~~~~~

To see running processes:

~~~~~console
> docker ps
~~~~~

To kill a daemonized process:

~~~~~console
> docker kill $PROC_ID
~~~~~