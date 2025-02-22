import React, { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const FileUpload = ({ onItemsExtracted }) => {
  const [UploadedFile, SetUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      SetUploadedFile(file);
      extractItemsFromFile(file);
    }
  };

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

  return (
    <div>
      <label>Upload Excel/CSV File:</label>
      <input
        type="file"
        accept=".xlsx, .csv"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUpload;