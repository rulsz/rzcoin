import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyB20mVtxpDotq3RjgxbH1bf3NDe98_TpIs",
  authDomain: "rzcoin.firebaseapp.com",
  databaseURL: "https://rzcoin-default-rtdb.firebaseio.com",
  projectId: "rzcoin",
  storageBucket: "rzcoin.appspot.com",
  messagingSenderId: "814983359166",
  appId: "1:814983359166:web:409bbbb7cc0fece9baccef",
  measurementId: "G-CPP9JDJCE7"
};

const app = initializeApp(firebaseConfig);

import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const database = getDatabase();

let coinValue = 0;

// Add event listener for the "newUserDialog"
document.addEventListener('DOMContentLoaded', () => {
  const userID = getUserIDFromUrl();
  if (userID) {

    // Check if user ID exists in the database
    get(ref(database, 'users/' + userID)).then((snapshot) => {
      if (snapshot.exists()) {
        // User ID exists, retrieve the coin value
        coinValue = snapshot.val().coin;
        document.getElementById('coinCount').textContent = '🌸 ' + coinValue.toLocaleString();;

        // Check if the welcome dialog has been shown
        if (!snapshot.val().welcomeShown) {
          // Show the welcome dialog
          document.getElementById('newUserDialog').classList.add('show');

          // Add the click listener to the button after it's loaded
          document.getElementById('claimSakuraButton').addEventListener('click', claimSakura);
        }

      } else {
        // User ID does not exist, set the initial value
        set(ref(database, 'users/' + userID), {
          userid: userID,
          coin: 0,
          welcomeShown: false
        }).then(() => {
          // Update the coin display in the UI
          document.getElementById('coinCount').textContent = '🌸 0';
        }).catch((error) => {
          alert(error);
        });
      }
    }).catch((error) => {
      alert(error);
    });
  }
});

// Create a function to return the coinValue
function getCoinValue() {
  return coinValue; 
}

// Function to update the coin value and hide the dialog
function claimSakura() {
  const userID = getUserIDFromUrl();
  if (userID) {
    update(ref(database, 'users/' + userID), {
      coin: coinValue + 1000,
      welcomeShown: true
    }).then(() => {
      // Update the coin display in the UI
      coinValue += 1000;
      document.getElementById('coinCount').textContent = '🌸 ' + coinValue;
      document.getElementById('newUserDialog').classList.remove('show');
    }).catch((error) => {
      alert(error);
    });
  }
}

const startFarmingButton = document.getElementById('startFarming');
let countdownInterval;
let startTime;

startFarmingButton.addEventListener('click', () => {
  if (startFarmingButton.innerText === 'Start Farming') {
    startTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 jam dari sekarang
    const userID = getUserIDFromUrl();
    set(ref(database, 'farmingData/' + userID), {
      startTime: startTime
    });

    countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = startTime - currentTime;
      const hours = Math.floor(timeLeft / (60 * 60 * 1000));
      const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
      startFarmingButton.innerText = `Farming: ${hours}h ${minutes}m ${seconds}s`;
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        startFarmingButton.innerText = 'Claim 1000 🌸';
        startFarmingButton.style.backgroundColor = '#032B44'; // change button color to blue
      }
    }, 1000); // update every 1 second
  } else if (startFarmingButton.innerText === 'Claim 1000 🌸') {
    const userID = getUserIDFromUrl();
    update(ref(database, 'users/' + userID), {
      coin: coinValue + 1000
    }).then(() => {
      coinValue += 1000;
      document.getElementById('coinCount').textContent = '🌸 ' + coinValue.toLocaleString();
      startFarmingButton.innerText = 'Start Farming';
      startFarmingButton.style.backgroundColor = ''; // reset button color
    });
  }
});

// check if startTime is already set in Firebase
const userID = getUserIDFromUrl();
get(ref(database, 'farmingData/' + userID)).then((snapshot) => {
  if (snapshot.exists()) {
    startTime = snapshot.val().startTime;
    countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeLeft = startTime - currentTime;
      const hours = Math.floor(timeLeft / (60 * 60 * 1000));
      const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
      startFarmingButton.innerText = `Farming: ${hours}h ${minutes}m ${seconds}s`;
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        startFarmingButton.innerText = 'Claim 1000 🌸';
        startFarmingButton.style.backgroundColor = '#032B44'; // change button color to blue
      }
    }, 1000); // update every 1 second
  }
});
