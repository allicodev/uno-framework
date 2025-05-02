import API from "./api.service";
import { ExtendedResponse, User } from "@/core/types";
import { isAuthenticated } from "@/core/utils/token.utils";
abstract class UsersService {
  private static readonly BASE_ENDPOINT = "/users";

  public static async getUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<ExtendedResponse<User[]>> {
    return await API.get<User[]>({
      endpoint: `${this.BASE_ENDPOINT}`,
      query: { page, limit },
    });
  }

  public static async getUserById(id: string): Promise<ExtendedResponse<User>> {
    return API.get<User>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
    });
  }

  public static async createUser(
    userData: Partial<User>
  ): Promise<ExtendedResponse<User>> {
    return API.post<User>({
      endpoint: `${this.BASE_ENDPOINT}`,
      payload: userData,
    });
  }

  public static async updateUser(
    id: string,
    userData: Partial<User>
  ): Promise<ExtendedResponse<User>> {
    return await API.post<User>({
      endpoint: `${this.BASE_ENDPOINT}/${id}`,
      payload: userData,
    });
  }
}

export default UsersService;
