import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Import your Firestore instance

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDGO7wi3_m9_U8E_bSCi28i0Ant9BXAh0M");

const SearchBar = () => {
  const [query, setQuery] = useState(""); // User's search query
  const [results, setResults] = useState([]); // Search results
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to perform semantic search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setResults([]); // Clear results if the query is empty
      return;
    }

    setIsLoading(true);

    try {
      // Initialize the Gemini embedding model
      const model = genAI.getGenerativeModel({ model: "embedding-001" });

      // Generate embedding for the query
      const queryEmbeddingResponse = await model.embedContent(query);
      const queryEmbedding = queryEmbeddingResponse.embedding.values;

      // Fetch all item vectors from Firestore
      const querySnapshot = await getDocs(collection(db, "vectors"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        itemName: doc.data().itemName,
        embedding: doc.data().embedding,
      }));

      // Calculate cosine similarity between the query and each item
      const resultsWithSimilarity = items.map((item) => ({
        ...item,
        similarity: cosineSimilarity(queryEmbedding, item.embedding),
      }));

      // Sort by similarity (descending order)
      resultsWithSimilarity.sort((a, b) => b.similarity - a.similarity);

      // Get the top 6 results
      const topResults = resultsWithSimilarity.slice(0, 6);

      // Update the results state
      setResults(topResults);
    } catch (error) {
      console.error("Error performing search:", error);
      alert("Error performing search: " + error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to calculate cosine similarity
  const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery); // Perform search as the user types
  };

  return (
    <div style={{ position: "relative", width: "300px" }}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for items..."
        value={query}
        onChange={handleInputChange}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />

      {/* Loading Indicator */}
      {isLoading && <div style={{ marginTop: "10px" }}>Loading...</div>}

      {/* Search Results Dropdown */}
      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {results.map((result) => (
            <div
              key={result.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={() => {
                setQuery(result.itemName); // Autofill the search bar on click
                setResults([]); // Clear the dropdown
              }}
            >
              {result.itemName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;