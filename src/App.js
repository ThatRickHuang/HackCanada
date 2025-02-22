import React, { useState } from "react";
import "./firebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";
function App() {
  const [BusinessName, SetBusinessName] = useState("");

  // State for Email
  const [Email, SetEmail] = useState("");

  // // State for Time Created (e.g., timestamp)
  // const [TimeCreated, SetTimeCreated] = useState("");

  // State for Items (e.g., an array of items)
  const [Items, SetItems] = useState([]);

  // State for a Single Item (to add to the Items array)
  const [SingleItem, SetSingleItem] = useState("");

  // State for Locations
  const [Location, SetLocation] = useState("");

  const addItem = () => {
    if (SingleItem.trim() !== "") {
      SetItems([...Items, SingleItem]);
      SetSingleItem(""); // Clear the input field
    }
  };

  const db = getFirestore();

  const saveDataToFirestore = async () => {
    const docRef = await addDoc(collection(db, "Businesses"), {
      Name: BusinessName,
      Email: Email,
      Location: Location,
      TimeCreated: new Date().toISOString(), //saves the timestamp of creation
      Items: Items

    });
    alert("in database now");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div>
        <h1>Business Information Form</h1>

        <div style={{ marginBottom: "10px" }}>
          <label>Business Name:</label>
          <input
            type="text"
            name="businessName"
            value={BusinessName}
            onChange={(e) => SetBusinessName(e.target.value)}
            placeholder="Enter Business Name"
            style={{ marginLeft: "10px" }}
          />
        </div>
        {/* 
      <div style={{ marginBottom: "10px" }}>
        <label>Business Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter Business Address"
          style={{ marginLeft: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter Phone Number"
          style={{ marginLeft: "10px" }}
        />
      </div> */}

        {/* ADDING THE EMAIL INFORMATION OF A BUSINESS HERE */}
        <div style={{ marginBottom: "10px" }}>
          <label>Email Address:</label>
          <input
            type="text"
            name="email"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
            placeholder="Enter Email Address"
            style={{ marginLeft: "10px" }}
          />
        </div>
      </div>


      {/* ADDING THE LOCATION FIELD OF THE BUSINESS HERE */}
      <div style={{ marginBottom: "10px" }}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={Location}
            onChange={(e) => SetLocation(e.target.value)}
            placeholder="Enter Address"
            style={{ marginLeft: "10px" }}
          />
        </div>

        {/* ADDING THE DATE CREATED
        <div style={{ marginBottom: "10px" }}>
        <label>Time Created:</label>
        <input
          type="datetime-local"
          name="timeCreated"
          value={TimeCreated}
          onChange={(e) => SetTimeCreated(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div> */}

      {/* Items Field */}
      <div style={{ marginBottom: "10px" }}>
        <label>Items:</label>
        <input
          type="text"
          name="singleItem"
          value={SingleItem}
          onChange={(e) => SetSingleItem(e.target.value)}
          placeholder="Enter an item"
          style={{ marginLeft: "10px" }}
        />
        <button onClick={addItem} style={{ marginLeft: "10px" }}>
          Add Item
        </button>
      </div>

      {/* Display Added Items */}
      <div style={{ marginBottom: "10px" }}>
        <h3>Added Items:</h3>
        <ul>
          {Items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Submit Button */}
      <button onClick={saveDataToFirestore} style={{ marginTop: "10px" }}>
        Submit
      </button>
    </div>
  );
}

export default App;