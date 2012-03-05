Node Bootstrap is a project skeleton for [Node.js](http://nodejs.org/) 6.x development with Twitter's [Bootstrap](http://twitter.github.com/bootstrap/) (no pun intended)
framework.

Project skeleton provides: common node.js webapp layout for responsive web development, suggests some common Node
modules and best-practices, as well as provides two convenient shell scripts:

* start_dev.sh will start your server.js node app in single-CPU mode with hot-realoading of code enabled.
* start.sh will start your server.js without hot-reloading, but with as many child processes as you have CPU cores.

By default, start_dev.sh also lets Express.js handle static files so you don't have to have a web server. The production
version: start.sh assumes you want your web-server (Nginx?) to take on this job.

Project is still in its infancy. Please use issue queue to submit any bug fixes or suggestions.

## Quick Test:

Assuming you already have node and npm installed (If not: 
[this blog post](http://freshblurbs.com/install-node-js-and-express-js-nginx-debian-lenny) can help on Debian/Ubuntu
and you can figure out similar steps, with the help of [HomeBrew](http://mxcl.github.com/homebrew/) on Mac):

    > npm install
    > chmod u+x start_dev.sh
    > ./start_dev.sh

You should see a simple "hello" at: http://localhost:9000/hello. 
You can customize it by visting http://localhost:9000/hello?name=yourname but really what you should probably do
instead is dive into the code and see how it is put together.


## License

(The MIT License)

Copyright (c) 2012 Irakli Nadareishvili

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
