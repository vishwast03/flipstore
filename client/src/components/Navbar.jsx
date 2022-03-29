import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo-light.png";
import * as Icon from "react-feather";
import { SidebarContext } from "../context/SidebarContext";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const setSidebarDisplay = useContext(SidebarContext).setSidebarDisplay;
  const userContext = useContext(UserContext);

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const openSidebar = () => {
    setSidebarDisplay(true);
  };

  const searchQuery = (e) => {
    e.preventDefault();
  };

  const logoutUser = () => {
    userContext.logoutUser();
    navigate("/");
  };

  return (
    <nav className="w-full h-fit bg-gray-800 flex flex-col items-center">
      <div className="w-full my-1 flex items-center justify-between sm:my-2">
        <div className="mx-2 flex items-center lg:mx-4">
          <button
            className="mr-2 text-white hover:text-gray-100 sm:hidden"
            onClick={openSidebar}
          >
            <Icon.Menu size={30} />
          </button>
          <Link to="/" className="w-fit">
            <span className="w-fit">
              <img src={logo} className="w-32" alt="flipstore logo" />
            </span>
          </Link>
        </div>
        {windowWidth >= 768 && (
          <form
            className="flex items-center justify-center sm:flex-1"
            onSubmit={searchQuery}
          >
            <input
              type="text"
              id="searchBar"
              placeholder="Search Flipstore"
              className="h-7 w-48 rounded-l-md outline-0 sm:w-[80%] sm:h-9 sm:px-3"
            />
            <button
              type="submit"
              className="h-7 bg-[#5dae3c] hover:bg-[#63bb40] px-1 rounded-r-md sm:h-9 sm:px-2"
            >
              <Icon.Search />
            </button>
          </form>
        )}
        <div className=" flex items-center justify-end">
          {!userContext.user.loginStatus ? (
            <Link to="/login" className="text-white mx-2 flex flex-col lg:mx-3">
              <span className="text-sm">Hello, User</span>
              <span className="flex">
                <span className="font-bold pr-1">Sign In</span>
              </span>
            </Link>
          ) : (
            <button
              className="text-white mx-2 flex flex-col lg:mx-3"
              onClick={logoutUser}
            >
              <span className="text-sm">{`Hello, ${userContext.user.name}`}</span>
              <span className="flex">
                <span className="font-bold pr-1">Sign Out</span>
              </span>
            </button>
          )}
          <Link
            to="/orders"
            className="text-white font-bold mx-2 hidden sm:block lg:mx-3"
          >
            Orders
          </Link>
          <Link to="/cart" className="mx-2 flex lg:mx-3">
            <Icon.ShoppingCart color="white" />
            <span className="text-white text-xl font-bold px-2">{0}</span>
          </Link>
        </div>
      </div>
      {windowWidth < 768 && (
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
};

export default Navbar;
