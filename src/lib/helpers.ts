export const environmentVariables = {
  VITE_API_GATEWAY: import.meta.env.VITE_API_GATEWAY || "",
  VITE_ACCESS_TOKEN_KEY: import.meta.env.VITE_ACCESS_TOKEN_KEY || "",
  VITE_REFRESH_TOKEN_KEY: import.meta.env.VITE_REFRESH_TOKEN_KEY || "",
} as const;

