
Installing nodebootstrap and building a new project: 

~~~~~~~~ bash
$ npm install nodebootstrap -g
$ # if  you want a blueprint for a Node microservice with Docker:
$ nodebootstrap ms-first-microservice
$ # of if you are building a simple web application:
$ nodebootstrap hello -m webapp
$ # If you're building just an API 
$ # if you want to customize destination location:
$ nodebootstrap best-api -p ~/projects/bestapi -m api
~~~~~~~~

Once the project is built, you will get instructions on how to start it.

Webapp and API modes can run using a node environment on your computer or in a
Docker container. Microservice mode only works in a container (intentionally).

IF you do not have Docker and Docker Composer properly set up, on your machine,
for Mac and Windows the easiest way is to use Docker tooling:
https://www.docker.com/community-edition and you can instal Docker on Linux
natively via public repositories, even more easily. 
