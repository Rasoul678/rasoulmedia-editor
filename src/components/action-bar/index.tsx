import React from "react";
import { Delete, Down, Up } from "../icons";
import { useStore } from "store/store";

interface IProps {
  id: string;
}

const ActionBar: React.FC<IProps> = ({ id }) => {
  const { actions } = useStore();

  return (
    <>
      <Up onClick={() => actions.moveCell("up", id)} />
      <Down onClick={() => actions.moveCell("down", id)} />
      <Delete onClick={() => actions.deleteCell(id)} />
    </>
  );
};

export default ActionBar;
