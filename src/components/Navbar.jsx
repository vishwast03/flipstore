import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import * as Icon from "react-feather";

function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const searchQuery = (e) => {
    e.preventDefault();
  }

  return (
    <nav className="w-full h-fit bg-gray-800 flex flex-col items-center">
      <div className="w-full my-1 flex items-center justify-between sm:my-2">
        <Link to="/" className="w-fit mx-2">
          <span className="w-fit">
            <img src={logo} className="w-32" alt="flipstore logo" />
          </span>
        </Link>
        {windowWidth >= 640 && (
          <form className="flex items-center justify-center sm:flex-1">
            <input
              type="text"
              id="searchBar"
              placeholder="Search Flipstore"
              className="h-7 w-48 rounded-l-md outline-0 sm:w-[80%] sm:h-9 sm:px-3"
              onSubmit={searchQuery}
            />
            <button
              type="submit"
              className="h-7 bg-[#5dae3c] px-1 rounded-r-md sm:h-9 sm:px-2"
            >
              <Icon.Search />
            </button>
          </form>
        )}
        <div className=" flex items-center justify-end">
          <Link to="login" className="text-white mx-2 flex flex-col lg:mx-3">
            <span className="text-sm">Hello, User</span>
            <span className="flex">
              <span className="font-bold px-1">Sign Out</span>
              <Icon.User color="white" />
            </span>
          </Link>
          {/* <Link to="orders" className="text-white font-bold mx-2 lg:mx-3">
            Orders
          </Link> */}
          <Link to="cart" className="mx-2 flex lg:mx-3">
            <Icon.ShoppingCart color="white" />
            <span className="text-white text-xl font-bold px-2">{0}</span>
          </Link>
        </div>
      </div>
      {windowWidth < 640 && (
        <form
          className="w-full flex mt-1 mb-2 items-center justify-center"
          onSubmit={searchQuery}
        >
          <input
            type="text"
            id="searchBar"
            placeholder="Search Flipstore"
            className="h-7 w-4/5 px-2 rounded-l-md outline-0"
          />
          <button type="submit" className="h-7 bg-[#5dae3c] px-1 rounded-r-md">
            <Icon.Search />
          </button>
        </form>
      )}
    </nav>
  );
}

export default Navbar;
