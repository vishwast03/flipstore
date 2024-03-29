import React from "react";
import "./Checkout.css";
import { useStateValue } from "../../context/StateProvider";
import CheckoutProduct from "../../components/checkoutProduct/CheckoutProduct";
import Subtotal from "../../components/subtotal/Subtotal";

const Checkout = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout_ad"
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout_title">Your Shopping Cart</h2>

          {!cart.length && (
            <div className="checkout_emptyCartText">
              Nothing here. Your cart is empty.
            </div>
          )}

          {cart.map((item) => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
