import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useUserList } from "./userList.hooks";
import { UserListProps } from "./userList.types";
import { User } from "@/core/providers/service/users.service";
import {
  isAuthenticated,
  setToken,
  removeToken,
} from "@/core/utils/token.utils";

import "./userList.styles.scss";

const UserListComponent: React.FC<UserListProps> = (props) => {
  const [authToken, setAuthToken] = useState<string>("");
  const [isAuth, setIsAuth] = useState<boolean>(false);

  // Update auth status after component mounts
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  const { state, handlers, selectedUser } = useUserList(props);
  const { isLoading, users, error, page, total, limit } = state;
  const { handleRefresh, handlePageChange, handleUserSelect } = handlers;

  // Handle token input change
  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthToken(e.target.value);
  };

  // Login with token
  const handleLogin = () => {
    if (authToken.trim()) {
      setToken(authToken.trim());
      setIsAuth(true);
      handleRefresh(); // Refresh with the new token
    }
  };

  // Logout
  const handleLogout = () => {
    removeToken();
    setAuthToken("");
    setIsAuth(false);
    handleRefresh(); // Refresh to show public data
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>{props.title || "User List"}</h1>
        <div className="action-buttons">
          <button
            className="refresh-button"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="auth-section">
        <div className="auth-status">
          <span
            className={`status-indicator ${
              isAuth ? "authenticated" : "unauthenticated"
            }`}
          ></span>
          <span>Status: {isAuth ? "Authenticated" : "Not Authenticated"}</span>
        </div>

        {!isAuth ? (
          <div className="login-form">
            <input
              type="text"
              placeholder="Enter auth token"
              value={authToken}
              onChange={handleTokenChange}
            />
            <button
              className="login-button"
              onClick={handleLogin}
              disabled={!authToken.trim()}
            >
              Login
            </button>
          </div>
        ) : (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading && !users.length ? (
        <div className="loading-indicator">Loading users...</div>
      ) : (
        <>
          <div className="users-grid">
            {users.length === 0 ? (
              <div className="no-users">No users found</div>
            ) : (
              users.map((user: User) => (
                <div
                  key={user.id}
                  className={`user-card ${
                    selectedUser?.id === user.id ? "selected" : ""
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="user-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    {user.role && (
                      <span className="user-role">{user.role}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {total > limit && (
            <div className="pagination">
              <button
                disabled={page === 1 || isLoading}
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </button>
              <span>
                Page {page} of {Math.ceil(total / limit)}
              </span>
              <button
                disabled={page >= Math.ceil(total / limit) || isLoading}
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* User details panel - shown when a user is selected */}
      {selectedUser && (
        <div className="user-details-panel">
          <h2>User Details</h2>
          <div className="user-details">
            <p>
              <strong>ID:</strong> {selectedUser.id}
            </p>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            {selectedUser.role && (
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap the component with dynamic import to disable SSR
// This completely avoids hydration issues by only rendering on the client
const UserList = dynamic(() => Promise.resolve(UserListComponent), {
  ssr: false,
});

export default UserList;
