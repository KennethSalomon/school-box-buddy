export interface Product {
  id: string;
  name: string;
  image: string;
  standardPrice: number;
  premiumPrice: number;
  category: string;
  required: boolean;
  stock: number;
  applicableClasses: string[];
}

export interface School {
  id: string;
  name: string;
  city: string;
  classes: string[];
  verified: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  quality: 'standard' | 'premium';
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  school: string;
  class: string;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  paymentMethod: string;
  deliveryAddress: string;
  note?: string;
  createdAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  registeredAt: string;
  ordersCount: number;
  totalSpent: number;
  referralCode: string;
}

export interface CartItem {
  product: Product;
  quality: 'standard' | 'premium';
  quantity: number;
}

export interface Child {
  id: string;
  name: string;
  school: string;
  class: string;
}
