import _ from "lodash";
import dayjs from "dayjs";
import { Reducer } from "@reduxjs/toolkit";

// reducers

interface Params {
  id: string;
  state: any;
  dispatch: any;
  reduxKey: string;

  // etc
  ttl?: number;
  forceFetch?: boolean;
}

const shouldFetch = (params: Params): boolean => {
  if (params?.forceFetch ?? false) return true;
  const { state, dispatch, id, reduxKey, ttl: ttlParams } = params;
  const resources = _.cloneDeep(state[reduxKey] || {});

  const checkOptions = Object.keys(resources?.apiOptions ?? {}).find(
    (_id: string) => _id == id
  );

  if (!_.isNil(checkOptions)) {
    const { isFetching, isLoaded, ttl, dateLastLoaded } =
      resources.apiOptions[id];

    if (isFetching || isLoaded) return false;

    if (!_.isNil(dateLastLoaded)) {
      return dayjs().diff(dateLastLoaded, "second") >= ttl;
    }
    // If dateLastLoaded is nil, we should fetch
    return true;
  } else {
    dispatch({
      type: `${reduxKey}/newOption`,
      payload: { id, ttl: ttlParams },
    });
    return true;
  }
};

const withDynamicOptions = <State>(
  baseReducer: Reducer<State>,
  reduxKey: string
): Reducer<State> => {
  return (state: any, action: { type: string; payload?: any }): State => {
    const { id, ttl } = action?.payload ?? {};

    switch (action.type) {
      case `${reduxKey}/newOption`: {
        return {
          ...state,
          apiOptions: {
            ...state.apiOptions,
            [id]: {
              isFetching: true,
              isLoaded: false,
              ttl: ttl ?? 300,
              dateLastLoaded: null,
            },
          },
        };
      }

      case `${reduxKey}/updateOption`: {
        return {
          ...state,
          apiOptions: {
            ...state.apiOptions,
            [id]: {
              ...state.apiOptions[id],
              ..._.omit(action.payload, "id"),
            },
          },
        };
      }
      default:
        return baseReducer(state, action);
    }
  };
};

export { shouldFetch, withDynamicOptions };
