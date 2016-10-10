My personal react-webpack-babel-whatever boilerplate.

## Features
* ES2016 + JSX
* Redux state management
* Routing with React-router
* Express webserver
* CSS Modules
* Standalone desktop builds using [Electron](http://electron.atom.io/)
* Mobile builds using [Cordova](https://cordova.apache.org/)

## Commands

All commands are run using `npm run`.

* `clean` - Deletes the previous build files
* `build` - Compiles and minifies the front-end code
* `build:dev` - Forces a build in development mode
* `build:android` - Build an unsigned android APK
* `build:desktop [platform=all]` - Build desktop executables (available platforms: all, win32, darwin, mas, linux)
* `run:android` - Build and run on android device or emulator
* `start` - Starts the servers (API server only if `NODE_ENV === production`)
* `start:prod` - Forces the servers to start in production mode
