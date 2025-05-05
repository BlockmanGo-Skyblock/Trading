import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { auth } from './firebase.js'; // Ensure firebase auth is set up correctly
const db = getFirestore();

const tradeOffersCollection = collection(db, 'trades');

// Real-time listener for trade offers
onSnapshot(query(tradeOffersCollection, orderBy('timestamp', 'desc')), (querySnapshot) => {
  const offersContainer = document.getElementById('trade-offers');
  offersContainer.innerHTML = '';

  querySnapshot.forEach(doc => {
    const trade = doc.data();
    const tradeCard = document.createElement('div');
    tradeCard.classList.add('trade-card');
    
    tradeCard.innerHTML = `
      <h3>${trade.itemName}</h3>
      <p>${trade.description}</p>
      <p>Price: $${trade.price}</p>
      <button onclick="viewTradeDetails('${doc.id}')">View Offer</button>
      <div>
        <button onclick="reactToTrade('${doc.id}', 'W')">W</button>
        <button onclick="reactToTrade('${doc.id}', 'L')">L</button>
        <span>W: ${trade.reactions.W || 0}</span>
        <span>L: ${trade.reactions.L || 0}</span>
      </div>
    `;
    
    offersContainer.appendChild(tradeCard);
  });
});

// Function to react to a trade (W or L)
function reactToTrade(tradeId, reaction) {
  const tradeRef = doc(db, 'trades', tradeId);
  const trade = tradeRef.data();
  
  const newReactions = trade.reactions || { W: 0, L: 0 };
  
  newReactions[reaction] = newReactions[reaction] + 1;
  
  updateDoc(tradeRef, {
    reactions: newReactions,
    reactedUsers: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid) // Track which users reacted
  });
}

// View trade details (when user clicks on a trade)
function viewTradeDetails(tradeId) {
  window.location.href = `trade-detail.html?tradeId=${tradeId}`;
}
