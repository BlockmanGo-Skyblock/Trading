import { auth } from './firebase.js';
import {
  getFirestore, doc, setDoc, getDoc, getDocs, query, collection, where
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

const db = getFirestore();
const storage = getStorage();

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Not logged in.");
    window.location.href = "index.html";
    return;
  }

  // If already has profile, redirect
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (userDoc.exists()) {
    window.location.href = "home.html";
    return;
  }

  document.getElementById("details-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const fileInput = document.getElementById("profile-pic");
    const file = fileInput?.files?.[0];
    const selectedPic = document.querySelector('input[name="profile-pic"]:checked')?.value;

    if (username.length < 4 || username.length > 12) {
      return alert("Username must be 4–12 characters.");
    }

    if (!file && !selectedPic) {
      return alert("Please select or upload a profile picture.");
    }

    try {
      const usernameQuery = query(collection(db, "users"), where("username", "==", username));
      const result = await getDocs(usernameQuery);
      if (!result.empty) return alert("Username already taken.");

      let picURL = selectedPic;
      if (file) {
        const storageRef = ref(storage, `profile-pics/${user.uid}`);
        await uploadBytes(storageRef, file);
        picURL = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username,
        profilePic: picURL,
        uid: user.uid
      });

      alert("Profile saved!");
      window.location.href = "home.html";

    } catch (error) {
      console.error("Error during profile creation:", error);
      alert("An error occurred while saving your profile. Please try again.");
    }
  });
});
