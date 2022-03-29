import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  const [user, setUser] = useState({ loginStatus: false });
  const host = "http://localhost:5000";

  const loginUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token--flipstore"),
      },
    });
    const jsonResponse = await response.json();

    setUser({ loginStatus: true, ...jsonResponse });
  };

  const logoutUser = () => {
    localStorage.removeItem("auth-token--flipstore");
    setUser({ loginStatus: false });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
