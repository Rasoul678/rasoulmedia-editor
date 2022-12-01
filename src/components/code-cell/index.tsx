import { useEffect } from "react";
import CodeEditor from "../code-editor";
import Preview from "../preview";
import ResizableBox from "../resizable";
import style from "./code-cell.module.css";
import { Cell } from "../../state/action-creators";
import ProgressBar from "../progress-bar";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";
import { useStore } from "store/store";

interface IProps {
  cell: Cell;
}

const CodeCell: React.FC<IProps> = ({ cell }) => {
  const { content, id } = cell;
  const { actions, store } = useStore();

  const { updateCell, createBundle } = actions;
  const bundle = store.bundles[id];

  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle({ id, input: cumulativeCode });

      return;
    }
    const timer = setTimeout(async () => {
      createBundle({ id, input: cumulativeCode });
    }, 600);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, createBundle]);

  return (
    <ResizableBox direction="vertical">
      <div className={style.cell__wrapper}>
        <ResizableBox direction="horizontal" width={"50%"} maxWidth={"70%"}>
          <CodeEditor
            defaultValue={content}
            onChange={(value) => updateCell(value, id)}
          />
        </ResizableBox>
        {!bundle || bundle.bundling ? (
          <ProgressBar />
        ) : (
          <Preview code={bundle.code} err={bundle.error} />
        )}
      </div>
    </ResizableBox>
  );
};

export default CodeCell;
