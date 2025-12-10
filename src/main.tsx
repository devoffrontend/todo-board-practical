import { TooltipProvider } from "@/components";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./auth";
import "./index.css";
import { QueryProvider } from "./providers";
import { AppRouter } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <TooltipProvider delayDuration={200}>
          <AppRouter />
        </TooltipProvider>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);
