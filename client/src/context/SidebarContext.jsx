import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarState = (props) => {
  const [sidebarDisplay, setSidebarDisplay] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarDisplay, setSidebarDisplay }}>
      {props.children}
    </SidebarContext.Provider>
  );
};
