---
source: https://github.com/outline/outline
---
![[34380645-bd67f474-eb0b-11e7-8d03-0151c1730654.png]]

An open, extensible, wiki for your team built using React and Node.js.  
Try out Outline using our hosted version at  
[www.getoutline.com](https://www.getoutline.com/).

[![](https://camo.githubusercontent.com/179ee1caf6ee19667660f8cf7e807a7ae926815389af04c58e05e2c337fb65ff/68747470733a2f2f7777772e6765746f75746c696e652e636f6d2f696d616765732f73637265656e73686f744032782e706e67)](https://camo.githubusercontent.com/179ee1caf6ee19667660f8cf7e807a7ae926815389af04c58e05e2c337fb65ff/68747470733a2f2f7777772e6765746f75746c696e652e636f6d2f696d616765732f73637265656e73686f744032782e706e67)

![[68747470733a2f2f636972636c6563692e636f6d2f67682f6f75746c696e652f6f75746c696e652e7376673f7374796c653d736869656c6426636972636c652d746f6b656e3d63306334633266333939393065323737333835643563316165393631363963343039656238383761]]

![[68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d70726574746965722d6666363962342e7376673f7374796c653d666c6174]]

![[68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7374796c652d2546302539462539322538352532307374796c65642d2d636f6d706f6e656e74732d6f72616e67652e737667]]

![[68747470733a2f2f6261646765732e63726f7764696e2e6e65742f6f75746c696e652f6c6f63616c697a65642e737667]]

This is the source code that runs [**Outline**](https://www.getoutline.com/) and all the associated services. If you want to use Outline then you don't need to run this code, we offer a hosted version of the app at [getoutline.com](https://www.getoutline.com/).

If you'd like to run your own copy of Outline or contribute to development then this is the place for you.

# Installation

Outline requires the following dependencies:

- [Node.js](https://nodejs.org/) >= 12
- [Yarn](https://yarnpkg.com/)
- [Postgres](https://www.postgresql.org/download/) >=9.5
- [Redis](https://redis.io/) >= 4
- AWS S3 bucket or compatible API for file storage
- Slack or Google developer application for authentication

## Self-Hosted Production

### Docker

For a manual self-hosted production installation these are the recommended steps:

1. First setup Redis and Postgres servers, this is outside the scope of the guide.
    
2. Download the latest official Docker image, new releases are available around the middle of every month:
    
    `docker pull outlinewiki/outline`
    
3. Using the [.env.sample](https://github.com/outline/outline/blob/main/.env.sample) as a reference, set the required variables in your production environment. You can export the environment variables directly, or create a `.env` file and pass it to the docker image like so:
    
    `docker run --env-file=.env outlinewiki/outline`
    
4. Setup the database with `yarn sequelize:migrate`. Production assumes an SSL connection to the database by default, if Postgres is on the same machine and is not SSL you can migrate with `yarn sequelize:migrate --env=production-ssl-disabled`, for example:
    
    `docker run --rm outlinewiki/outline yarn sequelize:migrate`
    
5. Start the container:
    
    `docker run outlinewiki/outline`
    
6. Visit http://you_server_ip:3000 and you should be able to see Outline page
    
    > Port number can be changed using the PORT environment variable
    
7. (Optional) You can add an `nginx` or other reverse proxy to serve your instance of Outline for a clean URL without the port number, support SSL, etc.
    

### Terraform

Alternatively a community member maintains a script to deploy Outline on Google Cloud Platform with [Terraform & Ansible](https://github.com/rjsgn/outline-terraform-ansible).

### Upgrading

### Docker

If you're running Outline with Docker you'll need to run migrations within the docker container after updating the image. The command will be something like:

```
docker run --rm outlinewiki/outline:latest yarn sequelize:migrate
```

### Git

If you're running Outline by cloning this repository, run the following command to upgrade:

```
yarn run upgrade
```

## Local Development

For contributing features and fixes you can quickly get an environment running using Docker by following these steps:

1. Install these dependencies if you don't already have them
2. [Docker for Desktop](https://www.docker.com/)
3. [Node.js](https://nodejs.org/) (v12 LTS preferred)
4. [Yarn](https://yarnpkg.com/)
5. Clone this repo
6. Register a Slack app at [https://api.slack.com/apps](https://api.slack.com/apps)
7. Copy the file `.env.sample` to `.env`
8. Fill out the following fields:
    1. `SECRET_KEY` (follow instructions in the comments at the top of `.env`)
    2. `SLACK_KEY` (this is called "Client ID" in Slack admin)
    3. `SLACK_SECRET` (this is called "Client Secret" in Slack admin)
9. Configure your Slack app's Oauth & Permissions settings
    1. Add `http://localhost:3000/auth/slack.callback` as an Oauth redirect URL
    2. Ensure that the bot token scope contains at least `users:read`
10. Run `make up`. This will download dependencies, build and launch a development version of Outline

# Contributing

Outline is built and maintained by a small team – we'd love your help to fix bugs and add features!

Before submitting a pull request please let the core team know by creating or commenting in an issue on [GitHub](https://www.github.com/outline/outline/issues), and we'd also love to hear from you in the [Discussions](https://www.github.com/outline/outline/discussions). This way we can ensure that an approach is agreed on before code is written. This will result in a much higher liklihood of code being accepted.

If you’re looking for ways to get started, here's a list of ways to help us improve Outline:

- [Translation](https://github.com/outline/outline/blob/main/TRANSLATION.md) into other languages
- Issues with [`good first issue`](https://github.com/outline/outline/labels/good%20first%20issue) label
- Performance improvements, both on server and frontend
- Developer happiness and documentation
- Bugs and other issues listed on GitHub

## Architecture

If you're interested in contributing or learning more about the Outline codebase please refer to the [architecture document](https://github.com/outline/outline/blob/main/ARCHITECTURE.md) first for a high level overview of how the application is put together.

## Debugging

Outline uses [debug](https://www.npmjs.com/package/debug). To enable debugging output, the following categories are available:

```
DEBUG=sql,cache,presenters,events,importer,exporter,emails,mailer
```

## Tests

We aim to have sufficient test coverage for critical parts of the application and aren't aiming for 100% unit test coverage. All API endpoints and anything authentication related should be thoroughly tested.

To add new tests, write your tests with [Jest](https://facebook.github.io/jest/) and add a file with `.test.js` extension next to the tested code.

```
# To run all tests
make test

# To run backend tests in watch mode
make watch
```

Once the test database is created with `make test` you may individually run frontend and backend tests directly.

```
# To run backend tests
yarn test:server

# To run frontend tests
yarn test:app
```

## Migrations

Sequelize is used to create and run migrations, for example:

```
yarn sequelize migration:generate --name my-migration
yarn sequelize db:migrate
```

Or to run migrations on test database:

```
yarn sequelize db:migrate --env test
```

## License

Outline is [BSL 1.1 licensed](https://github.com/outline/outline/blob/main/LICENSE).