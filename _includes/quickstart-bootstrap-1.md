
### Bootstrapping New Project

Assuming you already have node and npm installed (if not: I recommend using [nvm](https://github.com/creationix/nvm)), you can install nodebootstrap via NPM and use the nodebootstrap CLI tool to create a brand-new skeleton project.

You can replace `hello` in the installation command, with a sensible name for your project. Once the new project is built (typically takes less than a minute), you need to start it via a bash script. When the application finishes start 
 you should see a simple "hello" response at: `http://localhost:3000/hello`

You can also parametrize the response by visiting `http://localhost:3000/hello?name=yourname.`
