import { useState } from "react";
import SidebarContext from "./SidebarContext";

const SidebarState = (props) => {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarDisplay, setSidebarDisplay }}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarState;
