import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart when user logs in
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated || !user) return;
    setLoading(true);
    try {
      const { data } = await cartAPI.get(user._id);
      setItems(data.items || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Clear items when user logs out
  useEffect(() => {
    if (!isAuthenticated) setItems([]);
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1, size = 'M', color = 'Black') => {
    if (!isAuthenticated) return { needsAuth: true };
    try {
      const { data } = await cartAPI.add({ productId, quantity, size, color });
      setItems(data.items || []);
      return { success: true };
    } catch (err) {
      console.error('Failed to add to cart:', err);
      return { error: err.message };
    }
  };

  const updateQuantity = async (productId, quantity, size, color) => {
    try {
      const { data } = await cartAPI.update({ productId, quantity, size, color });
      setItems(data.items || []);
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  };

  const removeItem = async (productId, size, color) => {
    try {
      const { data } = await cartAPI.remove(productId, { size, color });
      setItems(data.items || []);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clear();
      setItems([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items, loading, cartCount, cartTotal,
      addToCart, updateQuantity, removeItem, clearCart, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};
