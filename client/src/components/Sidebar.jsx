import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { SidebarContext } from "../context/SidebarContext";
import { UserContext } from "../context/UserContext";

const Sidebar = () => {
  const { sidebarDisplay, setSidebarDisplay } = useContext(SidebarContext);
  const userContext = useContext(UserContext);

  const closeSidebar = () => {
    setSidebarDisplay(false);
  };

  const logoutUser = () => {
    userContext.logoutUser();
    navigate("/");
  };

  return (
    <>
      <div
        className={`w-full h-screen absolute top-0 left-0 z-10 bg-black opacity-50 ${
          sidebarDisplay ? "block" : "hidden"
        }`}
      ></div>
      <aside
        className={`w-3/4 h-screen bg-gray-100 absolute top-0 ${
          sidebarDisplay ? "left-0" : "-left-full"
        } z-20 shdadow-lg transition-all transition-200`}
      >
        <button
          className="text-white absolute top-3 left-full"
          onClick={closeSidebar}
        >
          <Icon.X size={38} />
        </button>
        <div className="bg-gray-700 shadow">
          {!userContext.user.loginStatus ? (
            <Link to="/login" className="text-white px-2 py-4 flex">
              <Icon.User color="white" />
              <span className="mx-2">Hello, User</span>
              <span className="font-bold">Sign In</span>
            </Link>
          ) : (
            <button className="text-white px-2 py-4 flex" onClick={logoutUser}>
              <Icon.User color="white" />
              <span className="mx-2">{`Hello ${userContext.user.name},`}</span>
              <span className="font-bold">Sign Out</span>
            </button>
          )}
        </div>
        <Link
          to="/orders"
          className="block p-3 border-b-2 border-gray-200 hover:bg-gray-300"
        >
          Your Orders
        </Link>
      </aside>
    </>
  );
};

export default Sidebar;
