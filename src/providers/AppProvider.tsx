"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MuiThemeProvider from "./MuiProviders";
import { useState } from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}
