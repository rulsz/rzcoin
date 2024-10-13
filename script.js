let farmingInterval;
    
function showSection(sectionId, iconId, textId) {
    // Hide all sections
    document.getElementById('homeSection').style.display = 'none';
    document.getElementById('earnSection').style.display = 'none';
    document.getElementById('frensSection').style.display = 'none';
    document.getElementById('walletSection').style.display = 'none';
    document.getElementById("rankSection").style.display = "none";

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

    // Reset all text to gray
    document.getElementById('homeText').classList.remove('text-white');
    document.getElementById('homeText').classList.add('text-gray-400');
    document.getElementById('earnText').classList.remove('text-white');
    document.getElementById('earnText').classList.add('text-gray-400');
    document.getElementById('frensText').classList.remove('text-white');
    document.getElementById('frensText').classList.add('text-gray-400');
    document.getElementById('walletText').classList.remove('text-white');
    document.getElementById('walletText').classList.add('text-gray-400');

    // Set the selected icon to white
    document.getElementById(iconId).classList.remove('text-gray-400');
    document.getElementById(iconId).classList.add('text-white');

    // Set the selected icon to white
    document.getElementById(textId).classList.remove('text-gray-400');
    document.getElementById(textId).classList.add('text-white');

    // Show or hide the farming button based on the section
    if (sectionId === 'homeSection') {
        document.getElementById('farmingButton').style.display = 'block';
    } else {
        document.getElementById('farmingButton').style.display = 'none';
    }
}



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
        document.getElementById('coinCount').textContent = '🌸 ' + coinValue;

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

function shareTelegramLink() {
  const userID = getUserIDFromUrl();
  const redirectUrl = `https://rulsz.my.id/files/files/redirect.php?id=${userID}`;
  window.location.href = redirectUrl;
}

function copyTelegramLink() {
  const userID = getUserIDFromUrl();
  const textToCopy = `Let's have fun together and collect as many points as possible. You can earn 1000 points if you open my link below: https://t.me/rzcoin_bot/RZCoin?startapp=${userID} Let's play and get started!`;
  const refCode = "YOUR_REFERRAL_CODE";

  copyToClipboard(refCode);
 Telegram.WebApp.showAlert("Referral code copied to clipboard!");
}

function ranksec() {
  // Hide all other sections
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("earnSection").style.display = "none";
  document.getElementById("frensSection").style.display = "none";
  document.getElementById("walletSection").style.display = "none";
  document.getElementById("farmingButton").style.display = "none";

  // Show the rankSection
  document.getElementById("rankSection").style.display = "block";
}

document.addEventListener('DOMContentLoaded', () => {
  
});
