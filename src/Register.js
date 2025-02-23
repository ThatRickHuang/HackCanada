import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";
import "./register.css";
import logo from "./Logo.png";
import addProductIcon from "./addProduct.png";
import { generateAndSaveItems } from "./services/GenerateItems";
import { generateEmbeddingsForItems } from "./services/GenerateVectors";
import SearchBar from "./services/SearchBar";

function Register() {
  const [BusinessName, SetBusinessName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Location, SetLocation] = useState("");
  const [Items, SetItems] = useState([]);
  const [SingleItem, SetSingleItem] = useState("");

  const addItem = () => {
    if (SingleItem.trim() !== "") {
      SetItems([...Items, SingleItem]);
      SetSingleItem(""); // Clear input
    }
  };

  const saveDataToFirestore = async () => {
    // generateAndSaveItems();
    generateEmbeddingsForItems();
    if (
      !BusinessName.trim() ||
      !Email.trim() ||
      !Location.trim() ||
      Items.length === 0
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "Businesses"), {
        Name: BusinessName,
        Email: Email,
        Location: Location,
        TimeCreated: new Date().toISOString(),
        Items: Items,
      });

      console.log("Document written with ID: ", docRef.id);
      SetBusinessName("");
      SetEmail("");
      SetLocation("");
      SetItems([]);
      alert("Business registered successfully!");
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Error saving data. Try again.");
    }
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo-container">
          <a href="/">
            <img src={logo} alt="Logo" className="logo" />
          </a>
        </div>
        <div className="nav-buttons">
          <a href="/register">
            <button className="nav-btn">REGISTER YOUR BUSINESS</button>
          </a>
          <a href="/#aboutUs">
            <button className="nav-btn">ABOUT</button>
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="card">
          <h1 className="title">REGISTRATION</h1>

          {/* General Information Section */}
          <div className="generalInformation">
            <h2>GENERAL INFORMATION</h2>
            <div className="input-group">
              <label>BUSINESS NAME:</label>
              <input
                type="text"
                value={BusinessName}
                onChange={(e) => SetBusinessName(e.target.value)}
                placeholder="YourCompany Inc."
                required
              />
            </div>
            <div className="input-group">
              <label>EMAIL ADDRESS:</label>
              <input
                type="email"
                value={Email}
                onChange={(e) => SetEmail(e.target.value)}
                placeholder="buddy@yourcompany.com"
                required
              />
            </div>
            <div className="input-group">
              <label>LOCATION:</label>
              <input
                type="text"
                value={Location}
                onChange={(e) => SetLocation(e.target.value)}
                placeholder="123 Avenue"
                required
              />
            </div>
          </div>

          {/* Products Section */}
          <div className="generalInformation">
            <h2>PRODUCTS SOLD</h2>
            <div className="input-group">
              <label>ADD ITEM:</label>
              <input
                type="text"
                value={SingleItem}
                onChange={(e) => SetSingleItem(e.target.value)}
                placeholder="Product"
              />
              <button onClick={addItem} className="add-btn">
                <img
                  src={addProductIcon}
                  alt="Add Product"
                  className="addbutton"
                />
              </button>
            </div>

            {/* Display Items Table */}
            <table className="product-table">
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Product</th>
                  <th style={{ width: "50%" }}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {Items.map((item, index) => (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      <button
                        onClick={() =>
                          SetItems(Items.filter((_, i) => i !== index))
                        }
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          <SearchBar />
          <button onClick={saveDataToFirestore} className="submit-btn">
            SUBMIT
          </button>
        </div>
      </header>
    </div>
  );
}

export default Register;
