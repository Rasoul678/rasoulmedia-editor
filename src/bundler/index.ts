import esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const startService = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
  });
};

let service = false;

const bundler = async (rawCode: string) => {
  if (!service) {
    try {
      await startService();
      service = true;
    } catch (error) {
      throw error;
    }
  }

  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
  });

  return result.outputFiles[0].text;
};

export default bundler;
