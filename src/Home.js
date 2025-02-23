import React from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import "./index.css";
// Import images from the same directory
import leavesGif from "./leaves.gif";
import logo from "./Logo.png";
import SearchBar from "./services/SearchBar";
import goalGif from "./goal.gif";

function Home() {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/searchresults");
  };

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
            <button className="nav-btn">REGISTER</button>
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
          AI-Powered Canadian Business Outsource Platform, Enhance Financial
          Flow, Boost Production, and Drive Interconnectivity
        </p>
        <p className="highlight">CHEAP CANADIAN PRODUCTS NEAR YOU</p>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="input-group">
            <label className="adjust">PRODUCT:</label>
            <SearchBar className="input-group" placeholder="EGGS" />
          </div>
          <div className="input-group">
            <label>POSTCODE:</label>
            <input type="text" placeholder="A1B 2C3" />
          </div>
        </div>

        {/* Search Button */}
        <div className="searchButtonDiv">
          <button className="searchButton" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </header>

      {/* About Us Section */}
      <div className="aboutUs" id="aboutUs">
        <div className="aboutUs1">
          <h2
            style={{
              fontSize: "10vh",
              paddingTop: "30px",
              color: "#051533",
              textAlign: "center",
              marginLeft: "30px",
            }}
          >
            Our Mission
          </h2>
          <p
            style={{
              textAlign: "left",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontSize: "150%",
            }}
          >
            &nbsp; Created by passionate developers—some from families who own
            small businesses—Maple Biz is driven by a commitment to revitalizing
            Canada's struggling local economy. We aim to mitigate the impact of
            tariffs, strengthen domestic commerce, and foster a sense of
            national economic unity, ultimately empowering communities and
            fueling a thriving, self-sustaining market.
          </p>
        </div>
        <div className="aboutUs2">
          <div>
            <img style={{ height: "50vh" }} src={goalGif} alt="Our Goal" />
          </div>
          <p style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            Maple Biz fosters interconnectivity among Canadian businesses,
            strengthening the economy by reducing dependence on costly imports
            and tariffs. By keeping commerce local, we empower entrepreneurs,
            drive growth, and create a thriving, self-sustaining market.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer"></div>
    </div>
  );
}

export default Home;
