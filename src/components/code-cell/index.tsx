import { useEffect, useState } from "react";
import CodeEditor from "../code-editor";
import Preview from "../preview";
import bundler from "../../bundler";
import ResizableBox from "../resizable";
import style from "./code-cell.module.css";
import { Cell } from "../../state/action-creators";
import { useAction } from "../../hooks/useAction";

interface IProps {
  cell: Cell;
}

const CodeCell: React.FC<IProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { updateCell } = useAction();

  const { content, id } = cell;

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setError(output.err);
      setCode(output.code);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <ResizableBox direction="vertical">
      <div className={style.cell__wrapper}>
        <ResizableBox direction="horizontal" width={"50%"} maxWidth={"70%"}>
          <CodeEditor
            defaultValue={content}
            onChange={(value) => updateCell(value, id)}
          />
        </ResizableBox>
        <Preview code={code} err={error} />
      </div>
    </ResizableBox>
  );
};

export default CodeCell;
