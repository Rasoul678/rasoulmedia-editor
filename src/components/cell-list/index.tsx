import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CellListItem from "../cell-list-item";

interface IProps {}

const CellList: React.FC<IProps> = (props) => {
  const cells = useTypedSelector(({ cellsReducer: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  return (
    <div>
      {cells.map((cell) => (
        <CellListItem key={cell.id} cell={cell} />
      ))}
    </div>
  );
};

export default CellList;
