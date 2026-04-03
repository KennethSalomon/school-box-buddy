import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute, AdminRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import SplashScreen from "./pages/user/SplashScreen";
import OnboardingScreen from "./pages/user/OnboardingScreen";
import LoginScreen from "./pages/user/LoginScreen";
import RegisterScreen from "./pages/user/RegisterScreen";
import HomeScreen from "./pages/user/HomeScreen";
import SchoolSearchScreen from "./pages/user/SchoolSearchScreen";
import CatalogScreen from "./pages/user/CatalogScreen";
import MyBoxScreen from "./pages/user/MyBoxScreen";
import CheckoutScreen from "./pages/user/CheckoutScreen";
import DeliveryScreen from "./pages/user/DeliveryScreen";
import PaymentScreen from "./pages/user/PaymentScreen";
import OrderTrackingScreen from "./pages/user/OrderTrackingScreen";
import OrderHistoryScreen from "./pages/user/OrderHistoryScreen";
import ReferralScreen from "./pages/user/ReferralScreen";
import LoyaltyScreen from "./pages/user/LoyaltyScreen";
import ProfileScreen from "./pages/user/ProfileScreen";

import AdminLoginScreen from "./pages/admin/AdminLoginScreen";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCatalog from "./pages/admin/AdminCatalog";
import AdminSchools from "./pages/admin/AdminSchools";
import AdminStats from "./pages/admin/AdminStats";
import AdminUsers from "./pages/admin/AdminUsers";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Navigate to="/app" replace />} />
              <Route path="/app" element={<SplashScreen />} />
              <Route path="/app/onboarding" element={<OnboardingScreen />} />
              <Route path="/app/login" element={<LoginScreen />} />
              <Route path="/app/register" element={<RegisterScreen />} />

              {/* Protected user routes */}
              <Route path="/app/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
              <Route path="/app/search" element={<ProtectedRoute><SchoolSearchScreen /></ProtectedRoute>} />
              <Route path="/app/catalog" element={<ProtectedRoute><CatalogScreen /></ProtectedRoute>} />
              <Route path="/app/box" element={<ProtectedRoute><MyBoxScreen /></ProtectedRoute>} />
              <Route path="/app/checkout" element={<ProtectedRoute><CheckoutScreen /></ProtectedRoute>} />
              <Route path="/app/delivery" element={<ProtectedRoute><DeliveryScreen /></ProtectedRoute>} />
              <Route path="/app/payment" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute>} />
              <Route path="/app/tracking/:orderId" element={<ProtectedRoute><OrderTrackingScreen /></ProtectedRoute>} />
              <Route path="/app/orders" element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>} />
              <Route path="/app/referral" element={<ProtectedRoute><ReferralScreen /></ProtectedRoute>} />
              <Route path="/app/loyalty" element={<ProtectedRoute><LoyaltyScreen /></ProtectedRoute>} />
              <Route path="/app/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLoginScreen />} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
              <Route path="/admin/catalog" element={<AdminRoute><AdminCatalog /></AdminRoute>} />
              <Route path="/admin/schools" element={<AdminRoute><AdminSchools /></AdminRoute>} />
              <Route path="/admin/stats" element={<AdminRoute><AdminStats /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
