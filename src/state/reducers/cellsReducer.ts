import { createReducer } from "@reduxjs/toolkit";
import {
  insertCellAfter,
  Cell,
  deleteCell,
  moveCell,
  updateCell,
} from "../action-creators";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: "",
  data: {},
  order: [],
};

export const cellsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(insertCellAfter, (state, action) => {
      const { cell, targetID } = action.payload;

      if(cell.type === 'code'){
        cell.content = `// Use "show()" to display something! 🤩 \n // e.g: show(<div>Hello World!</div>)`
      }

      state.data[cell.id] = cell;

      const index = state.order.findIndex((id) => id === targetID);

      if (index === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    })
    .addCase(deleteCell, (state, action) => {
      const deletingCellID = action.payload;

      //* delete from order array
      state.order = state.order.filter((id) => id !== deletingCellID);
      //* delete from object
      delete state.data[deletingCellID];
    })
    .addCase(moveCell, (state, action) => {
      const { id, direction } = action.payload;

      const index = state.order.findIndex((x) => x === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    })
    .addCase(updateCell, (state, action) => {
      const { id, content, updatedAt } = action.payload;

      state.data[id].content = content;
      state.data[id].updatedAt = updatedAt;
    });
});
