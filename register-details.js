// register-details.js
import { auth } from './firebase.js';
import {
  getFirestore, doc, setDoc, getDocs, query, collection, where
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js';

const db = getFirestore();
const storage = getStorage();

document.getElementById("details-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return alert("Not logged in.");

  const username = document.getElementById("username").value.trim();
  const file = document.getElementById("profile-pic").files[0];

  if (username.length < 4 || username.length > 12) {
    return alert("Username must be 4–12 characters.");
  }

  if (!file) return alert("Select a profile picture.");

  // Check if username is taken
  const usernameQuery = query(collection(db, "users"), where("username", "==", username));
  const result = await getDocs(usernameQuery);
  if (!result.empty) return alert("Username already taken.");

  // Upload profile picture
  const storageRef = ref(storage, `profile-pics/${user.uid}`);
  await uploadBytes(storageRef, file);
  const picURL = await getDownloadURL(storageRef);

  // Save to Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    username,
    profilePic: picURL,
    uid: user.uid
  });

  alert("Profile saved!");
  window.location.href = "home.html";
});
