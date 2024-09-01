const currentUrl = window.location.href;
const url = new URL(currentUrl);
const tgWebAppData = url.hash.split('&')[0].split('=')[1];
const userData = JSON.parse(decodeURIComponent(tgWebAppData));
const username = userData.username;

const infoElement = document.querySelector('.info');
infoElement.innerHTML = currentUrl;
