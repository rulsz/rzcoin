const currentUrl = window.location.href;
const url = new URL(currentUrl);
const tgWebAppData = url.hash.split('&')[0].split('=')[1];
const userData = JSON.parse(decodeURIComponent(tgWebAppData));
const username = userData.username;

navigator.clipboard.writeText(username).then(() => {
  console.log('Username copied to clipboard!');
}).catch((error) => {
  console.error('Error copying username:', error);
});
