import { User } from "@/core/providers/service/users.service";

interface UsersState {
  data: User[];
  selectedUser: User | null;
  apiOptions: {
    [key: string]: {
      isFetching: boolean;
      isLoaded: boolean;
      ttl: number;
      dateLastLoaded: string | null;
    };
  };
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export type { UsersState };
