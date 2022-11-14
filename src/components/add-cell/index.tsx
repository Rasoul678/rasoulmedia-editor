import React from "react";
import { useAction } from "../../hooks/useAction";
import Plus from "../icons/Plus";
import style from "./add-cell.module.css";

interface IProps {
  previousCellID?: string | null;
}

const AddCell: React.FC<IProps> = ({ previousCellID = null }) => {
  const { insertCellAfter } = useAction();

  return (
    <div className={style.addList}>
      <div className={style.addList__buttons}>
        <button
          title="add code"
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellAfter("code", previousCellID)}
        >
          <Plus /> Code
        </button>
        <button
          title="add text"
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellAfter("text", previousCellID)}
        >
          <Plus /> Text
        </button>
      </div>
      <div className={style.divider}></div>
    </div>
  );
};

export default AddCell;
