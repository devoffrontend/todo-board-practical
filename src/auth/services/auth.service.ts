import { environmentVariables } from "@/lib/helpers";
import { httpService } from "@/services/http-services";

import type {
  AuthResponse,
  AuthTokens,
  LoginCredentials,
  User,
} from "../types";

class AuthService {
  private readonly tokenKey: string;
  private readonly refreshTokenKey: string;

  constructor() {
    this.tokenKey =
      environmentVariables.VITE_ACCESS_TOKEN_KEY || "access_token";
    this.refreshTokenKey =
      environmentVariables.VITE_REFRESH_TOKEN_KEY || "refresh_token";
  }

  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.tokenKey, tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
    }
  }

  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.tokenKey) || null;
  }

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.refreshTokenKey) || null;
  }

  clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await httpService.post<AuthResponse>(
        "/auth/login",
        credentials,
        {
          skipAuth: true,
        } as RequestInit
      );
      console.log("response", response);
      if (response.accessToken && response.refreshToken) {
        this.setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });
      }
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Login failed");
      }
      throw new Error("Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getAccessToken();
      if (token && token !== "") {
        await httpService.post("/auth/logout", {});
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      this.clearTokens();
    }
  }

  async refreshAccessToken(): Promise<AuthTokens> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await httpService.post<AuthTokens>(
        "/auth/refresh",
        { refreshToken },
        { skipAuth: true } as RequestInit
      );

      if (response.accessToken) {
        this.setTokens(response);
      }

      return response;
    } catch (error) {
      this.clearTokens();
      if (error instanceof Error) {
        throw new Error(error.message || "Token refresh failed");
      }
      throw new Error("Token refresh failed");
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const token = this.getAccessToken();
      if (!token || token === "") {
        throw new Error("No access token available");
      }

      const response = await httpService.get<User>("/auth/me");

      return response as User;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Failed to get user");
      }
      throw new Error("Failed to get user");
    }
  }
}

export const authService = new AuthService();
