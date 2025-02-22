import { configureStore } from "@reduxjs/toolkit";
import { counter, auth } from "./slice";

const store = configureStore({
  reducer: {
    counter,
    auth,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
