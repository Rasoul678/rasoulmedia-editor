import { configureStore } from "@reduxjs/toolkit";
import { ActionType } from "./action-types";
import { rootReducer } from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    cell: {
      id: "id",
      createdAt: new Date().toLocaleString(),
      updatedAt: null,
      content: `
      import React from 'react'
      import {createRoot} from 'react-dom'
      
      const rootElement = document.querySelector('#root');
      const root = createRoot(rootElement);
      
      const App = () => <h1>Hello!</h1>;
      root.render(<App />)
      `,
      type: "code",
    },
    targetID: null,
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    cell: {
      id: "id2",
      createdAt: new Date().toLocaleString(),
      updatedAt: null,
      content: "",
      type: "text",
    },
    targetID: null,
  },
});
