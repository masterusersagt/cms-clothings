import { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if(existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}

export const clearCartItem = (cartItems, productTodelete) => {
  return cartItems.filter(cartItem => cartItem.id !== productTodelete.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItem: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen,       setIsCartOpen] = useState(false);
  const [cartItems,         setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal,         setCartTotal] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce( (total, cartItem) => total + cartItem.quantity, 0);
    setCartItemCount(count);
  }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce( (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(total);
  }, [cartItems]);

  const addItemToCart    = (product) => setCartItems(addCartItem(cartItems,    product));
  const removeItemToCart = (product) => setCartItems(removeCartItem(cartItems, product));
  const clearItemToCart  = (product) => setCartItems(clearCartItem(cartItems,  product));

  const value = { 
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemToCart,
    cartItemCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
