import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import SidebarContext from "../context/SidebarContext";

const Sidebar = () => {
  const sidebarDisplay = useContext(SidebarContext).sidebarDisplay;

  return (
    <aside
      className={`w-3/5 h-screen bg-white absolute top-0 ${
        sidebarDisplay ? "left-0" : "-left-full"
      } z-10 shadow-lg`}
    >
      <div className="bg-gray-800 shadow">
        <Link to="login" className="text-white px-2 py-4 flex">
          <Icon.User color="white" />
          <span className="mx-2">Hello User,</span>
          <span className="font-bold">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
