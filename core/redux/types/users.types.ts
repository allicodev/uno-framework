import { ApiOption } from "@/core/types";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

interface UsersState {
  data: User[];
  apiOptions: {
    [key: string]: ApiOption;
  };
}

export type { UsersState, User };
