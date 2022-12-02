const cracoModuleFederation = require("craco-module-federation");

module.exports = {
  output: {
    publicPath: "https://rasoul678.github.io/rasoulmedia-editor/",
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
