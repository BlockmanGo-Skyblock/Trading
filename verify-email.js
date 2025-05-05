import { auth } from './firebase.js';
import { sendEmailVerification } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

document.getElementById("resend-email").addEventListener("click", async function() {
  const user = auth.currentUser;

  if (user) {
    try {
      await sendEmailVerification(user);
      alert("Verification email has been resent. Please check your inbox.");
    } catch (error) {
      console.error("Error resending email: ", error);
      alert("There was an error resending the verification email.");
    }
  } else {
    alert("No user is logged in.");
  }
});
