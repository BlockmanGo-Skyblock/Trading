import { auth } from './firebase.js';
import {
  getFirestore, doc, setDoc, getDocs, query, collection, where
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

const db = getFirestore();
const storage = getStorage();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Not logged in.");
    window.location.href = "index.html";  // Redirect to login page if no user is logged in.
    return;
  }

  // Check if email is verified
  if (!user.emailVerified) {
    alert("Please verify your email before proceeding.");
    window.location.href = "verify-email.html";  // Redirect to email verification page
    return;
  }

  // User is logged in and email is verified, continue with profile creation logic
  document.getElementById("details-form").addEventListener("submit", async function (e) {
    e.preventDefault();  // Prevent default form submission

    const username = document.getElementById("username").value.trim();
    const file = document.getElementById("profile-pic").files[0];

    // Username validation (length check)
    if (username.length < 4 || username.length > 12) {
      return alert("Username must be 4–12 characters.");
    }

    // Profile picture validation
    if (!file) return alert("Select a profile picture.");

    // Check if username already exists in Firestore
    const usernameQuery = query(collection(db, "users"), where("username", "==", username));
    const result = await getDocs(usernameQuery);
    if (!result.empty) return alert("Username already taken.");

    try {
      // Upload profile picture to Firebase Storage
      const storageRef = ref(storage, `profile-pics/${user.uid}`);
      await uploadBytes(storageRef, file);
      const picURL = await getDownloadURL(storageRef);

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username,
        profilePic: picURL,
        uid: user.uid
      });

      alert("Profile saved!");
      window.location.href = "home.html"; // Redirect to home page after saving profile
    } catch (error) {
      console.error("Error during profile creation:", error);
      alert("An error occurred while saving your profile. Please try again.");
    }
  });
});
