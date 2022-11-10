import { useCallback, useState } from "react";
import CodeEditor from "../code-editor";
import Preview from "../preview";
import bundler from "../../bundler";

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
    <div>
      <CodeEditor
        defaultValue={`console.log(123);`}
        onChange={handleChangeEditor}
      />
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
