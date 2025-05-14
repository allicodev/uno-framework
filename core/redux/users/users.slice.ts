import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../types/users.types";
import { withDynamicOptions } from "../redux.helper";
import usersReducers from "./users.reducers";

const initialState: UsersState = {
  data: [],
  apiOptions: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: usersReducers,
});

// Export actions
export const {
  setUsers,
  addUser,
  updateUser,
  removeUser,
  startLoading,
  successLoading,
  failLoading,
} = usersSlice.actions;

// Export the enhanced reducer with dynamic options
export default withDynamicOptions(usersSlice.reducer, "users");
