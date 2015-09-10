
### Encapsulated Modules

In addition to solving common boilerplate, central design principle of NodeBootstrap is to compose applications with
re-usable, fully encapsulated, targeted set of modules.

[TJ Holowaychuk](https://twitter.com/tjholowaychuk) explains this approach in a video screencast:
<http://vimeo.com/56166857>

In a more "spaghetti" Node project you may see HTTP route handlers in the main script or application area, tangled
together. What TJ argues for and NodeBootstrap implements is: letting each module declare their own handlers, so if you are installing a "user management" or "blog" module, all you need to do is NPM install that module and indicate from the main app where in the URL path the routes get attached.

Feel free to check-out more details about module design per NodeBootstrap in the source code of the
sample module: <https://github.com/inadarei/nodebootstrap/tree/master/lib/hello>
