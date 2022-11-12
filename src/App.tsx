import "bulmaswatch/cyborg/bulmaswatch.min.css";
import CodeCell from "./components/code-cell";
import MarkdownEditor from "./components/markdown-editor";
import { useAction } from "./hooks/useAction";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App = () => {
  const data = useTypedSelector((state) => state.cellsReducer.data);
  const { insertCellBefore, moveCell } = useAction();

  return (
    <>
      {JSON.stringify(data)}
      <button onClick={() => insertCellBefore('code')}>add</button>
      <button onClick={() => moveCell('down', '')}>swap</button>
      <CodeCell />
      <MarkdownEditor />
    </>
  );
};

export default App;
