import { auth } from './firebase.js';
import { GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

// Get the sign-in button element
document.getElementById('google-signin-btn').addEventListener('click', async function() {
  const provider = new GoogleAuthProvider();

  try {
    // Use Firebase to sign in with Google
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("Google Sign-In successful:", user);

    // Redirect to the profile setup page
    window.location.href = "register-details.html"; // Redirect user to set username and profile

  } catch (error) {
    console.error("Error during Google Sign-In:", error.message);
    alert("Error signing in with Google: " + error.message);
  }
});
