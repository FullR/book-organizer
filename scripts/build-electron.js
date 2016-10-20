const path = require("path");
const co = require("co");
const mkdirp = require("mkdirp-promise");
const rimraf = require("rimraf-promise");
const run = require("./script-utils/run");
const {appName} = require("../package.json");
const log = console.log.bind(console);

const platform = process.argv[2] || "all";
const arch = process.argv[3] || "all";
const dir = process.cwd();
const electronBuildDir = path.join(dir, "builds");

const buildElectron = co.wrap(function* () {
  log(`Building electron applications for ${platform === "all" ? "all platforms" : platform}`);
  yield run(`electron-packager "${dir}" "${appName}" --platform=${platform} --arch=${arch} --out="${electronBuildDir}" --overwrite`)
});

buildElectron().catch(log);
