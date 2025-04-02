import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { shouldFetch } from "../redux.helper";
import { GetUsersParams, GetUserByIdParams, User } from "@/core/types";
import { UserService } from "@/core/providers/service";
import { RootState } from "../store";

// Fetch multiple users with pagination, sorting, filtering
const getUsers = createAsyncThunk<
  { users: User[]; total: number },
  GetUsersParams,
  { state: RootState }
>(
  "users/getUsers",
  async (params, thunk) => {
    const { dispatch, getState, requestId } = thunk;
    const state = getState();
    const token = state.auth.token;

    const cacheParams = {
      dispatch,
      state: getState(),
      reduxKey: "users",
      id: params.id || "all",
      ttl: 300, // Cache for 5 minutes
    };

    if (shouldFetch(cacheParams)) {
      const res = await UserService.getUsers({ ...params, token });
      if (res?.success ?? false) {
        return thunk.fulfillWithValue({ 
          users: res?.data as User[],
          total: res?.meta?.total || res?.data?.length || 0
        });
      }
      return thunk.rejectWithValue({ error: res?.message || "Failed to fetch users" });
    }
    return thunk.rejectWithValue({ error: "Data fetch skipped due to caching" });
  },
  { idGenerator: (params) => params?.id ?? uuidv4() }
);

// Fetch a single user by ID
const getUserById = createAsyncThunk<
  { user: User },
  GetUserByIdParams,
  { state: RootState }
>(
  "users/getUserById",
  async (params, thunk) => {
    const { dispatch, getState, requestId } = thunk;
    const state = getState();
    const token = state.auth.token;

    const cacheParams = {
      dispatch,
      state: getState(),
      reduxKey: "users",
      id: `user_${params.userId}`,
      ttl: 300, // Cache for 5 minutes
    };

    if (shouldFetch(cacheParams)) {
      const res = await UserService.getUserById({ ...params, token });
      if (res?.success ?? false) {
        return thunk.fulfillWithValue({ user: res?.data as User });
      }
      return thunk.rejectWithValue({ error: res?.message || "Failed to fetch user" });
    }
    return thunk.rejectWithValue({ error: "Data fetch skipped due to caching" });
  },
  { idGenerator: (params) => params?.id ?? uuidv4() }
);

// Create a new user
const createUser = createAsyncThunk<
  { user: User },
  { userData: Partial<User>; id?: string },
  { state: RootState }
>(
  "users/createUser",
  async (params, thunk) => {
    const state = thunk.getState();
    const token = state.auth.token;

    const res = await UserService.createUser(params.userData, token);
    if (res?.success ?? false) {
      return thunk.fulfillWithValue({ user: res?.data as User });
    }
    return thunk.rejectWithValue({ error: res?.message || "Failed to create user" });
  },
  { idGenerator: (params) => params?.id ?? uuidv4() }
);

// Delete a user
const deleteUser = createAsyncThunk<
  { userId: string },
  { userId: string; id?: string },
  { state: RootState }
>(
  "users/deleteUser",
  async (params, thunk) => {
    const state = thunk.getState();
    const token = state.auth.token;

    const res = await UserService.deleteUser(params.userId, token);
    if (res?.success ?? false) {
      return thunk.fulfillWithValue({ userId: params.userId });
    }
    return thunk.rejectWithValue({ error: res?.message || "Failed to delete user" });
  },
  { idGenerator: (params) => params?.id ?? uuidv4() }
);

export { getUsers, getUserById, createUser, deleteUser };
