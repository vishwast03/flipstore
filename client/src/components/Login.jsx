import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../images/logo-dark.png";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;

    const response = await fetch(`${props.host}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const jsonResponse = await response.json();

    if (jsonResponse.success) {
      // TODO: CREATE ALERT SUCCESS
      console.log("Logged in successfully");
      localStorage.setItem("auth-token--flipstore", jsonResponse.authToken);
      navigate("/");
    } else {
      // TODO: CREATE ALERT FAILURE
      console.log("Invalid Credentials");
    }
  };

  return (
    <div className="w-fit mx-auto mt-14">
      <img src={logo} className="w-44 mx-auto" alt="Flipstore Logo" />
      <div className="w-11/12 mx-auto my-4 py-2 px-4 border-2 border-gray-200 rounded-md sm:w-96">
        <h2 className="text-2xl font-bold">Sign-in</h2>
        <form className="flex flex-col py-4" onSubmit={handleSubmit}>
          <label className="font-bold" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            className="p-1 my-2 border-2 rounded"
            id="email"
            required
            value={credentials.email}
            onChange={handleChange}
          />
          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="p-1 my-2 border-2 rounded"
            id="password"
            required
            value={credentials.password}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Sign In"
            className="py-2 mt-2 bg-[#5dae3c] hover:bg-[#63bb40] border-2 border-gray-500 rounded-md cursor-pointer"
          />
        </form>
        <div className="text-sm text-gray-700">
          By continuing, you agree to Flipstore's Conditions of Use and Privacy
          Notice.
        </div>
        <div className="my-4 flex flex-col items-center">
          <span>New to Flipstore?</span>
          <Link
            to="/signup"
            className="w-72 text-center py-2 my-2 bg-gray-200 hover:bg-gray-300 border-2 border-gray-500 rounded-md"
          >
            Create your Flipstore account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
