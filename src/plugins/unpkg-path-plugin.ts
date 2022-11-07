import {
  OnLoadArgs,
  OnLoadResult,
  OnResolveArgs,
  PluginBuild,
} from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: PluginBuild) {
      //* Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      //* Handle relative paths in a module
      build.onResolve({ filter: /\.+\// }, (args: OnResolveArgs) => {
        return {
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
          namespace: "a",
        };
      });

      //* Handle main file of a module
      build.onResolve({ filter: /.*/ }, (args: OnResolveArgs) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
        if (args.path === "index.js") {
          return {
            contents: inputCode,
            loader: "jsx",
          };
        }

        const cachedResult = await fileCache.getItem<OnLoadResult>(args.path);

        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);

        const result: OnLoadResult = {
          contents: data,
          loader: "jsx",
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
