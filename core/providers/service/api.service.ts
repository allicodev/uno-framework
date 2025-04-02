import axios from "axios";
import _ from "lodash";

import { ExtendedResponse, ApiGetProps, ApiPostProps } from "@/core/types";
import ApiConfig from "@/config/api.config";
import { getToken } from "@/core/utils/token.utils";

abstract class API {
  public static async get<T>({
    endpoint,
    query,
    token,
    publicRoute = false,
  }: ApiGetProps): Promise<ExtendedResponse<T>> {
    // Use provided token or get from localStorage
    const authToken = token || getToken();

    const request = await axios.get(
      `${ApiConfig.getBaseUrl(process.env.NEXT_IS_PROD == "true")}${endpoint}`,
      {
        params: query,
        headers: {
          "Content-Type": "application/json",
          ...(!publicRoute && authToken
            ? { Authorization: `Bearer ${authToken}` }
            : {}),
        },
      }
    );

    if (request.data.success)
      return {
        success: true,
        code: request?.status || 200,
        ..._.pick(request.data, ["message", "data", "meta"]),
      };
    else
      return {
        success: false,
        code: 500,
        message: "There is an error in the Server.",
      };
  }

  public static async post<T>({
    endpoint,
    payload,
    token,
    publicRoute = false,
  }: ApiPostProps): Promise<ExtendedResponse<T>> {
    // Use provided token or get from localStorage
    const authToken = token || getToken();

    const request = await axios.post(
      `${ApiConfig.getBaseUrl(process.env.NEXT_IS_PROD == "true")}${endpoint}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          ...(!publicRoute && authToken
            ? { Authorization: `Bearer ${authToken}` }
            : {}),
        },
      }
    );
    if (request.data.success)
      return {
        success: true,
        code: request.status,
        ..._.pick(request.data, ["message", "data"]),
      };
    else
      return {
        ...request.data,
        success: false,
      };
  }
}

export default API;
