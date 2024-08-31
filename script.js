let progressBar = document.querySelector('.progress-bar-inner');
let progress = 0;

let interval = setInterval(function() {
    progress += 1; 
    progressBar.style.width = progress + '%';
    if (progress >= 100) {
        clearInterval(interval); // stop the interval
        setTimeout(function() {
            document.querySelector('.splash-screen').style.display = 'none';
            document.querySelector('.home-page').style.opacity = 1; // show home page
        }, 500); // hide splash screen after 0.5 seconds
    }
}, 10); // update progress bar every 10ms

const tapLogo = document.querySelector('.tap-logo');
const tapLogoText = document.querySelector('#tap-logo-text');
let coin = 0; // initialize coin to 0

setInterval(() => {
  coin += 1000000;
  const formattedCoin = coin.toLocaleString(); // add thousands separator
  tapLogoText.textContent = `$${formattedCoin}`; // update text content
}, 1000); // update every 1 second

tapLogo.addEventListener('click', () => {
  coin++; // increment coin by 1
    const formattedCoin2 = coin.toLocaleString(); // add thousands separator
  tapLogoText.textContent = `$${formattedCoin2 }`; // update text content
  tapLogo.classList.add('clicked'); // add clicked class
  setTimeout(() => {
    tapLogo.classList.remove('clicked'); // remove clicked class after animation finishes
  }, 500); // wait for 500ms (same duration as the animation)
});

const axios = require('axios');

const token = '7507093707:AAH2WtcKPHJ_o-7UjwurMnwL96gs7BKTXFU';

axios.get(`https://api.telegram.org/bot${token}/getUpdates`)
  .then(response => {
    const updates = response.data.result;
    const chatId = updates[0].message.chat.id;
    console.log(`Chat ID: ${chatId}`);

    // Copy chat ID to clipboard
    navigator.clipboard.writeText(chatId)
      .then(() => {
        console.log('Chat ID copied to clipboard!');
      })
      .catch(error => {
        console.error('Error copying chat ID:', error);
      });
  })
  .catch(error => {
    console.error(error);
  });
if (localStorage.getItem('loggedIn') === 'true') {
  // User is already logged in, no need to show the login form
  console.log('Welcome back, ' + localStorage.getItem('username'));
  // You can also redirect to a dashboard or another page here
} else {
  // User is not logged in, show the login form
  console.log('Please log in to access the dashboard');
}
