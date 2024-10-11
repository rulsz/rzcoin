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

document.getElementById('rankbut').addEventListener('click', function() {
  // Sembunyikan section lain
  document.getElementById('homeSection').style.display = 'none';
  document.getElementById('earnSection').style.display = 'none';
  document.getElementById('frensSection').style.display = 'none';
  document.getElementById('walletSection').style.display = 'none';

  // Tampilkan rankSection
  document.getElementById('rankSection').style.display = 'block';
});

function shareTelegramLink() {
  const redirectUrl = 'https://rulsz.my.id/files/files/redirect.php';
  window.location.href = redirectUrl;
}
