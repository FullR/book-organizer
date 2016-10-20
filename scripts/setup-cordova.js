const run = require("./script-utils/run");
const {exec} = require("child_process");
const path = require("path");
const {get} = require("lodash");
const {co} = require("co");
const {readFile, writeFile} = require("fs-promise");
const mkdirp = require("mkdirp-promise");
const rimraf = require("rimraf-promise");
const package = require("../package");

const platforms = package.cordovaPlatforms;
const plugins = package.cordovaPlugins;
const log = console.log.bind(console);
const {appName, appId} = package;
const dir = process.cwd();
const cordovaDirName = "cordova";
const cordovaDir = path.join(dir, cordovaDirName);
const configTemplatePath = path.join(dir, "cordova-config.xml");
const configPath = path.join(cordovaDir, "config.xml");
const sourcePath = path.join(dir, "dist");

const setupCordova = co.wrap(function* () {
  log("Removing old files");
  yield rimraf(cordovaDir);

  log("Creating cordova project");
  yield mkdirp(cordovaDir);
  yield run(`cordova create cordova ${appId} "${appName}"`);

  log("Setting up config.xml");
  const configTemplate = yield readFile(configTemplatePath, "utf8");
  const configContent = configTemplate
    .replace(/\{\{(.*?)\}\}/g, (_, path) => get(package, path, ""));
  yield writeFile(configPath, configContent);

  log("Adding source code to project");
  const wwwDir = path.join(cordovaDir, "www");
  yield rimraf(wwwDir);
  yield run(`ln -s "${sourcePath}" "${wwwDir}"`);

  log("Adding platforms");
  if(platforms && platforms.length) {
    for(let platform of platforms) {
      log(`Adding platform ${platform}`);
      yield run(`cordova platform add ${platform}`, {cwd: cordovaDir});
    }
  }

  log("Adding plugins");
  if(plugins && plugins.length) {
    for(let plugin of plugins) {
      log(`Adding plugin ${plugin}`);
      yield run(`cordova plugin add ${plugin}`, {cwd: cordovaDir});
    }
  }
});

setupCordova().catch(log);
