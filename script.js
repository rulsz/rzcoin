let farmingInterval;
    
function showSection(sectionId, iconId) {
    // Hide all sections
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('earnSection').style.display = 'none';
    document.getElementById('frensSection').style.display = 'none';
    document.getElementById('walletSection').style.display = 'none';

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';

    // Reset all icons to gray
    document.getElementById('homeIcon').classList.remove('text-white');
    document.getElementById('homeIcon').classList.add('text-gray-400');
    document.getElementById('earnIcon').classList.remove('text-white');
    document.getElementById('earnIcon').classList.add('text-gray-400');
    document.getElementById('frensIcon').classList.remove('text-white');
    document.getElementById('frensIcon').classList.add('text-gray-400');
    document.getElementById('walletIcon').classList.remove('text-white');
    document.getElementById('walletIcon').classList.add('text-gray-400');

    // Set the selected icon to white
    document.getElementById(iconId).classList.remove('text-gray-400');
    document.getElementById(iconId).classList.add('text-white');

    // Show or hide the farming button based on the section
    if (sectionId === 'homeSection') {
        document.getElementById('farmingButton').style.display = 'block';
    } else {
        document.getElementById('farmingButton').style.display = 'none';
    }
}

// Function to start farming
function startFarming() {
  const farmingButton = document.getElementById('farmingButton');
  const farmingButtonIcon = farmingButton.querySelector('i');
  const farmingButtonSpan = farmingButton.querySelector('span');
  // Check if farming is currently running
  if (farmingButtonIcon.classList.contains('fa-stop-circle')) {
    // Stop farming
    farmingButtonIcon.classList.remove('fa-stop-circle');
    farmingButtonIcon.classList.add('fa-bolt');
    farmingButtonSpan.textContent = 'Start farming';
    clearInterval(farmingInterval); // Stop the interval
  } else {
    // Start farming
    farmingButtonIcon.classList.remove('fa-bolt');
    farmingButtonIcon.classList.add('fa-stop-circle');
    farmingButtonSpan.textContent = 'Stop farming';
    farmingInterval = setInterval(updateCoinCount, 1000); // Update every second
  }
}
// Function to update the coin count
async function updateCoinCount() {
  const coinCount = document.getElementById('coinCount');
  let currentCoins = parseInt(coinCount.textContent.replace('🌸 ', ''), 10); // Get current coins
  // Fetch the latest coin value from Firebase
  try {
    coinValue = await getCoinValue(); // Await the promise to get the value
    // Update the coin count if farming is active
    if (document.getElementById('farmingButton').querySelector('i').classList.contains('fa-stop-circle')) {
      currentCoins += coinValue; // Update currentCoins directly
      coinCount.textContent = '🌸 ' + currentCoins; // Update UI
      // Update the coin value in Firebase
      const userID = getUserIDFromUrl();
      if (userID) {
        set(ref(database, 'users/' + userID), {
          userid: userID,
          coin: currentCoins // Update coin in Firebase
        });
      }
    }
  } catch (error) {
    console.error('Error updating coin count:', error);
  }
}


function goToTask(button, reward) {
    window.open('https://rulsz.eu.org', '_blank');
    button.innerText = 'Claim';
    button.classList.add('claim');
    button.onclick = function() {
        claimReward(reward);
        button.closest('.task').style.display = 'none';
    };
}

function claimReward(reward) {
    coins += reward;
    document.getElementById('coinCount').innerText = `🌸 ${coins.toLocaleString('de-DE')}`;
}

function createSakuraEmoji() {
    const sakuraContainer = document.getElementById('sakuraContainer');
    const sakuraEmoji = document.createElement('div');
    sakuraEmoji.classList.add('sakura-emoji');
    sakuraEmoji.style.left = Math.random() * 100 + 'vw';
    sakuraEmoji.style.animationDuration = Math.random() * 5 + 5 + 's'; // Durasi lebih lama
    sakuraEmoji.innerHTML = '🌸';
    sakuraContainer.appendChild(sakuraEmoji);

    setTimeout(() => {
        sakuraEmoji.remove();
    }, 10000); // Durasi lebih lama
}
setInterval(createSakuraEmoji, 1500); // Interval lebih lama
