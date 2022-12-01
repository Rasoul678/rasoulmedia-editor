import React, { Fragment } from "react";
import AddCell from "../add-cell";
import CellListItem from "../cell-list-item";
import { useStore } from "store/store";
import { Cell } from "../../state/action-creators";

interface IProps {}

const CellList: React.FC<IProps> = (props) => {
  const { store } = useStore();
  const {
    cells: { order, data },
  } = store;

  const cells = order.map((id: string) => data[id]);

  return (
    <div>
      <AddCell />
      {cells.map((cell: Cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellID={cell.id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
