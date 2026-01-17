import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import BackToTop from "./components/BackToTop";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ErrorBoundary from "./components/ErrorBoundary";
import EnhancedSmoothScroll from "./components/EnhancedSmoothScroll";
import EnhancedCursor from "./components/EnhancedCursor";
import Global3DScene from "./components/Global3DScene";
import TechBirdScene from "./components/TechBirdScene";
import OverlayNavigation from "./components/OverlayNavigation";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { ServiceProvider } from "./contexts/ServiceContext";

const queryClient = new QueryClient();

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <main className="flex-1 w-full overflow-x-hidden relative z-10">
      {children}
    </main>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ServiceProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ErrorBoundary>
              <EnhancedSmoothScroll>
                <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-slate-950 relative">
                  {/* Lempens-Style Bird Flock Background */}
                  <TechBirdScene />
                  
                  {/* Global 3D Scene - Persists across all routes */}
                  <Global3DScene />
                
                {/* Enhanced Cursor */}
                <EnhancedCursor />
                
                {/* Overlay Navigation */}
                <OverlayNavigation />
                
                <GoogleAnalytics />
                <FloatingContact />
                <BackToTop />
                <Routes>
                  <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                  <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                  <Route path="/industries" element={<PageWrapper><Industries /></PageWrapper>} />
                  <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                  <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                  <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                  <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
                </Routes>
              </div>
              </EnhancedSmoothScroll>
            </ErrorBoundary>
          </BrowserRouter>
        </ServiceProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
