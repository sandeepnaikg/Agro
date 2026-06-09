import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load cart and wishlist from localStorage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('avasan_cart');
    const savedWishlist = localStorage.getItem('avasan_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('avasan_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('avasan_wishlist', JSON.stringify(newWishlist));
  };

  // Helper to get raw numerical price from string e.g. "₹550 / kg" -> 550
  const getPriceValue = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^\d]/g, ''), 10) || 0;
  };

  // Helper to calculate price for a specific format & weight variant
  const calculateItemPrice = (basePriceStr, format, weightGrams) => {
    const base = getPriceValue(basePriceStr);
    const adjustedBase = format === 'Dried' ? base * 0.9 : base; // Dried is 10% cheaper
    return Math.round((adjustedBase / 1000) * weightGrams);
  };

  // Add to basket
  const addToCart = (product, format, weight, qty) => {
    const itemId = `${product.id}-${format}-${weight}`;
    const calculatedPrice = calculateItemPrice(product.price, format, weight);
    
    const existingIndex = cart.findIndex(item => item.id === itemId);
    
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += qty;
      saveCart(newCart);
    } else {
      const newItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        format,
        weight,
        quantity: qty,
        price: calculatedPrice,
        basePriceStr: product.price // keep reference to base price
      };
      saveCart([...cart, newItem]);
    }
  };

  // Update quantity in cart table
  const updateCartQty = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      const newCart = cart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      saveCart(newCart);
    }
  };

  // Update format or weight inside the cart item dropdown
  const updateCartItemVariant = (itemId, newFormat, newWeight) => {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    const newPrice = calculateItemPrice(item.basePriceStr, newFormat, newWeight);
    const newId = `${item.productId}-${newFormat}-${newWeight}`;

    // Check if another item with the new configuration already exists
    const duplicateIndex = cart.findIndex(i => i.id === newId && i.id !== itemId);

    if (duplicateIndex > -1) {
      // Merge them
      const mergedCart = cart.filter(i => i.id !== itemId).map((i, idx) => {
        if (idx === duplicateIndex || i.id === newId) {
          return { ...i, quantity: i.quantity + item.quantity };
        }
        return i;
      });
      saveCart(mergedCart);
    } else {
      // Just update this item
      const newCart = cart.map(i => {
        if (i.id === itemId) {
          return {
            ...i,
            id: newId,
            format: newFormat,
            weight: newWeight,
            price: newPrice
          };
        }
        return i;
      });
      saveCart(newCart);
    }
  };

  // Remove from basket
  const removeFromCart = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    saveCart(newCart);
  };

  // Empty basket
  const clearCart = () => {
    saveCart([]);
  };

  // Wishlist controls
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      const newWish = wishlist.filter(id => id !== productId);
      saveWishlist(newWish);
    } else {
      saveWishlist([...wishlist, productId]);
    }
  };

  const wishlistHas = (productId) => {
    return wishlist.includes(productId);
  };

  // Totals calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const shipping = subtotal === 0 ? 0 : (subtotal > 499 ? 0 : 80); // Free shipping above 499, else 80
  const grandTotal = subtotal + gst + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQty,
        updateCartItemVariant,
        removeFromCart,
        clearCart,
        subtotal,
        shipping,
        gst,
        grandTotal,
        wishlist,
        toggleWishlist,
        wishlistHas
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
