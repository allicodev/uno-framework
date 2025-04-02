import { User } from "@/core/providers/service/users.service";

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

export interface UserListHandlers {
  handleRefresh: () => void;
  handlePageChange: (page: number) => void;
  handleUserSelect: (user: User) => void;
}
