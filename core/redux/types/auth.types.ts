import { BaseReduxState, Token } from "@/core/types";

interface AuthState extends BaseReduxState, Token {
  // we can add additional auth security states here in the near future
}

export type { AuthState };
