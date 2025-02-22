import { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/core/redux/types";

const reducer = {
  removeToken: (state: AuthState) => {
    state.token = null;
  },
};

export default reducer;
