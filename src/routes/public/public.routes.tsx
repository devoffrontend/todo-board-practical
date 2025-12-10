import { PageLoader } from "@/components";
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { PublicRoute } from "../PublicRoute";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/auth/login/LoginPage"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <Suspense fallback={<PageLoader />}>
          <HomePage />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      </PublicRoute>
    ),
  },
];
