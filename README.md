[![Reviewed by Hound](https://img.shields.io/badge/ESLint%20Reviewed%20by%20-HoundCI-d16ef5)](https://houndci.com)
[![Database hosted by ElephantSQL](https://img.shields.io/badge/Database%20Host-ElephantSQL-blue)](https://www.elephantsql.com)
[![Deployed on Heroku](https://img.shields.io/badge/Deployed%20on-Heroku-purple)](heroku-template.website.com)


# backend-template
a repo storing template files for new backend projects in nodejs.

## Steps
- git clone repo
- extract all files and paste into your personal backend repo
- replace all repo names from `backend-template` to `[my-repo]`
- move script object from `scripts.json` into `package.json` scripts object
- run `npm i`
- add environmental variables to .env file **(see .env.sample)**
- **Note**: This template *explicitly* expects you to use **sequelize ORM** to connect to a **PostgresQL** database and has been structured that way. configuration files in `src/config/config.js` and `src/models/index.js` have been setup to accomodate serquelize file routing. please read up here: [How to use Sequelize](https://www.robinwieruch.de/postgres-express-setup-tutorial)
- create initial migration files with `sequelize-cli` using `sequelize migration:generate --name [name of file]`
- add necessary code files as you see fit

## What's in the box
- **dependencies and devDependencies** 
```
 "dependencies": {
    "@babel/polyfill": "^7.4.4",
    "@hapi/joi": "^15.1.1",
    "@sendgrid/mail": "^6.4.0",
    "@types/hapi__joi": "^15.0.3",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.4",
    "cors": "^2.8.4",
    "cross-env": "^5.2.0",
    "dotenv": "^8.0.0",
    "ejs": "^2.6.1",
    "errorhandler": "^1.5.0",
    "express": "^4.17.1",
    "express-jwt": "^5.3.1",
    "express-session": "^1.15.6",
    "joi-password-complexity": "^3.1.0",
    "jsonwebtoken": "^8.5.1",
    "method-override": "^2.3.10",
    "methods": "^1.1.2",
    "morgan": "^1.9.1",
    "passport": "^0.4.0",
    "passport-google-oauth": "^2.0.0",
    "passport-local": "^1.0.0",
    "pg": "^7.12.1",
    "pg-hstore": "^2.3.3",
    "request": "^2.87.0",
    "sequelize": "^5.15.0",
    "sequelize-cli": "^5.5.0",
    "socket.io": "^2.2.0",
    "socket.io-client": "^2.2.0",
    "swagger-ui-express": "^4.0.7",
    "underscore": "^1.9.1"
  },
  "devDependencies": {
    "@babel/cli": "^7.5.5",
    "@babel/core": "^7.5.5",
    "@babel/node": "^7.6.2",
    "@babel/preset-env": "^7.5.5",
    "@babel/register": "^7.5.5",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "coveralls": "^3.0.6",
    "eslint": "^6.2.2",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-import": "^2.18.2",
    "faker": "^4.1.0",
    "mocha": "^6.2.0",
    "mocha-lcov-reporter": "^1.3.0",
    "nodemon": "^1.19.1",
    "nyc": "^14.1.1"
  }
```

- **setup files**
<img width="173" alt="Screenshot 2019-12-09 at 19 32 49" src="https://user-images.githubusercontent.com/37340699/70462224-bf10a600-1aba-11ea-8872-a49f75c77942.png">

- **file structure**
<img width="154" alt="Screenshot 2019-12-09 at 19 34 15" src="https://user-images.githubusercontent.com/37340699/70462305-e8c9cd00-1aba-11ea-882a-d2b8a65826e7.png">

### Happy Coding!

Author: Chima Nnadika.
