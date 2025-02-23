import React from "react";
import { Link } from "react-router-dom"; // For navigation

// Import images from the same directory
import leavesGif from "./leaves.gif";
import logo from "./Logo.png";
import searchIcon from "./searchIcon.png";

function Home() {
  return (
    <div className="main-container">
      <div className="leavesHolder">
        <div className="leaves">
          <img className="leafImage" src={leavesGif} alt="Falling Leaves" />
        </div>
      </div>
      <nav className="navbar">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/register">
            <button className="nav-btn">REGISTER YOUR BUSINESS</button>
          </Link>
          <a href="#aboutUs">
            <button className="nav-btn">ABOUT</button>
          </a>
        </div>
      </nav>
      <header className="hero">
        <h1 className="title">Maple Biz</h1>
        <p className="subtitle">
          BUZZWORD, AI, TRADE, FLOW, CANADA, BUSINESSES, OPTIMIZE, FINANCIAL
          GAIN
        </p>
        <p className="highlight">CHEAP CANADIAN PRODUCTS NEAR YOU</p>
        <div className="search-bar">
          <div className="input-group">
            <label>PRODUCT:</label>
            <input type="text" placeholder=" EGGS" />
            <button className="search-btn">
              <img className="searchIcon" src={searchIcon} alt="Search" />
            </button>
          </div>
          <div className="divider"></div>
          <div className="input-group2">
            <label>POSTCODE:</label>
            <input type="text" placeholder=" A1B 2C3" />
            <button className="search-btn">
              <img className="searchIcon" src={searchIcon} alt="Search" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
