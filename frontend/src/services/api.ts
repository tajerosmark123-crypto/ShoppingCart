import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  base_price: string;
  image_url: string;
  attributes: ProductAttribute[];
}

export interface CartItem {
  id: number;
  cart: number;
  product: Product;
  product_id: number;
  selected_attributes: Record<string, string>;
  quantity: number;
  price: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
  created_at: string;
}

export interface Order {
  id: number;
  cart: number;
  subtotal: string;
  tax: string;
  shipping: string;
  total: string;
  status: string;
  created_at: string;
}

export const productApi = {
  getAll: () => api.get<Product[]>('/products/'),
  get: (id: number) => api.get<Product>(`/products/${id}/`),
};

export const cartApi = {
  create: () => api.post<Cart>('/carts/'),
  get: (id: number) => api.get<Cart>(`/carts/${id}/`),
  addItem: (cartId: number, data: { product_id: number; selected_attributes: Record<string, string>; quantity: number }) =>
    api.post<Cart>(`/carts/${cartId}/add_item/`, data),
  updateItem: (id: number, data: Partial<CartItem>) => api.patch<CartItem>(`/cart-items/${id}/`, data),
  removeItem: (id: number) => api.delete(`/cart-items/${id}/`),
  checkout: (cartId: number) => api.post<Order>(`/carts/${cartId}/checkout/`),
};

export default api;
