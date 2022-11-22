import { useEffect, useRef } from "react";
import esbuild from "esbuild-wasm";

export const useBundlerService = () => {
  const serviceRef = useRef(false);

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.15.15/esbuild.wasm",
    });
  };

  useEffect(() => {
    if (!serviceRef.current) {
      try {
        startService();
        serviceRef.current = true;
      } catch (error) {
        throw error;
      }
    }
  }, []);
};
