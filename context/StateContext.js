import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const CART_ITEMS_KEY = 'cart-items';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(CART_ITEMS_KEY));
    setCartItems(storedData?.items ?? []);
    setTotalPrice(storedData?.totalPrice ?? 0);
    setTotalQuantities(storedData?.totalQuantities ?? 0);
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify({ items: cartItems, totalPrice: totalPrice, totalQuantities: totalQuantities }));
  }, [cartItems]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      setCartItems((prevCartItems) =>
        (prevCartItems.map((cartProduct) => 
          ((cartProduct._id === product._id) ? { ...cartProduct, quantity: cartProduct.quantity + quantity } : cartProduct)
        )));
    }
    else {
      product.quantity = quantity;
      setCartItems((prevCartItems) => ([ ...prevCartItems, { ...product } ]));
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
    setQty(1);
  };

  const onRemove = (product) => {
    if (!product) {
      return;
    }
    setCartItems((prevCartItems) => prevCartItems.filter((p) => (p._id !== product._id)));
    setTotalPrice((prevTotalPrice) => (prevTotalPrice - (product.price * product.quantity)));
    setTotalQuantities((prevTotalQuantities) => (prevTotalQuantities - product.quantity));
    setQty(1);
  };

  const toggleCartItemQuantity = (product, value) => {
    if (!product) {
      return;
    }
    if (value === 'inc') {
      setCartItems((prevCartItems) => prevCartItems.map((p) => ((p._id !== product._id) ? p : { ...product, quantity: product.quantity + 1 })));
      setTotalPrice((prevTotalPrice) => (prevTotalPrice + product.price));
      setTotalQuantities((prevTotalQuantities) => (prevTotalQuantities + 1));
    } else if (value === 'dec') {
      if (product.quantity > 1) {
        setCartItems((prevCartItems) => prevCartItems.map((p) => ((p._id !== product._id) ? p : { ...product, quantity: product.quantity - 1 })));
        setTotalPrice((prevTotalPrice) => (prevTotalPrice - product.price));
        setTotalQuantities((prevTotalQuantities) => (prevTotalQuantities - 1));
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) {
        return 1;
      }
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={ {
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      } }
    >
      { children }
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);