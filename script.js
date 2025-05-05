// Import Firebase app and Firebase auth
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAdn3zYN3w2I7Gahihrkg2f3kK1oPKOMwg",
    authDomain: "bmgo-skyblock-trading.firebaseapp.com",
    projectId: "bmgo-skyblock-trading",
    storageBucket: "bmgo-skyblock-trading.appspot.com",
    messagingSenderId: "664816402677",
    appId: "1:664816402677:web:d5d6b7c4b60c5679fd05bc",
    measurementId: "G-0YM4VQZN8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

// Google Auth provider
const provider = new GoogleAuthProvider();

// Get Google sign-in button element
const googleSignInButton = document.getElementById("google-signin-btn");

// Attach event listener to the button
googleSignInButton.addEventListener("click", () => {
  // Trigger Google sign-in
  signInWithPopup(auth, provider)
    .then((result) => {
      // Signed in successfully
      const user = result.user;
      console.log("User signed in: ", user);

      // Redirect to profile creation page or home page
      window.location.href = "register-details.html"; // or home.html based on your flow
    })
    .catch((error) => {
      // Handle Errors here.
      console.error("Error during sign-in: ", error.message);
      alert("Google Sign-In Error: " + error.message);
    });
});
