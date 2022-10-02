import React from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import currency from "currency.js";
import { useStateValue } from "../../context/StateProvider";
import { getCartTotal } from "../../context/reducer";
import CheckoutProduct from "../../components/checkoutProduct/CheckoutProduct";
import axios from "../../axios";
import logo from "../../assets/logo-dark.png";

const Payment = () => {
  const [{ user, cart }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const INR = (value) => currency(value, { symbol: "₹", precision: 2 });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post("orders", {
      amount: getCartTotal(cart),
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_3QgJDE5wHybKua",
      amount: amount.toString(),
      currency: currency,
      name: user.displayName,
      description: `Order # ${order_id}`,
      image: { logo },
      order_id: order_id,
      handler: async (response) => {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          userId: user.uid,
          products: cart,
        };

        const result = await axios.post("success", data);

        if (result.data.success) {
          dispatch({ type: "EMPTY_CART" });
          navigate("/orders");
        }
      },
      prefill: {
        name: user.displayName,
        email: user.email,
      },
      theme: {
        color: "#5dae3c",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="payment">
      <div className="payment_deliveryDetails">
        <h2>Delivey Address</h2>
        <p className="payement_username">Name: {user.displayName}</p>
        <p className="payment_deliveryAddress">
          1-e, Kamdar Shopping Centre, Tejpal Road, Opp Station, Vile Parle
          (east), Mumbai, Maharashtra - 400057
        </p>
      </div>
      <div className="payment_orderDetails">
        <h2>Order Items</h2>

        {cart.map((item) => (
          <CheckoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton
          />
        ))}
      </div>
      <div className="payment_proceedToPay">
        <p>Amount Payable: {INR(getCartTotal(cart)).format(true)}</p>
        <button onClick={displayRazorpay}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Payment;
