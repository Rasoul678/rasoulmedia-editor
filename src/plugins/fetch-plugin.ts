import axios from "axios";
import { OnLoadArgs, OnLoadResult, PluginBuild } from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          contents: inputCode,
          loader: "jsx",
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
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
