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

import { getDatabase, ref, get, set, update, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
        document.getElementById('coinCount').textContent = '🌸 ' + coinValue.toLocaleString();
        document.getElementById('mycoin').textContent = '🌸 ' + coinValue.toLocaleString();

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
          welcomeShown: false,
          username: getUsernameFromUrl()
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
  navigator.vibrate(200);
}

const startFarmingButton = document.getElementById('startFarming');
let countdownInterval;
let startTime;

startFarmingButton.addEventListener('click', () => {
  if (startFarmingButton.innerText === 'Start farming') {
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
        startFarmingButton.style.backgroundColor = '#0597F2'; // change button color to blue
        startFarmingButton.style.color = 'white';
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
      startFarmingButton.style.color = '';
      remove(ref(database, 'farmingData/' + userID))
      navigator.vibrate(200);
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
        startFarmingButton.style.backgroundColor = '#0597F2'; // change button color to blue
        startFarmingButton.style.color = 'white';
      }
    }, 1000); // update every 1 second
  }
});


document.getElementById('myuser').textContent = getUsernameFromUrl();
get(ref(database, 'users/')).then((snapshot) => {
  const users = snapshot.val();
  const sortedUsers = Object.keys(users).sort((a, b) => {
    return users[b].coin - users[a].coin;
  });

  const currentUserId = getUserIDFromUrl();
  let rank = 1;
  let myRankValue = 0;

  sortedUsers.forEach((key) => {
    console.log(`Key: ${key}`); // Log each key
    const user = users[key];
    let medal = '';
    switch (rank) {
      case 1:
        medal = '🥇';
        break;
      case 2:
        medal = '🥈';
        break;
      case 3:
        medal = '🥉';
        break;
      default:
        medal = `#${rank}`;
    }
    const holderHTML = `
      <div class="flex item center justify-between bg-[#1c1c1e] p-4" style="margin-bottom: 15px; border-radius: 20px;">
        <div class="flex items-center">
          <img class="w-12 h-12 rounded-full mr-4" height="50" src="https://rulsz.my.id/files/files/sakura_icon.png" width="50"/>
          <div>
            <div class="text-lg font-bold">${user.username}</div>
            <div class="text-gray-400">${user.coin.toLocaleString()} 🌸</div>
          </div>
        </div>
        
        <div class="text-white-500 text-lg font-bold">
          ${medal} <!-- Display the ranking medal or number -->
        </div>
      </div>
    `;
    if (key === currentUserId) {
      myRankValue = rank;
    }
    document.getElementById('holdersList').innerHTML += holderHTML;
    rank++;
  });

  document.getElementById('myrank').textContent = `#${myRankValue}`;
});

get(ref(database, 'tasklist/')).then((snapshot) => {
  const tasklist = snapshot.val();
  Object.keys(tasklist).forEach((key) => {
    console.log(`Key: ${key}`); // Log each key
    const task = tasklist[key];
    const taskHTML = `
      <div class="task">
                <div class="flex items-center space-x-2 task-info">
                  <i class="${task.icon} text-gray-400"></i>
                  <div class="task-details">
                    <div class="task-title">${task.name}</div>
                    <div class="task-reward">Reward: <span class="text-white">${task.reward}</span> 🌸 <span
                          class="text-white">0.1</span> <i class="fas fa-info-circle"></i></div>
                  </div>
                </div>
                <button class="bg-[#282828] text-white px-4 py-1 rounded-lg task-button" data-task-id="${key}" data-reward="${task.reward}" onclick="goToTask(this, ${task.reward}, '${key}', '${task.link}')">Go</button>
              </div>
    `;
    document.getElementById('taskList').innerHTML += taskHTML;
  });
});

get(ref(database, 'tasklist/')).then((snapshot) => {
  const tasklist = snapshot.val();
  Object.keys(tasklist).forEach((key) => {
    console.log(`Key: ${key}`); // Log each key
    const task = tasklist[key];
    const taskHTML = `
      <div class="task" style="background-color: #282828;">
                <div class="flex items-center space-x-2 task-info">
                  <i class="${task.icon} text-gray-400"></i>
                  <div class="task-details">
                    <div class="task-title">${task.name}</div>
                    <div class="task-reward">Reward: <span class="text-white">${task.reward}</span> 🌸 <span
                          class="text-white">0.1</span> <i class="fas fa-info-circle"></i></div>
                  </div>
                </div>
                <button class="bg-[#282828] text-white px-4 py-1 rounded-lg task-button" data-task-id="${key}" data-reward="${task.reward}" onclick="goToTask(this, ${task.reward}, '${key}', '${task.link}')">Go</button>
              </div>
    `;
    document.getElementById('specialList').innerHTML += taskHTML;
  });
});

window.goToTask = goToTask;

function updateTaskStatus(taskID, status) {
  const userID = getUserIDFromUrl();
  const taskRef = ref(database, 'TaskData/' + userID + '/' + taskID);
  set(taskRef, status);
}

function getTaskStatus(button, taskID, reward) {
  const userID = getUserIDFromUrl();
  const taskRef = ref(database, 'TaskData/' + userID + '/' + taskID);
  get(taskRef).then((snapshot) => {
    if (snapshot.exists()) {
      button.textContent = "Claimed";
      button.style.backgroundColor = ""; 
      button.disabled = true; 
    } else {
      button.textContent = "Claim";
      button.style.backgroundColor = "#032B44"; 
    }
  });
}

// Call getTaskStatus when the page loads
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".task-button"); // assuming your buttons have a class of "task-button"
  buttons.forEach((button) => {
    const taskID = button.dataset.taskID; // assuming you have a data attribute on the button with the task ID
    const reward = button.dataset.reward; // assuming you have a data attribute on the button with the reward
    getTaskStatus(button, taskID, reward);
    button.onclick = function() {
      navigator.vibrate(200);
      updateTaskStatus(taskID, true);
      updateCoinCount(reward);
      update(ref(database, 'users/' + getUserIDFromUrl()), { coin: coinValue + reward });
      button.textContent = "Claimed";
      button.style.backgroundColor = ""; 
      button.disabled = true; 
    };
  });
});

function goToTask(button, reward, taskID, taskLink) {
  const userID = getUserIDFromUrl();
  const taskRef = ref(database, 'TaskData/' + userID + '/' + taskID);
  get(taskRef).then((snapshot) => {
    if (snapshot.exists()) {
      button.textContent = "Claimed";
      button.style.backgroundColor = ""; 
      button.disabled = true; 
    } else {
      window.open(taskLink, "_blank");
      button.textContent = "Claim";
      button.style.backgroundColor = "#032B44"; 
      button.onclick = function() {
        navigator.vibrate(200);
        update(ref(database, 'TaskData/' + userID), { [taskID]: true });
        updateCoinCount(reward);
        update(ref(database, 'users/' + userID), { coin: coinValue + reward });
        button.textContent = "Claimed";
        button.style.backgroundColor = ""; 
        button.disabled = true; 
      };
    }
  });
}

function updateCoinCount(reward) {
  console.log("Updating coin count...");
  const coinCountElement = document.getElementById("coinCount");
  const currentCoinCount = parseInt(coinCountElement.textContent.replace("", ""));
  coinValue += reward; 
  coinCountElement.textContent = ` ${coinValue.toLocaleString()}`;
}
