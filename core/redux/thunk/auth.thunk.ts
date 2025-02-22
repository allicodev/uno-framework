import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { shouldFetch } from "../redux.helper";
import { LoginProps } from "@/core/types";

import { LoginService } from "@/core/providers/service";

const login = createAsyncThunk<any, LoginProps>(
  "user/getUser",
  async ({ username, password }, thunk) => {
    const { dispatch, getState, requestId } = thunk;

    const params = {
      dispatch,
      state: getState(),
      reduxKey: "all",
      id: requestId,
      ttl: 60,
    };

    if (shouldFetch(params)) {
      const res = await LoginService.login({ username, password });

      if (res?.success ?? false)
        return thunk.fulfillWithValue({ token: res?.data?.token });
    } else return thunk.rejectWithValue(null);
  },
  { idGenerator: (params) => params?.id ?? uuidv4() }
);

export { login };
