import React, { useEffect } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useStateValue } from './StateProvider';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = async () => {
    if (user) {
      try {
        // Make an API call to log out the user on the server
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include"
        });

        // Update global state to set user to null
        dispatch({
          type: "SET_USER",
          user: null,
        });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <nav className="header">
      {/* Logo on the left */}
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=" "
        />
      </Link>

      {/* Search box */}
      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className="header_searchIcon" />
      </div>

      {/* Navigation Links */}
      <div className="header_nav">
        {/* Sign In/Out Link */}
        <Link to={!user ? "/login" : "/"} className="header_link">
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLineOne">Hello {user ? user.name : "Guest"}</span>
            <span className="header_optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>

        {/* Orders Link */}
        <Link to="/orders" className="header_link">
          <div className="header_option">
            <span className="header_optionLineOne">Returns</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>

        {/* Prime Link */}
        <Link to="/" className="header_link">
          <div className="header_option">
            <span className="header_optionLineOne">Your</span>
            <span className="header_optionLineTwo">Prime</span>
          </div>
        </Link>

        {/* Shopping Basket Link */}
        <Link to="/checkout" className="header_link">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">{basket?.length || 0}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
