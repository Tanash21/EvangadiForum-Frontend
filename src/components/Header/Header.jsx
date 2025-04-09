import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import "./Header.css";
import evangadiLogo from "../../assets/evangadiLogo.png";

function Header({ logout = () => {} }) {
  const [sticky, setSticky] = useState(false);
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickChange = () => {
    if (token) {
      logout();
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={`header ${sticky ? "sticky" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={evangadiLogo} alt="evangadiLogo" />
        </Link>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰
        </label>
        <nav className="nav-links">
          <Link to="/" className="links">
            Home
          </Link>
          <Link to="/how-it-works" className="links">
            How it Works
          </Link>
          <button className="nav-btn btn-blue" onClick={onClickChange}>
            {token ? "Log Out" : "Sign In"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
