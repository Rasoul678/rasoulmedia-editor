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
      build.onResolve({ filter: /.*/ }, (args: OnResolveArgs) => {
        if (args.path === "index.js") {
          return {
            path: args.path,
            namespace: "a",
          };
        }

        if (args.path.includes("./" || args.path.includes("../"))) {
          return {
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
              .href,
            namespace: "a",
          };
        }

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
