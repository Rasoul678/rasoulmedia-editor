import esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const bundler = async (rawCode: string) => {
  try {
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

    return {
      code: result.outputFiles[0].text,
      err: "",
    };
  } catch (error) {
    return {
      code: "",
      err: (error as Error).message,
    };
  }
};

export default bundler;
