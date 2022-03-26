# img-rpstry

#### A [Hapi.js](https://hapi.dev/) API with [MongoDB](https://www.mongodb.com/).

## Documentation for this project is: [HERE](https://documenter.getpostman.com/view/14599476/UUxujARH)

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0
- Install [MongoDB Server](https://www.mongodb.com/try/download/community)

# Getting started
- Clone the repository
```
git clone  https://github.com/olumidayy/img-rpstry.git
```
- Install dependencies
```
cd img-rpstry
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3000/api`



## Building the project

### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on src/index.js. Can be invoked with `npm start`                  |
| `dev`                     | Runs full build before starting all watch tasks. Can be invoked with `npm dev`                                         |
| `test`                    | Runs build and run tests using lab        |



## Testing
The tests are  written with [Lab](https://hapi.dev/module/lab/).

```

   "@hapi/lab": "^24.3.2",

```
### Running tests using NPM Scripts
````
npm test

````
Test files are created under test folder.



