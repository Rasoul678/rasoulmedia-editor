import esbuild from "esbuild-wasm";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import CodeEditor from "./components/code-editor";
import "bulmaswatch/nuclear/bulmaswatch.min.css";

const App = () => {
  const serviceRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const id = useId();
  const [input, setInput] = useState("");
  const [, startTransition] = useTransition();

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

    iframeRef.current!.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
    });

    iframeRef.current!.contentWindow!.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MeBox</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", (event) => {
            try{
              eval(event.data);
            } catch(error){
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: crimson;"><h4>Runtime Error:</h4>' + error + '</div>';
              console.error(error);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  const handleChangeEditor = useCallback((value: string) => {
    startTransition(() => {
      setInput(value);
    });
  }, []);

  return (
    <div>
      <CodeEditor
        defaultValue={
          `// Some comments
          import React from 'react';
          import {createRoot} from 'react-dom';

          const rootElement = document.querySelector('#root');
          const root = createRoot(rootElement);

          const App = () => <div>Hello World!</div>;

          root.render(<App />);
        `}
        onChange={handleChangeEditor}
      />
      <header className="App-header">
        <div>
          <button onClick={handleClick}>Submit</button>
        </div>
        <iframe
          ref={iframeRef}
          title={`preview-${id}`}
          sandbox="allow-scripts"
          srcDoc={html}
        />
      </header>
    </div>
  );
};

export default App;
