import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

function App() {
  const [BusinessName, SetBusinessName] = useState("");
  const [Email, SetEmail] = useState("");

  const db = getFirestore();

  const saveDataToFirestore = async () => {
    const docRef = await addDoct(collection(db, "myCollection"), {
      field1: BusinessName,
      field2: Email,
    });
    alert("in database now");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Business Information Form</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>Business Name:</label>
        <input
          type="text"
          name="businessName"
          value={BusinessName}
          onChange={(e) => SetBusinessName}
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

      <div style={{ marginBottom: "10px" }}>
        <label>Email Address:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => SetEmail}
          placeholder="Enter Email Address"
          style={{ marginLeft: "10px" }}
        />
      </div>
    </div>
  );
}

export default App;
