import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { RouterConfig } from "./router.config";
import { PageLoader } from "@/components";

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={RouterConfig} />
    </Suspense>
  );
};

