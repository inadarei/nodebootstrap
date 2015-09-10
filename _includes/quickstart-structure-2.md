Various parts of the project structure:

bin
: Startup scripts for dev and production environments. Feel free to create more.

config
: configuration files for various environments, set by $NODE_ENV environmental variable. default is the baseline that is inherited by all others. Don't create an explicit environment called default.

lib
: this is where various modules your application logic consists of go under. Ideally, you should design all your modules as self-contained code that could be cleanly installed and uninstalled to add/remove distinct functionality, without touching other parts of the code. Node Bootstrap goes extra mile to promote self-contained modules. Self contained modules allow higher degree of reuse.

node_modules
: this is where third-party modules installed via npm go under. Typically you install these using `npm install modulename --save` command.

public
: dedicates space for static assets (images, js, css). The benefit of this folder is that you can point a web-server (e.g. Nginx or Apache) directly to this folder and not "bother" node on serving these files.

runit
: Startup scripts for Docker-mode.

test
: This is where you put your various types of automated tests. Node Bootstrap comes fully configured for Mocha unit and integration tests and even: Casper/Phantom drivers for Mocha to write powerful acceptance tests targeted at web applications. Istanbul coverage reports and batteries included.

views
: Place to put your shared template files under. Node Bootstrap is, by default, pre-configured for Handlebars templates, but you can use any other Express4-friendly templating engine, even: alongside Handlebars, if you want. Typically templates should be encapsulated in their respective modules (which also have views folders, see the sample modules under "lib"), but in case you need to share some templates across various modules: this is where you'd do it.


&nbsp; <!-- clear element required because kramdown shits bed -->  