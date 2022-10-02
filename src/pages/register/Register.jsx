import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import logo from "../../assets/logo-dark.png";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // it successfully created a new user with email and password
        if (auth) {
          await updateProfile(auth.currentUser, {
            displayName: username,
          });
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="register">
      <Link to="/">
        <img src={logo} alt="flipstore logo" className="register_logo" />
      </Link>

      <div className="register_container">
        <h1>Create your FlipStore Account</h1>

        <form>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={register}
            className="register_createAccountButton"
          >
            Create Account
          </button>
        </form>

        <p>
          By signing-in you agree to the Flipstore Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <Link to="/login" className="register_loginButton">
          Sign in with your existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;
