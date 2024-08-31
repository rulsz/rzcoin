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

  // Initialize the Telegram Web App API
  Telegram.WebApp.init({
    botToken: '7507093707:AAH2WtcKPHJ_o-7UjwurMnwL96gs7BKTXFU',
    // Other initialization options...
  });

  // Get the chat ID
  Telegram.WebApp.onReady().then(() => {
    const chatId = Telegram.WebApp.getChatId();
    console.log('Chat ID:', chatId);

    // Copy the chat ID to the clipboard
    navigator.clipboard.writeText(chatId).then(() => {
      console.log('Chat ID copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying chat ID:', error);
    });
  });
