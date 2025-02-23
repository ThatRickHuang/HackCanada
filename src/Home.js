import React from "react";
import { Link } from "react-router-dom"; // For navigation
import "./index.css";
// Import images from the same directory
import leavesGif from "./leaves.gif";
import logo from "./Logo.png";

function Home() {
  return (
    <div className="main-container">
      {/* Background Leaves */}
      <div className="leavesHolder">
        <div className="leaves">
          <img className="leafImage" src={leavesGif} alt="Falling Leaves" />
        </div>
      </div>

      {/* Navigation Bar */}
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

      {/* Hero Section */}
      <header className="hero">
        <h1 className="title">Maple Biz</h1>
        <p className="subtitle">
          BUZZWORD, AI, TRADE, FLOW, CANADA, BUSINESSES, OPTIMIZE, FINANCIAL
          GAIN
        </p>
        <p className="highlight">CHEAP CANADIAN PRODUCTS NEAR YOU</p>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="input-group">
            <label>PRODUCT:</label>
            <input type="text" placeholder="EGGS" />
          </div>
          <div className="input-group">
            <label>POSTCODE:</label>
            <input type="text" placeholder="A1B 2C3" />
          </div>
        </div>

        {/* Search Button */}
        <div className="searchButtonDiv">
          <button className="searchButton">SEARCH</button>
        </div>
      </header>

      {/* About Us Section */}
      <div className="aboutUs" id="aboutUs">
        {/* About Us Content Goes Here */}
      </div>

      {/* Footer */}
      <div className="footer">{/* Footer Content Goes Here */}</div>
    </div>
  );
}

export default Home;
