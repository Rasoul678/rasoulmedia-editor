import { createReducer } from "@reduxjs/toolkit";
import { bundleStart, createBundle } from "../action-creators";

interface BundlesState {
  [key: string]:
    | {
        bundling: boolean;
        error: string;
        code: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

export const bundlesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(bundleStart, (state, action) => {
      const { cellID } = action.payload;

      state[cellID] = {
        bundling: true,
        code: "",
        error: "",
      };
    })
    .addCase(createBundle.fulfilled, (state, action) => {
      const {
        bundle: { code, err: error },
        cellID,
      } = action.payload;

      state[cellID] = {
        code,
        error,
        bundling: false,
      };
    });
});
