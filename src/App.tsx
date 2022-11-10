import { useCallback, useState } from "react";
import CodeEditor from "./components/code-editor/code-editor";
import "bulmaswatch/nuclear/bulmaswatch.min.css";
import Preview from "./components/preview/preview";
import bundler from "./bundler";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  const handleChangeEditor = useCallback((input: string) => {
    setInput(input);
  }, []);

  return (
    <div>
      <CodeEditor
        defaultValue={`// Some comments
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
        <Preview code={code} />
      </header>
    </div>
  );
};

export default App;
