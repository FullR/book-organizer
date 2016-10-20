My personal react-webpack-babel-whatever boilerplate.

## Features
* ES2016 + JSX with [Babel](https://babeljs.io/)
* Asset bundling with [Webpack](https://webpack.github.io/)
* [Express](https://expressjs.com/) webserver
* [CSS Modules](https://github.com/css-modules/css-modules)
* Standalone desktop builds using [Electron](http://electron.atom.io/)
* Mobile builds using [Cordova](https://cordova.apache.org/)

## Commands

All commands are run using `npm run` (or `yarn run`).

* `clean` - Deletes the previous build files
* `build` - Compiles and minifies the front-end code
* `build:dev` - Forces a build in development mode
* `build:android` - Build an unsigned android APK
* `build:desktop [platform=all] [arch=all]` - Build desktop executables (available platforms: all, win32, darwin, mas, linux)
* `run:android` - Build and run on android device or emulator
* `start` - Starts the servers (if `NODE_ENV === production`, API server only)
* `start:prod` - Forces the server to start in production mode
