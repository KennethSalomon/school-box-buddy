import { create } from 'zustand';
import { Product } from '@/data/cloverData';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'confirmed' | 'preparing' | 'shipped' | 'delivered';
  date: string;
}

interface CloverState {
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  placeOrder: () => void;
}

export const useCloverStore = create<CloverState>((set, get) => ({
  cart: [],
  orders: [
    {
      id: 'CLV-2024-001',
      items: [],
      total: 218,
      status: 'shipped',
      date: '2024-12-15',
    },
    {
      id: 'CLV-2024-002',
      items: [],
      total: 89,
      status: 'delivered',
      date: '2024-11-28',
    },
  ],

  addToCart: (product, size, quantity = 1) => {
    set((state) => {
      const existing = state.cart.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { product, size, quantity }] };
    });
  },

  removeFromCart: (productId, size) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.product.id === productId && item.size === size)
      ),
    }));
  },

  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, size);
      return;
    }
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  cartTotal: () => {
    return get().cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },

  cartCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  placeOrder: () => {
    const cart = get().cart;
    const total = get().cartTotal();
    if (cart.length === 0) return;
    const order: Order = {
      id: `CLV-${Date.now()}`,
      items: [...cart],
      total,
      status: 'confirmed',
      date: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      orders: [order, ...state.orders],
      cart: [],
    }));
  },
}));
