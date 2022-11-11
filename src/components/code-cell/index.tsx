import { useCallback, useState } from "react";
import CodeEditor from "../code-editor";
import Preview from "../preview";
import bundler from "../../bundler";
import ResizableBox from "../resizable";
import style from "./code-cell.module.css";

const CodeCell = () => {
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
    <ResizableBox direction="vertical">
      <div className={style.cell__wrapper}>
        <ResizableBox direction="horizontal" width={"50%"} maxWidth={"70%"}>
          <CodeEditor
            defaultValue={`
            import React from 'react'
            import {createRoot} from 'react-dom'
            
            const rootElement = document.querySelector('#root');
            const root = createRoot(rootElement);
            
            const App = () => <h1>Hello!</h1>;
            root.render(<App />)
            `}
            onChange={handleChangeEditor}
          />
        </ResizableBox>
        <div>
          <button onClick={handleClick}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    </ResizableBox>
  );
};

export default CodeCell;
