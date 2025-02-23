import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Ensure this is correctly imported

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDGO7wi3_m9_U8E_bSCi28i0Ant9BXAh0M");

// Function to generate embeddings for all items in the "items" collection
export const generateEmbeddingsForItems = async () => {
  try {
    // Fetch all items from the "items" collection
    const querySnapshot = await getDocs(collection(db, "items"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      name: doc.data().name, // Item name
    }));

    // Initialize the Gemini embedding model
    const model = genAI.getGenerativeModel({ model: "embedding-001" });

    // Generate embeddings for each item
    for (const item of items) {
      // Call Gemini's embedding API
      const embeddingResponse = await model.embedContent(item.name);
      const embedding = embeddingResponse.embedding.values; // Extract the embedding vector

      // Log the embedding for debugging
      console.log(`Embedding for "${item.name}":`, embedding);

      // Save the embedding back to Firestore
      await addDoc(collection(db, "vectors"), {// Reference to the item document
        itemName: item.name, // Original item name
        embedding: embedding, // Embedding vector
      }); 
    }


    alert("Embeddings generated and saved successfully!");
  } catch (error) {
    alert("Error generating embeddings: " + error.message);
    console.error("Error:", error);
  }
};