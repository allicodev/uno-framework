import { ApiOption, User } from "@/core/types";

interface UsersState {
  data: User[];
  apiOptions: {
    [key: string]: ApiOption;
  };
}

export type { UsersState };
