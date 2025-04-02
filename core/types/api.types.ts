export interface Response {
  code: number;
  success: boolean;
  message?: string;
}

export interface ExtendedResponse<T> extends Response {
  data?: T;
  meta?: {
    total: number;
    [key: string]: any;
  };
}

export interface ApiGetProps {
  endpoint: string;
  query?: Record<any, any>;
  publicRoute?: boolean;
  token?: string | null;
}

export interface ApiPostProps {
  endpoint: string;
  payload?: Record<any, any>;
  publicRoute?: boolean;
  token?: string | null;
}
