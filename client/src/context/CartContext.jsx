import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartState = (props) => {
  const [cart, setCart] = useState([
    {
      _id: "1",
      title: "",
      price: 0,
      image: "",
    },
  ]);
  const host = "http://localhost:5000";

  const getCartItem = async () => {
    const response = await fetch(`${host}/api/product/getcart`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token--flipstore"),
      },
    });
    const jsonResponse = await response.json();

    setCart(jsonResponse);
  };

  const addToCart = async (productId) => {
    await fetch(`${host}/api/product/addtocart`, {
      method: "POST",
      body: JSON.stringify({ product_id: productId }),
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token--flipstore"),
      },
    });
    getCartItem();
  };

  const removeFromCart = async (productId) => {
    await fetch(`${host}/api/product/removefromcart`, {
      method: "POST",
      body: JSON.stringify({ product_id: productId }),
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token--flipstore"),
      },
    });
    getCartItem();
  };

  const getSubTotal = () => {
    const subTotal = cart.reduce((sum, item) => sum + item.price, 0);
    return subTotal;
  };

  return (
    <CartContext.Provider
      value={{ cart, getCartItem, addToCart, removeFromCart, getSubTotal }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
