import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import CartItem from "./CartItem";

const Cart = () => {
  const userContext = useContext(UserContext);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("auth-token--flipstore")) {
      userContext.loginUser();
    }
    cartContext.getCartItem();
    console.log(cartContext.cart);
  }, []);

  return (
    <div>
      {userContext.user.loginStatus ? (
        <div className="py-5 bg-gray-100">
          <div className="text-2xl font-bold text-center">Flipstore Cart</div>
          {/* userContext.cart.map((item) => {
            <CartItem />;
          }) */}
        </div>
      ) : (
        <div className="w-full py-5 bg-white flex flex-col items-center">
          <div className="my-10 text-2xl font-bold">
            Your Flipstore Cart is empty.
          </div>
          <div className="flex flex-col">
            <Link
              to="/login"
              className="py-1 text-center bg-[#5dae3c] hover:bg-[#63bb40] border-2 border-gray-500 rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="w-72 text-center py-1 my-2 bg-gray-200 hover:bg-gray-300 border-2 border-gray-500 rounded-md"
            >
              Create your Flipstore account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
