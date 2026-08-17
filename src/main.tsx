import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Route as IndexRoute } from "@/routes/index";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const IndexComponent = IndexRoute.options.component as React.ComponentType;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      <IndexComponent />
    </QueryClientProvider>
  </React.StrictMode>,
);
