import React, { useState } from "react";
import { db } from "./firebaseConfig"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

function App() {
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    phone: "",
    email: "",
  });

  const [submittedData, setSubmittedData] = useState({
    businessName: "",
    address: "",
    phone: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Prevents multiple submissions

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form behavior
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);

    try {
      const docRef = await addDoc(collection(db, "businesses"), formData);
      console.log("Document written with ID: ", docRef.id);

      // Update submitted data state
      setSubmittedData(formData);

      // Clear form after submission
      setFormData({ businessName: "", address: "", phone: "", email: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Business Information Form</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>Business Name:</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter Business Name"
          style={{ marginLeft: "10px" }}
        />
      </div>

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
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Email Address:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter Email Address"
          style={{ marginLeft: "10px" }}
        />
      </div>

      <button onClick={handleSubmit} disabled={isSubmitting}>
        Submit
      </button>

      <h3>Submitted Data:</h3>
      <p>
        <strong>Business Name:</strong> {submittedData.businessName}
      </p>
      <p>
        <strong>Business Address:</strong> {submittedData.address}
      </p>
      <p>
        <strong>Phone:</strong> {submittedData.phone}
      </p>
      <p>
        <strong>Email:</strong> {submittedData.email}
      </p>
    </div>
  );
}

export default App;
