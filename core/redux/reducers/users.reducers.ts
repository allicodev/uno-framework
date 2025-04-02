import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/core/providers/service/users.service";
import { UsersState } from "../types/users.types";
import { fetchSuccessPayload } from "../redux.helper";

// Users reducer functions
export const setUsers = (state: UsersState, action: PayloadAction<User[]>) => {
  state.data = action.payload;
};

export const setSelectedUser = (state: UsersState, action: PayloadAction<User>) => {
  state.selectedUser = action.payload;
};

export const clearSelectedUser = (state: UsersState) => {
  state.selectedUser = null;
};

export const addUser = (state: UsersState, action: PayloadAction<User>) => {
  state.data.push(action.payload);
};

export const updateUser = (state: UsersState, action: PayloadAction<User>) => {
  const index = state.data.findIndex(user => user.id === action.payload.id);
  if (index !== -1) {
    state.data[index] = action.payload;
  }
  if (state.selectedUser?.id === action.payload.id) {
    state.selectedUser = action.payload;
  }
};

export const removeUser = (state: UsersState, action: PayloadAction<string>) => {
  state.data = state.data.filter(user => user.id !== action.payload);
  if (state.selectedUser?.id === action.payload) {
    state.selectedUser = null;
  }
};

export const setUsersMeta = (
  state: UsersState, 
  action: PayloadAction<{ total: number; page: number; limit: number }>
) => {
  state.meta = action.payload;
};

// API options caching reducers
export const startLoading = (state: UsersState, action: PayloadAction<{ id: string }>) => {
  const { id } = action.payload;
  if (state.apiOptions[id]) {
    state.apiOptions[id].isFetching = true;
  }
};

export const successLoading = (state: UsersState, action: PayloadAction<{ id: string }>) => {
  const { id } = action.payload;
  if (state.apiOptions[id]) {
    state.apiOptions[id] = {
      ...state.apiOptions[id],
      ...fetchSuccessPayload(),
    };
  }
};

export const failLoading = (state: UsersState, action: PayloadAction<{ id: string }>) => {
  const { id } = action.payload;
  if (state.apiOptions[id]) {
    state.apiOptions[id].isFetching = false;
  }
};
