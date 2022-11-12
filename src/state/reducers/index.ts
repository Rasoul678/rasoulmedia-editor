import { combineReducers } from "@reduxjs/toolkit";
import { cellsReducer } from "./cellsReducer";

export const rootReducer = combineReducers({
  cellsReducer: cellsReducer,
});
