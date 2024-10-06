let farmingInterval;
let coins = 0;

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

function startFarming() {
    const farmingButton = document.getElementById('farmingButton');
    const farmingButtonText = farmingButton.querySelector('span');
    const farmingButtonIcon = farmingButton.querySelector('i');

    if (!farmingInterval) {
        farmingInterval = setInterval(() => {
            coins += 1;
            document.getElementById('coinCount').innerText = `🌸 ${coins.toLocaleString('de-DE')}`;
        }, 1000);
        farmingButtonText.innerText = 'Stop farming';
        farmingButtonIcon.classList.remove('fa-bolt');
        farmingButtonIcon.classList.add('fa-stop');
    } else {
        clearInterval(farmingInterval);
        farmingInterval = null;
        farmingButtonText.innerText = 'Start farming';
        farmingButtonIcon.classList.remove('fa-stop');
        farmingButtonIcon.classList.add('fa-bolt');
    }
}


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

document.addEventListener('DOMContentLoaded', () => {
    const username = getUsernameFromUrl();
    if (username) {
        document.getElementById('userName').innerText = username;
    }
});

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

function claimSakura() {
     coins += 1000;
    document.getElementById('coinCount').innerText = `🌸 ${coins.toLocaleString('de-DE')}`;
    document.getElementById('newUserDialog').classList.remove('show');
}

window.onload = function() {
    setTimeout(function() {
        document.getElementById('newUserDialog').classList.add('show');
    }, 1000); // Tampilkan bottom sheet setelah 1 detik
};

document.addEventListener('DOMContentLoaded', () => {
    const username = getUsernameFromUrl();
    if (username) {
        document.getElementById('userName').innerText = username;
    }
});
