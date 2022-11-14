import { combineReducers } from "@reduxjs/toolkit";
import { bundlesReducer } from "./bundlesReducer";
import { cellsReducer } from "./cellsReducer";

export const rootReducer = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});
