import React from "react";
import "./Subtotal.css";
import currency from "currency.js";
import { useStateValue } from "../../context/StateProvider";
import { getCartTotal } from "../../context/reducer";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {
  const navigate = useNavigate();
  const [{ cart }, dispatch] = useStateValue();
  const INR = (value) => currency(value, { symbol: "₹", precision: 2 });

  return (
    <div className="subtotal">
      <p>
        Subtotal ({cart.length} items):{" "}
        <strong>{INR(getCartTotal(cart)).format(true)}</strong>
      </p>
      <button
        onClick={() => {
          navigate("/payment");
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
