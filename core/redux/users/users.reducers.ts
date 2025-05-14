import _ from "lodash";
import { PayloadAction } from "@reduxjs/toolkit";

import { UsersState, User } from "../types/users.types";

// Users reducer functions
export const setUsers = (state: UsersState, action: PayloadAction<any>) => {
  const { data, id } = action.payload ?? {};
  state.data = data;
  state.apiOptions[id] = {
    ...(state.apiOptions[id] || {}),
    ..._.omit(action.payload, ["id", "data"]),
    dateLastLoaded: new Date().toISOString(),
  };
};

export const addUser = (state: UsersState, action: PayloadAction<User>) => {
  state.data.push(action.payload);
};

export const updateUser = (state: UsersState, action: PayloadAction<User>) => {
  const index = (state.data || []).findIndex(
    (user) => user.id === action.payload.id
  );
  if (index !== -1)
    state.data[index] = { ...state.data[index], ...action.payload };
};

export const removeUser = (
  state: UsersState,
  action: PayloadAction<{ id: string }>
) => {
  const index = (state.data || []).findIndex(
    (user) => user.id === action.payload.id
  );
  if (index !== -1) state.data.splice(index, 1);
};

// API options caching reducers
export const startLoading = (
  state: UsersState,
  action: PayloadAction<{ id: string }>
) => {
  const { id } = action.payload;
  if (state.apiOptions[id]) {
    state.apiOptions[id].isFetching = true;
  }
};

export const failLoading = (
  state: UsersState,
  action: PayloadAction<{ id: string }>
) => {
  const { id } = action.payload;
  if (state.apiOptions[id]) {
    state.apiOptions[id] = {
      ...state.apiOptions[id],
      isFetching: false,
      isLoaded: true,
      dateLastLoaded: new Date().toISOString(),
    };
  }
};

export const successLoading = (
  state: UsersState,
  action: PayloadAction<{ id: string }>
) => {
  const { id } = action.payload;
  if (state.apiOptions[id]) {
    state.apiOptions[id] = {
      ...state.apiOptions[id],
      isLoaded: true,
      isFetching: false,
      dateLastLoaded: new Date().toISOString(),
    };
  }
};

export default {
  setUsers,
  addUser,
  updateUser,
  removeUser,
  startLoading,
  failLoading,
  successLoading,
};
