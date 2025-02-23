import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./search.css";
import logo from "./Logo.png";

function SearchResults() {
  const location = useLocation();
  const { query, results } = location.state || { query: "", results: [] };

  return (
    <div className="main-container">
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
          <a href="/#aboutUs">
            <button className="nav-btn">ABOUT</button>
          </a>
        </div>
      </nav>

      <header className="hero">
        <h1 className="title">SEARCH</h1>
        <div className="card">
          <div className="card-top">
            <p className="cardLeft">
              RESULTS FOR{" "}
              <span style={{ color: "rgb(241, 107, 130)" }}>"{query}"</span>:
            </p>
            <p className="cardRight">
              SHOWING{" "}
              <span style={{ color: "rgb(241, 107, 130)" }}>
                {results.length}
              </span>{" "}
              RESULTS
            </p>
          </div>
          <hr
            style={{
              height: "7px",
              border: "0",
              background:
                "linear-gradient(0.25turn, #42b8eb, #ebf8e1, #42b8eb)",
              marginRight: "150px",
              marginLeft: "150px",
            }}
          />

          <ul className="company-list">
            {results.length > 0 ? (
              results.map((company, index) => (
                <li className="company-item" key={index}>
                  <div className="company-info">
                    <h2 className="company-name">{company.name}</h2>
                    <ul className="company-information">
                      <li>{company.product}</li>
                      <li>{company.location}</li>
                      <li>{company.dateRegistered}</li>
                    </ul>
                  </div>
                  <div className="price-tag">${company.price}</div>
                </li>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#f16b82",
                }}
              >
                No results found.
              </p>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default SearchResults;
