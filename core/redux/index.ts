import {
  useDispatch as uDispatch,
  useSelector as uSelector,
} from "react-redux";
import store from "./store";

// hooks
export const useDispatch = uDispatch.withTypes<AppDispatch>();
export const useSelector = uSelector.withTypes<RootState>();

// store
export { default as store } from "./store";

// redux root types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
