import { ExtendedResponse, GetUsersParams, GetUserByIdParams, User } from "@/core/types";
import API from "./api.service";

const routeName = "users";

export default abstract class UserService {
  public static getUsers = async (
    params: GetUsersParams = {}
  ): Promise<ExtendedResponse<User[]>> => {
    const { page, limit, search, sort, filter, token } = params;
    
    return await API.get({
      endpoint: `/${routeName}`,
      query: {
        page,
        limit,
        search,
        sort,
        ...filter,
      },
      token,
      publicRoute: false,
    });
  };

  public static getUserById = async (
    params: GetUserByIdParams
  ): Promise<ExtendedResponse<User>> =>
    await API.get({
      endpoint: `/${routeName}/${params.userId}`,
      query: {},
      token: params.token,
      publicRoute: false,
    });
  
  public static createUser = async (
    userData: Partial<User>,
    token: string | null = null
  ): Promise<ExtendedResponse<User>> =>
    await API.post({
      endpoint: `/${routeName}`,
      payload: userData,
      token,
      publicRoute: false,
    });
  
  public static deleteUser = async (
    userId: string,
    token: string | null = null
  ): Promise<ExtendedResponse<{ success: boolean }>> =>
    await API.post({
      endpoint: `/${routeName}/${userId}/delete`,
      token,
      publicRoute: false,
    });
}
