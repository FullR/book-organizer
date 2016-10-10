const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config");

module.exports = (port, proxyPort) => {
  const server = new WebpackDevServer(webpack(config), {
    proxy: {
      "/api/": `http://localhost:${proxyPort}`
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
