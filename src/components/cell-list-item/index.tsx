import React, { CSSProperties } from "react";
import { Cell } from "../../state/action-creators";
import ActionBar from "../action-bar";
import CodeCell from "../code-cell";
import MarkdownEditor from "../markdown-editor";

const style: CSSProperties = {
  position: "absolute",
  top: "0",
  right: "calc(50% - 2.7rem)",
  display: "flex",
  gap: "0.2rem",
  margin: "0.2rem",
  zIndex: "10",
  opacity: 1,
};

interface IProps {
  cell: Cell;
}

const CellListItem: React.FC<IProps> = ({ cell }) => {
  return (
    <div style={{ position: "relative", marginBottom: "2.5rem" }}>
      {cell.type === "code" ? (
        <>
          <div style={{ ...style, top: "-1.5rem" }}>
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <div style={{ ...style }}>
            <ActionBar id={cell.id} />
          </div>
          <MarkdownEditor cell={cell} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
