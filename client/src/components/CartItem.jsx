import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = (props) => {
  const cartContext = useContext(CartContext);

  const removefromcart = () => {
    cartContext.removeFromCart(props.item._id);
  };

  return (
    <div className="flex m-2 bg-white rounded-md">
      <img src={props.item.image} className="w-32 h-32 m-3" />
      <div className="p-2">
        <div className="text-lg sm:text-xl">{props.item.title}</div>
        <div className="font-bold sm:text-lg sm:my-3">
          &#8377;{props.item.price}
        </div>
        <button
          className="text-sm text-[#5dae3c] sm:text-base"
          onClick={removefromcart}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
