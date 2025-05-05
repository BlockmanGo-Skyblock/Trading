import { auth } from './firebase.js';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

// Action code settings for passwordless email link
const actionCodeSettings = {
  url: 'https://blockmango-skyblock.github.io/Trading/', // Your GitHub Pages URL
  handleCodeInApp: true,
};

// Send the magic sign-in link to the user's email
document.getElementById("emailLinkForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      alert("Check your email for the sign-in link!");
    })
    .catch((error) => {
      alert("Error sending link: " + error.message);
    });
});

// Check if the URL contains a valid sign-in link
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = prompt("Please enter your email for login:");
  }

  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem('emailForSignIn');
      alert("Login successful!");
      window.location.href = "home.html"; // Redirect to home or dashboard after sign-in
    })
    .catch((error) => {
      alert("Error signing in: " + error.message);
    });
}
