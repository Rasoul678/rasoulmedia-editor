import { createAction, nanoid } from "@reduxjs/toolkit";
import { ActionType } from "../action-types";

export type CellTypes = "code" | "text";
export type DirectionTypes = "up" | "down";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
  createdAt: string;
  updatedAt: string | null;
}

export const insertCellBefore = createAction(
  ActionType.INSERT_CELL_BEFORE,
  function prepare(type: CellTypes, id: string | null = null) {
    const cell: Cell = {
      id: nanoid(),
      createdAt: new Date().toLocaleString(),
      updatedAt: null,
      content: "",
      type,
    };

    return {
      payload: { cell, targetID: id },
    };
  }
);

export const updateCell = createAction(
  ActionType.UPDATE_CELL,
  function prepare(content: string, id: string) {
    return {
      payload: {
        id,
        content,
        updatedAt: new Date().toLocaleString(),
      } as Pick<Cell, "id" | "content" | "updatedAt">,
    };
  }
);

export const deleteCell = createAction(
  ActionType.DELETE_CELL,
  function prepare(id: string) {
    return { payload: id };
  }
);

export const moveCell = createAction(
  ActionType.MOVE_CELL,
  function prepare(direction: DirectionTypes, id: string) {
    return {
      payload: {
        id,
        direction,
      },
    };
  }
);
