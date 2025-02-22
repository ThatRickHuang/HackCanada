import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const FileUpload = ({ onItemsExtracted, onClearFile }) => {
  const [UploadedFile, SetUploadedFile] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      SetUploadedFile(file);
      extractItemsFromFile(file);
    }
  };

  // Function to extract items from the uploaded file
  const extractItemsFromFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;

      if (file.name.endsWith(".xlsx")) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const items = jsonData.map((row) => row[0]).filter((item) => item);
        onItemsExtracted(items);
      } else if (file.name.endsWith(".csv")) {
        Papa.parse(data, {
          complete: (result) => {
            const items = result.data.map((row) => row[0]).filter((item) => item);
            onItemsExtracted(items);
          },
          header: false,
        });
      }
    };

    reader.readAsBinaryString(file);
  };

  // Function to clear the file input
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
    SetUploadedFile(null); // Clear the uploaded file state
    onClearFile(); // Notify the parent component
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>Upload Excel/CSV File:</label>
      <input
        type="file"
        accept=".xlsx, .csv"
        onChange={handleFileUpload}
        ref={fileInputRef} // Attach the ref to the file input
        style={{ marginLeft: "10px" }}
      />
      <button onClick={clearFileInput} style={{ marginLeft: "10px" }}>
        Clear File
      </button>
    </div>
  );
};

export default FileUpload;