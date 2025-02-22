import { createSlice } from "@reduxjs/toolkit";

import { authReducer } from "../reducers";
import { AuthState } from "../types/auth.types";
import { withDynamicOptions } from "../redux.helper";
import { Status } from "@/core/types";
import { login } from "../thunk";

const initialState: AuthState = {
  dateLastRequested: null,
  token: null,
  status: Status.idle,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: authReducer,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(login.rejected, (state) => {
        state.status = Status.failed;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token } = action.payload ?? {};
        state.status = Status.success;
        state.token = token;
        state.dateLastRequested = new Date();
      });
  },
});

export const { removeToken } = authSlice.actions;
export default withDynamicOptions(authSlice.reducer, "auth");
