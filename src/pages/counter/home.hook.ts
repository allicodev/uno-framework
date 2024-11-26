import { useAppSelector, useAppDispatch } from "@/core/redux";
import { increment, decrement } from "@/core/redux/slice/counter.slice";

const useHome = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());

  return { count, handleIncrement, handleDecrement };
};

export default useHome;
