# 🇨🇦Maple Biz : Local Tariff-Affected Product Finder

This application helps Canadian users quickly locate nearby businesses offering products impacted by new U.S. tariffs. Simply search by postal code and item to support local businesses and find tariff-affected items efficiently.

## 📜 Tech Stack
### Frontend: HTML, CSS, JavaScript, React
React: Builds a dynamic, interactive user interface. JavaScript: Manages frontend logic, API integration, and user interactions. HTML & CSS: Structures and styles responsive and visually appealing web pages.

### Backend: Node.js, Firebase Firestore
Firebase Firestore: Stores business details, product information, and vectors for efficient retrieval. Node.js: Powers the backend services and API endpoints.

### AI: Google Gemini API's
1. embedding-001: Converts business and product information into numerical vectors for efficient semantic matching and retrieval.
2. Gemini 2.0 Flash: Enables rapid, intuitive search across the product database, enhancing the accuracy and relevance of user queries.

### Hosting: Firebase
Firebase Hosting: Provides secure, scalable, and fast hosting for the React frontend application. Enables easy deployment, custom domain management, and seamless integration with Firebase backend services.

## 📦 Setup & Installation

In the project directory, you can run:

### `npm install react@18.0.0 react-dom@18.0.0`
### `npm install`
After cloning the repository, install these dependencies^

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
