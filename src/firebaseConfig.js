// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv8B_Jew0jXq07BssruIImg-Af2zhcj1o",
  authDomain: "ecommerce-app-cac0c.firebaseapp.com",
  projectId: "ecommerce-app-cac0c",
  storageBucket: "ecommerce-app-cac0c.firebasestorage.app",
  messagingSenderId: "462533959373",
  appId: "1:462533959373:web:59c49466d3930e9e0e5384",
  measurementId: "G-Q9CR7J316J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;