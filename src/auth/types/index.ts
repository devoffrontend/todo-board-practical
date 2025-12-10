export interface User {
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  username: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
}

