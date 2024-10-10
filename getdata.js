function getUsernameFromUrl() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const tgWebAppData = urlParams.get('tgWebAppData');
    if (tgWebAppData) {
        const decodedData = decodeURIComponent(tgWebAppData);
        const userData = JSON.parse(decodeURIComponent(decodedData.split('user=')[1].split('&')[0]));
        return userData.username;
    }
    return null;
}

function getUserIDFromUrl() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const tgWebAppData = urlParams.get('tgWebAppData');
    if (tgWebAppData) {
        const decodedData = decodeURIComponent(tgWebAppData);
        const userID = JSON.parse(decodeURIComponent(decodedData.split('user=')[1].split('&')[0]));
        return userID.id;
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const username = getUsernameFromUrl();
    if (username) {
         document.getElementById('userName').innerText = "@" + username;
    }
});
