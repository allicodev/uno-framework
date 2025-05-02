import { configureStore } from "@reduxjs/toolkit";
import { users } from "./slice";

const store = configureStore({
  reducer: {
    users,
  },
});

export default store;
