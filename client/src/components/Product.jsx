import React from "react";
import * as Icon from "react-feather";

const Product = (props) => {
  const product = props.product;

  return (
    <div className="w-11/12 p-3 m-2 bg-white rounded sm:w-72 sm:rounded-md">
      <div>{product.title}</div>
      <div className="font-bold py-2">${product.price}</div>
      <div className="mb-2 flex">
        {[...Array(Math.round(product.rating.rate))].map((v, i) => (
          <Icon.Star key={i} size={20} color={"#5dae3c"} />
        ))}
        <span className="text-sm mx-1">{product.rating.count}</span>
      </div>
      <img className="w-44 h-44 mx-auto my-2" src={`${product.image}`} />
      <button className="w-fit block mx-auto mt-5 px-4 py-1 rounded bg-[#5dae3c]">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
