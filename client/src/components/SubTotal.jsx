import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const SubTotal = () => {
  const cartContext = useContext(CartContext);

  const createOrder = () => {
      
  }

  return (
    <div className="w-11/12 mx-auto my-5 bg-white rounded flex flex-col items-center md:w-4/5">
      <div className="text-xl font-bold mt-3 sm:text-2xl">Your Sub Total</div>
      <div className="text-lg font-bold my-3 sm:text-xl">
        &#8377;{cartContext.getSubTotal()}
      </div>
      <button
        className="py-1 px-5 mb-5 text-center bg-[#5dae3c] hover:bg-[#63bb40] border-2 border-gray-500 rounded-md"
        onClick={createOrder}
      >
        Check Out
      </button>
    </div>
  );
};

export default SubTotal;
