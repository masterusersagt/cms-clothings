import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils'

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
  isCartOpen       : false,
  setIsOpen        : () => {},
  cartItems        : [],
  addItemToCart    : () => {},
  removeItemToCart : () => {},
  clearItem        : () => {},
  cartItemCount    : 0,
  cartTotal        : 0
});

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS  : "SET_CART_ITEMS"
};

const INITIAL_STATE = {
  isCartOpen    : false,
  cartItems     : [],
  cartItemCount : 0,
  cartTotal     : 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, isCartOpen, cartItemCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce( (total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce( (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
 
    dispatch(createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      {
        cartItems: newCartItems,
        cartItemCount: newCartCount,
        cartTotal: newCartTotal
      })
    );
  }

  const addItemToCart    = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    console.log("add: ", newCartItems);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    console.log("remove: ", newCartItems);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemToCart  = (product) => { 
    const newCartItems = clearCartItem(cartItems,  product);
    console.log("clear: ", newCartItems);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }

  const value = { 
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemToCart,
    cartItems,
    cartItemCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
