import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-dark.png";

const Signup = () => {
  return (
    <div className="w-fit mx-auto mt-14">
      <img src={logo} className="w-44 mx-auto" alt="Flipstore Logo" />
      <div className="w-11/12 mx-auto my-4 py-2 px-4 border-2 border-gray-200 rounded-md sm:w-96">
        <h2 className="text-2xl font-bold">Create new account</h2>
        <form className="flex flex-col py-4">
          <label className="font-bold" htmlFor="username">
            Name
          </label>
          <input
            type="text"
            name="username"
            className="p-1 my-2 border-2 rounded"
            id="username"
          />
          <label className="font-bold" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            className="p-1 my-2 border-2 rounded"
            id="email"
          />
          <label className="font-bold" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="p-1 my-2 border-2 rounded"
            id="password"
          />
          <label className="font-bold" htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="p-1 my-2 border-2 rounded"
            id="cpassword"
          />
          <input
            type="submit"
            value="Sign Up"
            className="py-2 mt-2 bg-[#5dae3c] hover:bg-[#63bb40] border-2 border-gray-500 rounded-md cursor-pointer"
          />
        </form>
        <div className="text-sm text-gray-700">
          By continuing, you agree to Flipstore's Conditions of Use and Privacy
          Notice.
        </div>
        <div className="my-4 flex flex-col items-center">
          <span>Already have an account?</span>
          <Link
            to="/login"
            className="w-72 text-center py-2 my-2 bg-gray-200 hover:bg-gray-300 border-2 border-gray-500 rounded-md"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
