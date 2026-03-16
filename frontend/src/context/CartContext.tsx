import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { cartApi, type Cart } from '../services/api';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  createCart: () => Promise<void>;
  addToCart: (productId: number, selectedAttributes: Record<string, string>, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  checkout: () => Promise<{ orderId: number } | null>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const createCart = async () => {
    try {
      const response = await cartApi.create();
      setCart(response.data);
      localStorage.setItem('cartId', response.data.id.toString());
    } catch (error) {
      console.error('Failed to create cart:', error);
    }
  };

  const refreshCart = async () => {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      try {
        const response = await cartApi.get(parseInt(cartId));
        setCart(response.data);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        localStorage.removeItem('cartId');
      }
    }
  };

  const addToCart = async (productId: number, selectedAttributes: Record<string, string>, quantity = 1) => {
    let cartId = localStorage.getItem('cartId');
    
    if (!cartId) {
      await createCart();
      cartId = localStorage.getItem('cartId');
    }
    
    if (!cartId) return;

    setLoading(true);
    try {
      const response = await cartApi.addItem(parseInt(cartId), {
        product_id: productId,
        selected_attributes: selectedAttributes,
        quantity,
      });
      setCart(response.data);
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    setLoading(true);
    try {
      await cartApi.removeItem(itemId);
      await refreshCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return null;

    try {
      const response = await cartApi.checkout(parseInt(cartId));
      localStorage.removeItem('cartId');
      setCart(null);
      return { orderId: response.data.id };
    } catch (error) {
      console.error('Checkout failed:', error);
      return null;
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, createCart, addToCart, removeFromCart, checkout, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
