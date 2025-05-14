import { useState, useEffect, useCallback } from "react";
import {
  UserListProps,
  UserListState,
  UserListHandlers,
} from "./userList.types";
import { RootState, useDispatch, useSelector } from "@/core/redux";
import UserThunk from "@/core/redux/users";

export const useUserList = (props: UserListProps) => {
  const dispatch = useDispatch();
  const { title } = props;

  const users = useSelector((state: RootState) => state.users.data);

  useEffect(() => {
    dispatch(
      UserThunk.fetchUsers({
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
