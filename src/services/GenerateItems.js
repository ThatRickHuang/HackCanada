import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Ensure this is correctly imported

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyDGO7wi3_m9_U8E_bSCi28i0Ant9BXAh0M");

// Function to generate items and save to Firestore
export const generateAndSaveItems = async () => {
  try {
    // Initialize the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-001",
      generationConfig: {
        temperature: 0.1, // Lower temperature for more focused responses
        topP: 1, // Consider all possible tokens
        maxOutputTokens: 3000, // Allow for a longer response
      },
    });

    // Define the improved prompt
    const prompt = `
      Generate a list of 30 specific, unique items that are affected by tariffs imposed by the United States on Canada. 
      Focus on industries such as agriculture, manufacturing, and natural resources. 
      Format the response as a comma-separated list without numbers or bullet points, like this:
      item 1, item 2, item 3, item 4, ...
    `;

    // Generate the response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Log the response for debugging
    console.log("Gemini Response:", text);

    // Parse the response into an array of items
    const items = text
      .split(",") // Split by commas
      .map((item) => item.trim()) // Remove extra spaces
      .map((item) => item.replace(/[()]/g, "")) // Remove parentheses
      .filter((item) => item.length > 0); // Remove empty strings

    // Log the parsed items for debugging
    console.log("Parsed Items:", items);

    // Save each item to Firestore
    for (const item of items) {
      await addDoc(collection(db, "items"), {
        name: item,
        // createdAt: new Date().toISOString(),
      });
    }

    alert("Items saved to Firestore successfully!");
  } catch (error) {
    alert("Error generating or saving items: " + error.message);
    console.error("Error:", error);
  }
};