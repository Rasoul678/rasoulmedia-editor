import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state";

export const useTypedDispatch: () => AppDispatch = useDispatch;
