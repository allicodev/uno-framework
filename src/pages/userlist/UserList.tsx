import React from "react";
import { useUserList } from "./userList.hooks";
import { UserListProps } from "./userList.types";

import "./userList.styles.scss";

const UserList = (props: UserListProps) => {
  const { handlers } = useUserList(props);

  return <>UserList</>;
};

export default UserList;
