import React from "react";
import Plus from "../icons/Plus";
import style from "./add-cell.module.css";
import { useStore } from "store/store";


interface IProps {
  previousCellID?: string | null;
}

const AddCell: React.FC<IProps> = ({ previousCellID = null }) => {
  const { actions } = useStore();

  return (
    <div className={style.addList}>
      <div className={style.addList__buttons}>
        <button
          title="add code"
          className="button is-primary is-rounded is-small"
          onClick={() => actions.insertCellAfter("code", previousCellID)}
        >
          <Plus /> Code
        </button>
        <button
          title="add text"
          className="button is-primary is-rounded is-small"
          onClick={() => actions.insertCellAfter("text", previousCellID)}
        >
          <Plus /> Text
        </button>
      </div>
      <div className={style.divider}></div>
    </div>
  );
};

export default AddCell;
