import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../context/StateProvider";

const Product = (props) => {
  const { id, title, image, price, rating } = props;
  const [{ cart }, dispatch] = useStateValue();

  const addToCart = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <img src={image} alt={title} className="product_image" />

      <div className="product_info">
        <div className="product_title">{title}</div>
        <div className="product_price">
          <small>₹</small>
          <strong>{price}</strong>
        </div>
        <div className="product_rating">
          {Array(5)
            .fill()
            .map((_, i) => {
              if (i < Math.round(rating))
                return <FontAwesomeIcon icon={faStar} color="#5dae3c" />;
              else return <FontAwesomeIcon icon={faStar} color="#dbdbdb" />;
            })}
        </div>
      </div>

      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
