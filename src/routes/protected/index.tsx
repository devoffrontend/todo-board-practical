import type { RouteObject } from "react-router-dom";
import { dashboardRoutes } from "./dashboard.routes";

export const protectedRoutes: RouteObject[] = [
  ...dashboardRoutes,
];

