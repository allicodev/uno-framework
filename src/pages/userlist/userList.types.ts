import { User } from "@/core/types";

export interface UserListProps {
  // Component props
  title?: string;
}

export interface UserListState {
  isLoading: boolean;
  users: User[];
  error: string | null;
  page: number;
  limit: number;
  total: number;
}

export interface UserListHandlers {}
