// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdn3zYN3w2I7Gahihrkg2f3kK1oPKOMwg",
  authDomain: "bmgo-skyblock-trading.firebaseapp.com",
  projectId: "bmgo-skyblock-trading",
  storageBucket: "bmgo-skyblock-trading.firebasestorage.app",
  messagingSenderId: "664816402677",
  appId: "1:664816402677:web:d5d6b7c4b60c5679fd05bc",
  measurementId: "G-0YM4VQZN8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
