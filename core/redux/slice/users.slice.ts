import { createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../types/users.types";
import { withDynamicOptions } from "../redux.helper";
import { usersReducers } from "../reducers";

const initialState: UsersState = {
  data: [],
  selectedUser: null,
  apiOptions: {},
  meta: {
    total: 0,
    page: 1,
    limit: 10,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: usersReducers,
});

// Export actions
export const {
  setUsers,
  setSelectedUser,
  clearSelectedUser,
  addUser,
  updateUser,
  removeUser,
  setUsersMeta,
  startLoading,
  successLoading,
  failLoading,
} = usersSlice.actions;

// Export the enhanced reducer with dynamic options
export default withDynamicOptions(usersSlice.reducer, "users");
