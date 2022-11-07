import esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const serviceRef = useRef(false);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [code, setCode] = useState("");

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
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

  const handleClick = async () => {
    if (!serviceRef.current) return;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      plugins: [unpkgPathPlugin(), fetchPlugin(textRef.current!.value)],
    });

    setCode(result.outputFiles[0].text);
  };

  return (
    <div className="App">
      <header className="App-header">
        <textarea ref={textRef} rows={15} cols={100}></textarea>
        <div>
          <button onClick={handleClick}>Submit</button>
        </div>
        <pre>{code}</pre>
      </header>
    </div>
  );
};

export default App;
