export enum Status {
  idle = "IDLE",
  loading = "LOADING",
  success = "SUCESS",
  failed = "FAILED",
}

export interface BaseReduxState {
  apiOptions?: { [id: string]: ApiOptions };
  status: Status;
}

export interface ReduxStateV1 {
  data: any[];
}
export interface ReduxStateV2 {
  data: {
    [key: string]: any;
  };
}

export interface BaseReduxService {
  id?: "all" | string;
  optimistic?: boolean;
  callback?: (...args: any[]) => void;
}

interface ApiOptions {
  isFetching: boolean;
  isLoaded: boolean;
  ttl: number;
  dateLastLoaded: Date;
}
