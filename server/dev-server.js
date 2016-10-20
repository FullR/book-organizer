const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config");

module.exports = (port, proxyPort) => {
  const server = new WebpackDevServer(webpack(config), {
    quiet: false,
    proxy: {
      "/api/": `http://localhost:${proxyPort}`
    },
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  });

  server.listen(port, (error) => {
    if(error) {
      console.error(error);
    } else {
      console.log(`Dev server listening on port ${port}`);
    }
  });
};
