import { PayloadAction } from "@reduxjs/toolkit";
import { CounterState } from "@/core/redux/redux.types";

const reducer = {
  increment: (state: CounterState) => {
    state.value += 1;
  },
  decrement: (state: CounterState) => {
    state.value -= 1;
  },
  incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
    state.value += action.payload;
  },
};

export default reducer;
