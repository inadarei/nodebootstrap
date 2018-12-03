# NodeBootstrap

[![NPM Version][npm-img]][npm-url]
[![Github Link][github-img]][github-url]
![Docker Hub Link][docker-img]
[![NodeSecurity Status][nsp-img]][nsp-url]
[![TravisCI Build Status][travis-img]][travis-url]
[![Codacy Badge][codacy-img]][codacy-url]
[![FOSSA Status][fossa-img]][fossa-url]

<!-- [![Github Link][github-img]][github-url] -->

Organize your Node project like a pro. Now supports a Microservice mode!

Right out of the gate N.B. gets a [metric] ton of boilerplate taken care of: microservice-style setup, clustering, Docker-support, database migrations, automated testing, error-handling, modularity, advanced logging, templated views, environments  – you name it. And all of that without having to deal with a heavy or an opinionated framework!

![Install Microservice](http://nodebootstrap.io/images/nodebootstrap_installv4.png)

To learn more: [http://nodebootstrap.io](http://nodebootstrap.io)

[![Join the chat at https://gitter.im/inadarei/nodebootstrap](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/inadarei/nodebootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

If you like Nodebootstrap, also check out: [Microservices Workspace](https://github.com/inadarei/microservices-workspace) project to see how you can orchestrate multilingual (polyglot) microservices setup as a holistic and simple development environment.

## Examples:

```
  # create a skeleton of a containerized microservice:
  > nodebootstrap ms-first
  # create a skeleton of an express MVC webapp:
  > nodebootstrap -m webapp nodeapp-first
  # create a skeleton of a console or client Node application
  > nodebootstrap -m cli client-first
```

## License

[MIT](LICENSE)

[github-img]: https://img.shields.io/github/stars/inadarei/nodebootstrap.svg
[github-url]: https://github.com/inadarei/nodebootstrap
[npm-img]: https://img.shields.io/npm/v/nodebootstrap.svg?style=flat
[npm-url]: https://www.npmjs.com/package/nodebootstrap
[travis-img]: https://travis-ci.org/inadarei/nodebootstrap.svg?branch=master
[travis-url]: https://travis-ci.org/inadarei/nodebootstrap
[codacy-img]: https://api.codacy.com/project/badge/Grade/41c49bb9c9384b7e8042f1e6c9645431
[codacy-url]: https://www.codacy.com/app/irakli/nodebootstrap_2?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=inadarei/nodebootstrap&amp;utm_campaign=Badge_Grade
[codeclimate-img]: https://codeclimate.com/github/inadarei/nodebootstrap/badges/gpa.svg
[codeclimate-url]: https://codeclimate.com/github/inadarei/nodebootstrap
[docker-img]: https://img.shields.io/badge/docker-ready-blue.svg
[docker-url]: https://hub.docker.com/r/irakli/nodebootstrap-hello/
[nsp-img]: https://nodesecurity.io/orgs/inadarei-public/projects/730bf3d4-b846-42f0-a184-fcf7142c65ac/badge
[nsp-url]: https://nodesecurity.io/orgs/inadarei-public/projects/730bf3d4-b846-42f0-a184-fcf7142c65ac
[fossa-img]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Finadarei%2Fnodebootstrap.svg?type=large
[fossa-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Finadarei%2Fnodebootstrap?ref=badge_large
