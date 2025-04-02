import { BaseReduxState } from "./redux.types";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UsersState extends BaseReduxState {
  users: { [id: string]: User }; // Normalized collection of users
  allIds: string[];
  selectedUserId: string | null;
}

export interface GetUsersParams {
  id?: string;
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  filter?: Record<string, any>;
  token?: string | null;
}

export interface GetUserByIdParams {
  id?: string;
  userId: string;
  token?: string | null;
}
