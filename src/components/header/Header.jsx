import React from "react";
import "./Header.css";
import logo from "../../assets/logo-light.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../context/StateProvider";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      signOut(auth);
    }
  };

  return (
    <nav className="header">
      <Link to="/">
        <img src={logo} className="header_logo" alt="flipstore logo" />
      </Link>

      <div className="header_search">
        <input type="text" className="header_searcInput" />
        <button type="submit" className="header_searchIcon">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
        </button>
      </div>

      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthenticaton} className="header_option">
            <span className="header_optionLineOne">
              Hello {!user ? "Guest" : user.displayName}
            </span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>

        <Link to="/checkout">
          <div className="header_optionCart">
            <FontAwesomeIcon icon={faCartShopping} color="white" size="xl" />
            <span className="header_optionLineTwo header_cartCount">
              {cart?.length || 0}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
