interface ReduxBaseType {
  data: any[] | { [key: string]: any[] };
  requestOpt: {
    [key: string]: ApiOption;
  };
  meta: {
    [key: string]: Meta;
  };
}

interface ApiOption extends Meta {
  isLoaded: boolean;
  isFetching: boolean;
  ttl: number;
  dateLastLoaded: string;
}

interface Meta {
  page?: number;
  total?: number;
}

export type { ReduxBaseType, ApiOption };
