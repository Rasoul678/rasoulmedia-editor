import React from "react";
import { useAction } from "../../hooks/useAction";
import { Delete, Down, Up } from "../icons";

interface IProps {
  id: string;
}

const ActionBar: React.FC<IProps> = ({ id }) => {
  const { moveCell, deleteCell } = useAction();

  return (
    <>
      <Up onClick={() => moveCell("up", id)} />
      <Down onClick={() => moveCell("down", id)} />
      <Delete onClick={() => deleteCell(id)} />
    </>
  );
};

export default ActionBar;
