import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VetNavigation } from "@/components/VetNavigation";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Pets from "./pages/Pets";
import Appointments from "./pages/Appointments";
import Consultations from "./pages/Consultations";
import History from "./pages/History";
import Farm from "./pages/Farm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={
              <>
                <VetNavigation />
                <Dashboard />
              </>
            } />
            <Route path="/clients" element={
              <>
                <VetNavigation />
                <Clients />
              </>
            } />
            <Route path="/pets" element={
              <>
                <VetNavigation />
                <Pets />
              </>
            } />
            <Route path="/appointments" element={
              <>
                <VetNavigation />
                <Appointments />
              </>
            } />
            <Route path="/consultations" element={
              <>
                <VetNavigation />
                <Consultations />
              </>
            } />
            <Route path="/history" element={
              <>
                <VetNavigation />
                <History />
              </>
            } />
            <Route path="/farm" element={
              <>
                <VetNavigation />
                <Farm />
              </>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
