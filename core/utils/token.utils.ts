/**
 * Token utility functions for authentication
 */

const TOKEN_KEY = "auth_token";

export const getToken = (): string | null => {
  // Only access localStorage in browser environment
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error setting token in localStorage:", error);
  }
};

export const removeToken = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token from localStorage:", error);
  }
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Safe version of isAuthenticated that returns false during server-side rendering
 * This is useful for avoiding hydration mismatches in components
 */
export const safeIsAuthenticated = (): boolean => {
  // Always return false for SSR to prevent hydration mismatches
  if (typeof window === "undefined") {
    return false;
  }
  return isAuthenticated();
};
