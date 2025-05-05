import { getFirestore, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { auth } from './firebase.js'; // Ensure firebase auth is set up correctly

const db = getFirestore();
const urlParams = new URLSearchParams(window.location.search);
const tradeId = urlParams.get('tradeId');

async function loadTradeDetails() {
  const tradeRef = doc(db, 'trades', tradeId);
  const tradeSnapshot = await getDoc(tradeRef);
  
  if (tradeSnapshot.exists()) {
    const trade = tradeSnapshot.data();
    
    document.getElementById('item-name').innerText = trade.itemName;
    document.getElementById('description').innerText = trade.description;
    document.getElementById('price').innerText = trade.price || 'N/A';
    document.getElementById('offered-by').innerText = trade.username;
  }
}

document.getElementById('send-trade-request').addEventListener('click', () => {
  const tradeRef = doc(db, 'trades', tradeId);
  
  // Add trade request logic (you can store the trade status as 'pending')
  updateDoc(tradeRef, {
    tradeStatus: 'pending'
  }).then(() => {
    alert('Trade request sent!');
  });
});

document.getElementById('complete-trade-btn').addEventListener('click', () => {
  const tradeRef = doc(db, 'trades', tradeId);
  
  // Logic to mark the trade as completed and reward gems
  updateDoc(tradeRef, {
    tradeStatus: 'completed',
    gemRewarded: true
  }).then(() => {
    alert('Trade completed! Both users received gems.');
  });
});

loadTradeDetails();
