import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import "./Home.css";
import Product from "./Product";

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const userContext = useContext(UserContext);

  const fetchProducts = async () => {
    const res = await fetch(`${props.host}/api/product/getall`);
    const allProducts = await res.json();
    setProducts(allProducts);
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token--flipstore")) {
      userContext.loginUser();
    }
    fetchProducts();
  }, []);

  return (
    <main id="home">
      <div className="w-fit pt-44 pb-10 flex flex-wrap justify-center sm:pt-30 lg:pt-52 xl:pt-56 2xl:pt-72">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Home;
