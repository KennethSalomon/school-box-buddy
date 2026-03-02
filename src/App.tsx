import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/clover/Navbar";
import BottomNav from "@/components/clover/BottomNav";
import HomePage from "@/pages/HomePage";
import MenPage from "@/pages/MenPage";
import WomenPage from "@/pages/WomenPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CartPage from "@/pages/CartPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homme" element={<MenPage />} />
          <Route path="/femme" element={<WomenPage />} />
          <Route path="/produit/:id" element={<ProductDetailPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
