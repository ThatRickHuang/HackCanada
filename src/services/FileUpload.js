import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const FileUpload = ({ onItemsExtracted, onClearFile }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      extractItemsFromFile(file);
    }
  };

  const extractItemsFromFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      let items = [];

      if (file.name.endsWith(".xlsx")) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        items = jsonData
          .map((row) => ({ name: row[0], cost: row[1] }))
          .filter((item) => item.name && item.cost !== undefined);
      } else if (file.name.endsWith(".csv")) {
        Papa.parse(data, {
          complete: (result) => {
            const parsedItems = result.data
              .map((row) => ({ name: row[0], cost: row[1] }))
              .filter((item) => item.name && item.cost !== undefined);
            onItemsExtracted(parsedItems);
          },
          header: false,
        });
        return;
      }

      onItemsExtracted(items);
    };

    reader.readAsBinaryString(file);
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploadedFile(null);
    onClearFile();
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label>Upload Excel/CSV File:</label>
      <input
        type="file"
        accept=".xlsx, .csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ marginLeft: "10px" }}
      />
      <button onClick={clearFileInput} style={{ marginLeft: "10px" }}>
        Clear File
      </button>
    </div>
  );
};

export default FileUpload;