import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, (args: any) => {
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

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === "index.js") {
          return {
            contents: `
                    import React from 'react';
                `,
            loader: "jsx",
          };
        }

        const { data, request } = await axios.get(args.path);

        return {
          contents: data,
          loader: "jsx",
          resolveDir: new URL("./", request.responseURL).pathname,
        };
      });
    },
  };
};
