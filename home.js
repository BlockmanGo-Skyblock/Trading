// home.js
import { auth } from './firebase.js';
import {
  getFirestore, doc, getDoc
} from 'https://blockmango-skyblock.github.io/Trading/index.html';

const db = getFirestore();

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("display-name").textContent = data.username;
    document.getElementById("profile-pic").src = data.profilePic;
  } else {
    alert("User profile not found.");
  }
});
