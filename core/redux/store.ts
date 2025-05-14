import { configureStore } from "@reduxjs/toolkit";
import users from "./users/users.slice";

const store = configureStore({
  reducer: {
    users,
  },
});

export default store;
