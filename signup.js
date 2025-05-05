import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

document.getElementById('signup-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send verification email
    await sendEmailVerification(user);
    alert("A verification email has been sent to your email address. Please check your inbox.");

    // Redirect to a page asking the user to verify their email
    window.location.href = "verify-email.html";

  } catch (error) {
    console.error(error.message);
    alert("Error during sign-up: " + error.message);
  }
});
