interface ReduxBaseType {
  data: any[] | { [key: string]: any[] };
  requestOpt: {
    [key: string]: ApiOption;
  };
  meta: {
    [key: string]: Meta;
  };
}

interface ApiOption {
  isLoaded: boolean;
  isFetching: false;
  ttl: number;
  dateLastLoaded: Date;
}

interface Meta {
  page?: number;
  total: number;
  createdLast: Date;
}

export type { ReduxBaseType };
