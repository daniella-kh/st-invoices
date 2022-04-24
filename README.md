#ba-boilerplate

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Features

- **Mongo**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Sql**: [mySql](https://www.mysql.com/) with SQL query builder [knex](https://knexjs.org)
- **In memory database**: [redis](https://aiven.io/redis) with client using [redis-client](https://github.com/NodeRedis/node-redis)
- **Validation**: request data validation using [express-validator](https://express-validator.github.io/docs/)
- **Logging**: using [pino](https://github.com/pinojs/pino) and [express-pino-logger](https://www.npmjs.com/package/express-pino-logger)
- **Reporting errors**: using [sentry](https://docs.sentry.io/platforms/node/)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **API documentation**: with [express-swagger-generator](https://github.com/pgroot/express-swagger-generator)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Linting**: with [ESLint](https://eslint.org)
- **Prometheus**: with [express-prometheus-middleware](https://www.npmjs.com/package/express-prometheus-middleware)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing:

```bash
# run all tests
npm run test

# run test ci
npm run test:ci
```

Linting:

```bash
# run ESLint
npm run lint
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
NODE_ENV=
PORT=
LOG_LEVEL=

MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
MYSQL_POOL_MIN=
MYSQL_POOL_MAX=

MONGO_HOST=
MONGO_PORT=
MONGO_NAME=
MONGO_USER=
MONGO_PASSWORD=
MONGO_URL=

REDIS_HOST=
REDIS_PORT=
REDIS_PASSWORD=
REDIS_DATABASE_INDEX=

SENTRY_DSN=
SENTRY_ENVIRONMENT=

SWAGGER_URL=
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go
to `http://localhost:5000/swagger/api-docs` in your browser. This documentation page is automatically generated using
the [express-swagger-generator](https://github.com/pgroot/express-swagger-generator)
with [swagger](https://swagger.io/) definitions.

### API Endpoints

List of available routes:

**Status routes**:\
`GET status/healthcheck` - healthcheck\
`GET /status/live` - live\
`GET /loglevel` - loglevel\
`PUT /loglevel` - loglevel

**Docs Api routes**:\
`GET /swagger/api-docs` - swagger

**Prometheus metrics**\
`GET /metrics` - metrics

## Logging

Import the logger from `/utils/logger.js`. It is using the [Pino](https://github.com/pinojs/pino) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least
important):

```javascript
const { logger } = require( '<path to root>/utils/logger' );

logger.fatal("message");
logger.error("message");
logger.warn("message");
logger.info("message");
logger.debug("message");
logger.trace("message");

```

In development mode, log messages will be printed to the console only the level define in LOG_LEVEL env.

In production or test mode message not printed to the console

If LOG_LEVEL not set and app not in production mode the default level set to `error`

Note: API request information (request , response, responseTime) are also automatically logged (using [express-validator](https://express-validator.github.io/docs/)).

For custom request information go to loggerMiddleware function in `utils/logger.js`\
The serializers default looks like this
```javascript
serializers: {
	req: ( req ) => ( {
		id: req.id,
		raw: req.body,
		method: req.method,
		url: req.url,
	} ),
		res: ( res ) => ( {
		statusCode: res.statusCode,
		responseTime: res.responseTime
	}
```

## `Install package from elementor organization:`

###### `1. Authenticate to GitHub Packages:`
`Go to Github → Settings → Developer Settings → Personal access tokens:`

`Click *** Generate new token *** button`

`Select scopes:`

- `repo (Full control of private repositories)`

- `read:packages (Download packages from github package registry)`

`Click *** Generate token *** button`

`Save new accessToken`

###### `2. GitHub packages URL and account owner:`

`In the same directory as your package.json file, create or edit an .npmrc (.gitignore file) to include specifying GitHub packages URL and the account owner:`
```
//npm.pkg.github.com/:_authToken=[TOKEN]
@elementor:registry=https://npm.pkg.github.com/
```

###### `3. Authenticating with a personal access token:`
- `In the same directory as your .npmrc run:`
```shell
npm login --scope=elementor --registry=https://npm.pkg.github.com
```
- `Fill the following data:`
```yaml
Username: YOUR_GITHUB_USERNAME  
Password: [TOKEN]  
Email: YOUR_EMAIL
```

###### `4. Install package:`
```shell
npm install @elementor/[package_name]
```
