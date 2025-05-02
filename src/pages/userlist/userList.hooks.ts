import { useState, useEffect, useCallback } from "react";
import {
  UserListProps,
  UserListState,
  UserListHandlers,
} from "./userList.types";
import { RootState } from "@/core/redux/store";
import { fetchUsers } from "@/core/redux/thunk/users.thunk";
import { useAppDispatch, useAppSelector } from "@/core/redux";
import { safeIsAuthenticated } from "@/core/utils/token.utils";

const useDispatch = useAppDispatch;
const useSelector = useAppSelector;

export const useUserList = (props: UserListProps) => {
  const dispatch = useDispatch();
  const { title } = props;

  // const [isAuth, setIsAuth] = useState(false);

  // // Update authentication status after mount
  // useEffect(() => {
  //   // Import dynamically to avoid SSR issues
  //   import("@/core/utils/token.utils").then(({ isAuthenticated }) => {
  //     setIsAuth(isAuthenticated());
  //   });
  // }, []);

  const users = useSelector((state: RootState) => state.users.data);

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: 1,
        limit: 10,
      })
    );
  }, []);

  const handlers: UserListHandlers = {};

  return {
    handlers,
  };
};
