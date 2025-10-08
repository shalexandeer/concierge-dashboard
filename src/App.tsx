import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/templates/ThemeProvider";
import Router from "@/router/router";
import { GEOCODING_API_KEY } from "@/lib/constant/env";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { APIProvider } from "@vis.gl/react-google-maps";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastContainer />
        <ThemeProvider>
          <APIProvider apiKey={GEOCODING_API_KEY}>
            <Toaster />
            <Sonner />
            <Router />
          </APIProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
