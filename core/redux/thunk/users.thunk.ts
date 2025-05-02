import { createAsyncThunk } from "@reduxjs/toolkit";
import UsersService from "@/core/providers/service/users.service";
import {
  setUsers,
  addUser,
  updateUser,
  startLoading,
  failLoading,
} from "../slice/users.slice";
import { shouldFetch } from "../redux.helper";
import { RootState } from "../store";
import { getToken } from "@/core/utils/token.utils";

const reduxKey = "users";

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    {
      page = 1,
      limit = 10,
      forceFetch = false,
      cb = false,
    }: {
      page?: number;
      limit?: number;
      forceFetch?: boolean;
      cb?: Function | boolean | null;
    },
    { dispatch, getState }
  ) => {
    // Use provided token or get from localStorage
    const state = getState() as RootState;
    const id = `users_page_${page}_limit_${limit}`;

    // Check if we should fetch the data or use cached data
    if (
      !shouldFetch({
        id,
        state,
        dispatch,
        reduxKey,
        ttl: 300, // 5 minutes cache
        forceFetch,
      })
    ) {
      return;
    }

    try {
      dispatch(startLoading({ id }));
      const response = await UsersService.getUsers(page, limit);

      if (response.success && response.data) {
        const payload = {
          id,
          page,
          data: response.data,
          total: response.data.length,
          isFetching: false,
          isLoaded: true,
        };
        dispatch(setUsers(payload));

        typeof cb == "function" && cb(true, response.data);
      } else {
        typeof cb == "function" &&
          cb(false, response.message || "Failed to fetch users");
      }

      return response;
    } catch (error) {
      dispatch(failLoading({ id }));
      typeof cb == "function" && cb(false, error || "Failed to fetch users");
    }
  }
);

// Async thunk for fetching a single user
// export const fetchUserById = createAsyncThunk(
//   "users/fetchUserById",
//   async (
//     {
//       id,
//       token,
//       forceFetch = false,
//     }: { id: string; token?: string; forceFetch?: boolean },
//     { dispatch, getState }
//   ) => {
//     // Use provided token or get from localStorage
//     const authToken = token || getToken();
//     const state = getState() as RootState;
//     const requestId = `user_${id}`;

//     // Check if we should fetch the data or use cached data
//     if (
//       !shouldFetch({
//         id: requestId,
//         state,
//         dispatch,
//         reduxKey: "users",
//         ttl: 300, // 5 minutes cache
//         forceFetch,
//       })
//     ) {
//       return;
//     }

//     try {
//       dispatch(startLoading({ id: requestId }));

//       const response = await UsersService.getUserById(id, authToken);

//       if (response.success && response.data) {
//         dispatch(setSelectedUser(response.data));
//         dispatch(successLoading({ id: requestId }));
//       } else {
//         dispatch(failLoading({ id: requestId }));
//         throw new Error(response.message || "Failed to fetch user");
//       }

//       return response;
//     } catch (error) {
//       dispatch(failLoading({ id: requestId }));
//       throw error;
//     }
//   }
// );

// // Async thunk for creating a user
// export const createUserThunk = createAsyncThunk(
//   "users/createUser",
//   async (
//     { userData, token }: { userData: any; token: string },
//     { dispatch }
//   ) => {
//     try {
//       const response = await UsersService.createUser(userData, token);

//       if (response.success && response.data) {
//         dispatch(addUser(response.data));
//       } else {
//         throw new Error(response.message || "Failed to create user");
//       }

//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// // Async thunk for updating a user
// export const updateUserThunk = createAsyncThunk(
//   "users/updateUser",
//   async (
//     { id, userData, token }: { id: string; userData: any; token: string },
//     { dispatch }
//   ) => {
//     try {
//       const response = await UsersService.updateUser(id, userData, token);

//       if (response.success && response.data) {
//         dispatch(updateUser(response.data));
//       } else {
//         throw new Error(response.message || "Failed to update user");
//       }

//       return response;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
