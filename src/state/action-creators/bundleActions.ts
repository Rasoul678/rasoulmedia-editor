import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import bundler from "../../bundler";
import { ActionType } from "../action-types";

export const bundleStart = createAction(
  ActionType.BUNDLE_START,
  function prepare(id: string) {
    return { payload: { cellID: id } };
  }
);

export const createBundle = createAsyncThunk(
  ActionType.BUNDLE_COMPLETE,
  async ({ id, input }: { id: string; input: string }, { dispatch }) => {
    dispatch(bundleStart(id));

    const result = await bundler(input);

    return {
      cellID: id,
      bundle: result,
    };
  }
);
