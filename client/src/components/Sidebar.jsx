import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import SidebarContext from "../context/SidebarContext";

const Sidebar = () => {
  const { sidebarDisplay, setSidebarDisplay } = useContext(SidebarContext);

  const closeSidebar = () => {
    setSidebarDisplay(false);
  };

  return (
    <aside
      className={`w-3/4 h-screen bg-gray-100 absolute top-0 ${
        sidebarDisplay ? "left-0" : "-left-full"
      } z-10 shdadow-lg transition-all transition-200`}
    >
      <button
        className="text-white absolute top-3 left-full"
        onClick={closeSidebar}
      >
        <Icon.X size={38} />
      </button>
      <div className="bg-gray-700 shadow">
        <Link to="login" className="text-white px-2 py-4 flex">
          <Icon.User color="white" />
          <span className="mx-2">Hello User,</span>
          <span className="font-bold">Sign Out</span>
        </Link>
      </div>
      <Link
        to="orders"
        className="block p-3 border-b-2 border-gray-200 hover:bg-gray-300"
      >
        Your Orders
      </Link>
    </aside>
  );
};

export default Sidebar;
