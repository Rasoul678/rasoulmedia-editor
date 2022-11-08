import esbuild from "esbuild-wasm";
import { useEffect, useId, useRef } from "react";
import "./App.css";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const serviceRef = useRef(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const id = useId();

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
      plugins: [unpkgPathPlugin(), fetchPlugin(textRef.current!.value)],
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

  return (
    <div className="App">
      <header className="App-header">
        <textarea ref={textRef} rows={15} cols={100}></textarea>
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
