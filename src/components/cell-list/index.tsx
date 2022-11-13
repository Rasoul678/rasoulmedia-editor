import React, { Fragment } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "../add-cell";
import CellListItem from "../cell-list-item";

interface IProps {}

const CellList: React.FC<IProps> = (props) => {
  const cells = useTypedSelector(({ cellsReducer: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  return (
    <div>
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <AddCell nextCellID={cell.id} />
          <CellListItem cell={cell} />
        </Fragment>
      ))}
      <AddCell />
    </div>
  );
};

export default CellList;
