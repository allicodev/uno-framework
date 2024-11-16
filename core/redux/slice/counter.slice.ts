import { createSlice } from "@reduxjs/toolkit";

import { counterReducer } from "../reducers";
import { CounterState } from "../redux.types";

const initialState = { value: 0 } satisfies CounterState;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: counterReducer,
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
