### Title

  <p align="center"> Notification API in NestJs with Mongoose (with strategy design pattern and unit tests)
</p>
## Description

This is a sample NESTJS project where the NESTJS Application is Dockerized with a local dockerized MongoDB. It uses a notification module with notification strategies based on the notification type. It also uses mocking in all jest tests for every file.

## Prerequisites

1. Docker
   [Install docker here] (https://docs.docker.com/engine/install/)
2. Nvm (we are using version 16)
   $nvm use 16

## Installation

```bash
$ npm install
```

## Running the app

$ docker-compose up

The docker-compose is already configured to run nestjs in watch-mode so you can save and the nestjs will rebuild everytime for development purposes

## Test

```bash
# unit tests
$ npm run test

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://github.com/ByronKweh/)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Improvements

1. Variables for the mongodb and hosting should be in the env to allow for production and development builds
2. Implement JWT - A proper microservice would have either an API gateway or a JWT microservice integrated
3. Implement API versioning - A proper API should have API versioning
4. Nest notification schema in a user schema - The current MongoDB structure for notifications is a flat structure but it would be improved if it was nested under a user object
5. Prod logic for docker - Docker production build is not tested
