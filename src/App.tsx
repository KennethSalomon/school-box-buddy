import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/app" element={<SplashScreen />} />
          <Route path="/app/onboarding" element={<OnboardingScreen />} />
          <Route path="/app/login" element={<LoginScreen />} />
          <Route path="/app/register" element={<RegisterScreen />} />
          <Route path="/app/home" element={<HomeScreen />} />
          <Route path="/app/search" element={<SchoolSearchScreen />} />
          <Route path="/app/catalog" element={<CatalogScreen />} />
          <Route path="/app/box" element={<MyBoxScreen />} />
          <Route path="/app/checkout" element={<CheckoutScreen />} />
          <Route path="/app/delivery" element={<DeliveryScreen />} />
          <Route path="/app/payment" element={<PaymentScreen />} />
          <Route path="/app/tracking/:orderId" element={<OrderTrackingScreen />} />
          <Route path="/app/orders" element={<OrderHistoryScreen />} />
          <Route path="/app/referral" element={<ReferralScreen />} />
          <Route path="/app/loyalty" element={<LoyaltyScreen />} />
          <Route path="/app/profile" element={<ProfileScreen />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLoginScreen />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/catalog" element={<AdminCatalog />} />
          <Route path="/admin/schools" element={<AdminSchools />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
