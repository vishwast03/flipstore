import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartState = (props) => {
  const [cart, setCart] = useState([]);
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

  return (
    <CartContext.Provider value={{ cart, getCartItem }}>
      {props.children}
    </CartContext.Provider>
  );
};
