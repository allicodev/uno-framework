import { ExtendedResponse, LoginProps, Token } from "@/core/types";
import API from "./api.service";

const routeName = "auth";

export default abstract class LoginService {
  public static login = async (
    query: LoginProps,
    publicRoute = true
  ): Promise<ExtendedResponse<Token>> =>
    await API.get({
      endpoint: `/${routeName}/login`,
      query,
      publicRoute,
    });
}
