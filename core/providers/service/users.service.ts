import API from "./api.service";
import { ExtendedResponse } from "@/core/types";
import { getToken, isAuthenticated } from "@/core/utils/token.utils";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

abstract class UsersService {
  private static readonly BASE_ENDPOINT = "/users";

  public static async getUsers(page: number = 1, limit: number = 10, token?: string): Promise<ExtendedResponse<User[]>> {
    // If a token is explicitly passed, use it. Otherwise, let the API service handle it.
    const isPublic = !(token || isAuthenticated());

    return API.get<User[]>({
      endpoint: `${this.BASE_ENDPOINT}`,
      query: { page, limit },
      token,
      publicRoute: isPublic,
    });
  }

  public static async getUserById(id: string, token?: string): Promise<ExtendedResponse<User>> {
    // If a token is explicitly passed, use it. Otherwise, let the API service handle it.
    const isPublic = !(token || isAuthenticated());

    return API.get<User>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      token,
      publicRoute: isPublic,
    });
  }

  public static async createUser(userData: Partial<User>, token?: string): Promise<ExtendedResponse<User>> {
    return API.post<User>({
      endpoint: `${this.BASE_ENDPOINT}`,
      payload: userData,
      token,
      publicRoute: false, // Create always requires authentication
    });
  }

  public static async updateUser(id: string, userData: Partial<User>, token?: string): Promise<ExtendedResponse<User>> {
    return API.post<User>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      payload: userData,
      token,
      publicRoute: false, // Update always requires authentication
    });
  }
}

export default UsersService;
