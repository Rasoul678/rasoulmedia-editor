import React, { Fragment } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddCell from "../add-cell";
import CellListItem from "../cell-list-item";

interface IProps {}

const CellList: React.FC<IProps> = (props) => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  return (
    <div>
      <AddCell />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellID={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
