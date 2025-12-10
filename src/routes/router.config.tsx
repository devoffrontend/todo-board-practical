import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { publicRoutes } from "./public/public.routes";
import { protectedRoutes } from "./protected";
import { PageLoader } from "@/components";

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

export const RouterConfig = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);

