import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../../context/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  const [{ cart }, dispatch] = useStateValue();

  const removeFromCart = () => {
    // remove the item from the cart
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img src={image} alt={title} className="checkoutProduct_image" />

      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(5)
            .fill()
            .map((_, i) => {
              if (i < Math.round(rating))
                return <FontAwesomeIcon icon={faStar} color="#5dae3c" />;
              else return <FontAwesomeIcon icon={faStar} color="#dbdbdb" />;
            })}
        </div>
        {!hideButton && (
          <button onClick={removeFromCart}>Remove from Cart</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
