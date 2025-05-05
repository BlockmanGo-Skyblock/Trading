// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdn3zYN3w2I7Gahihrkg2f3kK1oPKOMwg",
  authDomain: "bmgo-skyblock-trading.firebaseapp.com",
  projectId: "bmgo-skyblock-trading",
  storageBucket: "bmgo-skyblock-trading.appspot.com",
  messagingSenderId: "664816402677",
  appId: "1:664816402677:web:d5d6b7c4b60c5679fd05bc",
  measurementId: "G-0YM4VQZN8W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
