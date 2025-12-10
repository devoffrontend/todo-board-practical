import { environmentVariables } from "@/lib/helpers";


class HttpService {
  private readonly baseURL: string;
  private readonly headers: Record<string, string>;
  private readonly tokenKey: string;

  constructor(baseURL: string = environmentVariables.VITE_API_GATEWAY ? `${environmentVariables.VITE_API_GATEWAY}` : "http://localhost:3001") {
    this.baseURL = baseURL;
    this.tokenKey = environmentVariables.VITE_ACCESS_TOKEN_KEY || "access_token";
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * Get access token from localStorage
   */
  private getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.tokenKey) || null;
  }

  withBaseURL(newBaseURL: string): HttpService {
    return new HttpService(newBaseURL);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    let data;

    try {
      data = isJson ? await response.json() : await response.text();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Failed to parse response");
    }

    if (!response.ok) {
      const errorMessage = isJson && data.error ? data.error : `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  }

  private async request<T>(method: string, url: string, payload?: unknown, options: RequestInit = {}): Promise<T> {
    try {
      const fullUrl = url.startsWith("http") ? url : `${this.baseURL}${url.startsWith("/") ? url : `/${url}`}`;

      const timeoutDuration = 30000;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

      // Merge default headers with any custom headers
      const headers: Record<string, string> = {
        ...this.headers,
      };

      // Convert options.headers to plain object if it's a Headers object
      if (options.headers) {
        if (options.headers instanceof Headers) {
          options.headers.forEach((value, key) => {
            headers[key] = value;
          });
        } else if (typeof options.headers === "object") {
          Object.assign(headers, options.headers);
        }
      }

      // Automatically add Authorization header if token exists and not explicitly skipped
      const skipAuth = (options as { skipAuth?: boolean }).skipAuth;
      if (!skipAuth) {
        const token = this.getAccessToken();
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      // Remove skipAuth from options if present and prepare clean options
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { skipAuth: _skipAuth, ...restOptions } = options as { skipAuth?: boolean } & RequestInit;

      const requestOptions: RequestInit = {
        method,
        headers,
        signal: controller.signal,
        ...restOptions,
      };

      if (method !== "GET" && payload !== undefined) {
        requestOptions.body = typeof payload === "string" ? payload : JSON.stringify(payload);
      }

      try {
        const response = await fetch(fullUrl, requestOptions);
        clearTimeout(timeoutId);
        return await this.handleResponse<T>(response);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          throw new Error("Request timeout");
        }
        if (typeof window !== "undefined" && !navigator.onLine) {
          throw new Error("No internet connection");
        }
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Something went wrong");
    }
  }

  async get<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>("GET", url, undefined, options);
  }

  async post<T>(url: string, payload?: unknown, options: RequestInit = {}): Promise<T> {
    return this.request<T>("POST", url, payload, options);
  }

  async put<T>(url: string, payload?: unknown, options: RequestInit = {}): Promise<T> {
    return this.request<T>("PUT", url, payload, options);
  }

  async patch<T>(url: string, payload?: unknown, options: RequestInit = {}): Promise<T> {
    return this.request<T>("PATCH", url, payload, options);
  }

  async delete<T>(url: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>("DELETE", url, undefined, options);
  }
}

export const httpService = new HttpService();
