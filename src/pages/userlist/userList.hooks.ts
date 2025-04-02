import { useState, useEffect, useCallback } from "react";
import {
  UserListProps,
  UserListState,
  UserListHandlers,
} from "./userList.types";
import { RootState } from "@/core/redux/store";
import { fetchUsers, fetchUserById } from "@/core/redux/thunk/users.thunk";
import { setSelectedUser } from "@/core/redux/slice/users.slice";
import { User } from "@/core/providers/service/users.service";
import { useAppDispatch, useAppSelector } from "@/core/redux";
import { safeIsAuthenticated } from "@/core/utils/token.utils";

const useDispatch = useAppDispatch;
const useSelector = useAppSelector;

export const useUserList = (props: UserListProps) => {
  const dispatch = useDispatch();
  const { title } = props;
  
  // Start with a safe default value for authentication status
  const [isAuth, setIsAuth] = useState(false);
  
  // Update authentication status after mount
  useEffect(() => {
    // Import dynamically to avoid SSR issues
    import('@/core/utils/token.utils').then(({ isAuthenticated }) => {
      setIsAuth(isAuthenticated());
    });
  }, []);

  // Get data from Redux store
  const users = useSelector((state: RootState) => state.users.data);
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );
  const meta = useSelector((state: RootState) => state.users.meta);
  const apiOptions = useSelector((state: RootState) => state.users.apiOptions);

  // Get loading state for the users list (using the default apiOption key)
  const isLoading = apiOptions["default"]?.isFetching || false;
  const error = apiOptions["default"]?.error || null;

  // Initialize local state
  const [state, setState] = useState<UserListState>({
    isLoading,
    users,
    error,
    page: meta.page,
    limit: meta.limit,
    total: meta.total,
  });

  // Update local state when Redux state changes
  useEffect(() => {
    setState({
      isLoading,
      users,
      error,
      page: meta.page,
      limit: meta.limit,
      total: meta.total,
    });
  }, [users, isLoading, error, meta]);

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers({ 
      page: meta.page, 
      limit: meta.limit,
    }));
  }, [dispatch, meta.page, meta.limit]);

  // Define handlers
  const handleRefresh = useCallback(() => {
    // Update authentication status before refresh
    setIsAuth(safeIsAuthenticated());
    
    dispatch(
      fetchUsers({
        page: meta.page,
        limit: meta.limit,
        forceFetch: true,
      })
    );
  }, [dispatch, meta.page, meta.limit]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(fetchUsers({ page, limit: meta.limit }));
    },
    [dispatch, meta.limit]
  );

  const handleUserSelect = useCallback(
    (user: User) => {
      dispatch(setSelectedUser(user));
      // Optionally fetch full user details if needed
      // dispatch(fetchUserById(user.id));
    },
    [dispatch]
  );

  const handlers: UserListHandlers = {
    handleRefresh,
    handlePageChange,
    handleUserSelect,
  };

  return {
    state,
    handlers,
    selectedUser, // Also return the selected user from Redux
  };
};
