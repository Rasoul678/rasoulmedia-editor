const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  output: {
    publicPath: "http://localhost:3020/",
  },
  devServer: {
    port: 3020,
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
