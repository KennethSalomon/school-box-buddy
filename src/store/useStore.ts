import { create } from 'zustand';
import { CartItem, Product, Order, Child } from '@/data/types';
import { sampleOrders } from '@/data/mockData';

interface AppState {
  // Auth
  isLoggedIn: boolean;
  isAdmin: boolean;
  currentUser: { firstName: string; lastName: string; email: string; phone: string; referralCode: string; loyaltyPoints: number; children: Child[] } | null;
  hasSeenOnboarding: boolean;

  // Cart
  cart: CartItem[];
  
  // Orders
  orders: Order[];
  activeOrderId: string | null;

  // Selected school/class
  selectedSchool: string | null;
  selectedClass: string | null;

  // Actions
  login: (email: string, password: string) => boolean;
  adminLogin: (email: string, password: string) => boolean;
  register: (data: { firstName: string; lastName: string; email: string; phone: string; password: string }) => void;
  logout: () => void;
  setOnboardingSeen: () => void;

  addToCart: (product: Product, quality: 'standard' | 'premium', quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  setSchoolAndClass: (school: string, cls: string) => void;

  placeOrder: (paymentMethod: string, address: string, note: string) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  addChild: (child: Omit<Child, 'id'>) => void;
  removeChild: (childId: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  isAdmin: false,
  currentUser: null,
  hasSeenOnboarding: false,
  cart: [],
  orders: [...sampleOrders],
  activeOrderId: null,
  selectedSchool: null,
  selectedClass: null,

  login: (email, password) => {
    if (email && password) {
      set({
        isLoggedIn: true,
        isAdmin: false,
        currentUser: {
          firstName: 'Aminata',
          lastName: 'Koffi',
          email,
          phone: '+229 97 45 23 10',
          referralCode: 'SB-ALPHA-2847',
          loyaltyPoints: 1250,
          children: [
            { id: 'child-1', name: 'Kofi Junior', school: 'Collège Saint-Michel', class: '6ème' },
          ],
        },
      });
      return true;
    }
    return false;
  },

  adminLogin: (email, password) => {
    // ⚠️ SECURITY: Use Supabase auth + user_roles table instead of hardcoded credentials
    // This implementation is deprecated and should be replaced with:
    // 1. Call Supabase signInWithPassword(email, password)
    // 2. Check user_roles table for admin role
    // 3. Only set isAdmin=true if user has admin role in database
    
    // Allow login if we have credentials, but mark as requiring Supabase validation
    if (email && password && email.length > 0 && password.length >= 6) {
      // NOTE: This is a placeholder - actual admin status should come from Supabase
      set({ 
        isLoggedIn: true, 
        isAdmin: false, // Default to false - let Supabase determine actual admin status
        currentUser: { 
          firstName: 'Admin', 
          lastName: 'User', 
          email, 
          phone: '', 
          referralCode: '', 
          loyaltyPoints: 0, 
          children: [] 
        } 
      });
      return true;
    }
    return false;
  },

  register: (data) => {
    set({
      isLoggedIn: true,
      isAdmin: false,
      currentUser: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        referralCode: `SB-${data.firstName.slice(0, 5).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        loyaltyPoints: 0,
        children: [],
      },
    });
  },

  logout: () => set({ isLoggedIn: false, isAdmin: false, currentUser: null, cart: [] }),
  setOnboardingSeen: () => set({ hasSeenOnboarding: true }),

  addToCart: (product, quality, quantity) => {
    const { cart } = get();
    const existing = cart.find(c => c.product.id === product.id);
    if (existing) {
      set({ cart: cart.map(c => c.product.id === product.id ? { ...c, quality, quantity: c.quantity + quantity } : c) });
    } else {
      set({ cart: [...cart, { product, quality, quantity }] });
    }
  },

  removeFromCart: (productId) => set({ cart: get().cart.filter(c => c.product.id !== productId) }),
  
  updateCartQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
    } else {
      set({ cart: get().cart.map(c => c.product.id === productId ? { ...c, quantity } : c) });
    }
  },

  clearCart: () => set({ cart: [] }),

  setSchoolAndClass: (school, cls) => set({ selectedSchool: school, selectedClass: cls }),

  placeOrder: (paymentMethod, address, note) => {
    const { cart, currentUser, selectedSchool, selectedClass, orders } = get();
    const subtotal = cart.reduce((sum, c) => sum + (c.quality === 'premium' ? c.product.premiumPrice : c.product.standardPrice) * c.quantity, 0);
    const orderId = `ORD-${Date.now()}`;
    const newOrder: Order = {
      id: orderId,
      userId: 'current',
      clientName: `${currentUser?.firstName} ${currentUser?.lastName}`,
      clientPhone: currentUser?.phone || '',
      clientEmail: currentUser?.email || '',
      school: selectedSchool || '',
      class: selectedClass || '',
      items: cart.map(c => ({
        productId: c.product.id,
        name: c.product.name,
        quality: c.quality,
        quantity: c.quantity,
        unitPrice: c.quality === 'premium' ? c.product.premiumPrice : c.product.standardPrice,
      })),
      total: subtotal,
      deliveryFee: 500,
      status: 'pending',
      paymentMethod,
      deliveryAddress: address,
      note,
      createdAt: new Date().toISOString(),
    };
    set({ orders: [newOrder, ...orders], cart: [], activeOrderId: orderId });
    return orderId;
  },

  updateOrderStatus: (orderId, status) => {
    set({ orders: get().orders.map(o => o.id === orderId ? { ...o, status } : o) });
  },

  addChild: (child) => {
    const { currentUser } = get();
    if (currentUser) {
      set({
        currentUser: {
          ...currentUser,
          children: [...currentUser.children, { ...child, id: `child-${Date.now()}` }],
        },
      });
    }
  },

  removeChild: (childId) => {
    const { currentUser } = get();
    if (currentUser) {
      set({
        currentUser: {
          ...currentUser,
          children: currentUser.children.filter(c => c.id !== childId),
        },
      });
    }
  },
}));
