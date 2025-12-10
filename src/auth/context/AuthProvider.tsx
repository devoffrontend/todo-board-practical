import { useCallback, useEffect, useState, type ReactNode } from "react";
import { authService } from "../services";
import type { AuthState, LoginCredentials } from "../types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const response = await authService.getCurrentUser();
          setState({
            user: response,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        authService.clearTokens();
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Authentication failed",
        });
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.login(credentials);
      setState({
        user: response,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      await authService.refreshAccessToken();
      const response = await authService.getCurrentUser();
      setState((prev) => ({
        ...prev,
        user: response,
      }));
    } catch {
      await logout();
    }
  }, [logout]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  const value = {
    ...state,
    login,
    logout,
    refreshToken,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
