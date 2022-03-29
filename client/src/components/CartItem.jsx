import React from "react";
import Product from "./Product";

const CartItem = () => {
  const item = {
    rating: {
      rate: 1.9,
      count: 100,
    },
    _id: "62412c763f04b1c68d93908c",
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 770,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    __v: 0,
  };
  return (
    <div className="flex m-2 bg-white rounded-md">
      <img src={item.image} className="w-32 h-32 m-3" />
      <div className="p-2">
        <div className="text-lg">{item.title}</div>
        <div className="font-bold">&#8377;{item.price}</div>
        <button className="text-sm text-[#5dae3c]">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
