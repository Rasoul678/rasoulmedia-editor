import React from "react";
import { useAction } from "../../hooks/useAction";
import style from "./add-cell.module.css";

interface IProps {
  nextCellID?: string | null;
}

const AddCell: React.FC<IProps> = ({ nextCellID = null }) => {
  const { insertCellBefore } = useAction();

  return (
    <div className={style.addList}>
      <div className={style.addList__buttons}>
        <button
          title="add code"
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellBefore("code", nextCellID)}
        >
          Code
        </button>
        <button
          title="add text"
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellBefore("text", nextCellID)}
        >
          Text
        </button>
      </div>
      <div className={style.divider}></div>
    </div>
  );
};

export default AddCell;
