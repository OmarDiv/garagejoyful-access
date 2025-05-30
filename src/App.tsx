
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import ReservationsHistory from "./pages/ReservationsHistory";
import UserSettings from "./pages/UserSettings";
import { useState } from "react";
import RequireAuth from "./components/auth/RequireAuth";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/reservations" 
            element={
              <RequireAuth>
                <ReservationsHistory />
              </RequireAuth>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <RequireAuth>
                <UserSettings />
              </RequireAuth>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
