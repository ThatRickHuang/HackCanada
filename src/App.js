import React, { useState } from "react";
import "./firebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";
function App() {
  const [BusinessName, SetBusinessName] = useState("");       //variables that will be stored into the database
  const [Email, SetEmail] = useState("");
  const [Location, SetLocation] = useState("");

  const db = getFirestore();

  const saveDataToFirestore = async () => {
    const docRef = await addDoc(collection(db, "Businesses"), {
      Name: BusinessName,
      Email: Email,
      Location: Location,
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

        {/* ADDING THE DATE CREATED */}
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
        <button onClick={saveDataToFirestore}> Save to Firestore</button>
    </div>
  );
}

export default App;
