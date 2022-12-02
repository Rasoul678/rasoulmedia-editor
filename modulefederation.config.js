const deps = require("./package.json").dependencies;

module.exports = {
  name: "editor",
  filename: "remoteEntry.js",
  remotes: {
    store: "store@https://rasoul678.github.io/rasoulmedia-store/remoteEntry.js",
  },
  exposes: {
    "./app": "./src/App",
    "./bundler": './src/bundler'
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
    "react-redux": {
      singleton: true,
      version: deps["react-redux"],
    },
  },
};
