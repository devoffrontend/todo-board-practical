import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Suspense } from "react";
import { ProtectedRoute } from "../ProtectedRoute";
import { PageLoader } from "@/components";

const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<PageLoader />}>
          <DashboardPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
];

