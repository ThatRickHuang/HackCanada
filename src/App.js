import React, { useState } from "react";
import "./firebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import FileUpload from "./services/FileUpload";

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
  // Function to handle extracted items from the FileUpload component

  };
  const handleItemsExtracted = (extractedItems) => {
    SetItems(extractedItems);
  };
  const db = getFirestore();

  const saveDataToFirestore = async () => {
    // Validate that all required fields are filled
    if (
      !BusinessName.trim() ||
      !Email.trim() ||
      !Location.trim() ||
      Items.length === 0
    ) {
      console.error("All fields are required before saving to Firestore.");
      alert("Please fill in all fields before submitting.");
      return; // Stop function execution if validation fails
    }
    const docRef = await addDoc(collection(db, "Businesses"), {
      Name: BusinessName,
      Email: Email,
      Location: Location,
      TimeCreated: new Date().toISOString(), //saves the timestamp of creation
      Items: Items,
    });
    SetBusinessName("");
    SetEmail("");
    SetLocation("");
    SetSingleItem("");
    SetItems([]);
    // alert("in database now");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
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
              required
            />
          </div>

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
              required
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
            required
          />
        </div>
        {/* File Upload Field */}
        <FileUpload onItemsExtracted={handleItemsExtracted} />

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
            required
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
    </form>
  );
}

export default App;
