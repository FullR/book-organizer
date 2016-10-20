const {exec} = require("child_process");

module.exports = function run(cmd, options) {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (error, stdout, stderr) => {
      if(error) {
        reject(error);
      } else {
        if(stderr) process.stderr.write(stderr);
        resolve({stdout, stderr});
      }
    });
  });
}
