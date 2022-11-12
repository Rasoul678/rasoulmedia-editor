import { bindActionCreators } from "@reduxjs/toolkit";
import { useTypedDispatch } from "./useTypedDispatch";
import { actionCreators } from "../state";
import { useMemo } from "react";

export const useAction = () => {
  const dispatch = useTypedDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
