import { createAsyncThunk } from "@reduxjs/toolkit";
import UsersService from "@/core/providers/service/users.service";
import { setUsers, failLoading } from "./users.slice";
import { shouldFetch } from "../redux.helper";
import { RootState } from "..";


const reduxKey = "users";

interface FetchUserParams {
  page?: number;
  limit?: number;
  forceFetch?: boolean;
  callback?: Function | boolean | null;
}

// Async thunk for fetching users
const fetchUsers = createAsyncThunk(
  `${reduxKey}/fetchUsers`,
  async (params: FetchUserParams, thunkApi) => {
    const {
      page = 1,
      limit = 10,
      forceFetch = false,
      callback = false,
    } = params ?? {};

    const { dispatch, getState, requestId } = thunkApi ?? {};
    const id = requestId;

    const resourceParams = {
      id,
      state: getState() as RootState,
      dispatch,
      reduxKey,
      forceFetch,
    };

    // Check if we should fetch the data or use cached data
    if (shouldFetch(resourceParams)) {
      try {
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

          typeof callback == "function" && callback(true, response.data);
        } else {
          typeof callback == "function" &&
            callback(false, response.message || "Failed to fetch users");
        }

        return response;
      } catch (error) {
        dispatch(failLoading({ id }));
        typeof callback == "function" &&
          callback(false, error || "Failed to fetch users");
      }
    }

    return;
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

export default {
  fetchUsers,
};
