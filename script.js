let progress = 0;
let intervalId;
let isProgressRunning = false;
let getClaim = false;

function startProgres() {
  isProgressRunning = true;
  document.querySelector('.button-farming').classList.add('active');

  intervalId = setInterval(() => {
    if (progress < 100) {
      progress++;
      document.querySelector('.progres-bar-fill').style.width = `${progress}%`;
      document.querySelector('.progres-text').textContent = `Farming ${progress}%`;
    } else {
      clearInterval(intervalId);
      onProgressComplete(); // Call onProgressComplete() when progress reaches 100%
    }
  }, 1000);
}

function onProgressComplete() {
  let getClaim = true;
  isProgressRunning = false;
  document.querySelector('.button-farming').classList.remove('active');
  document.querySelector('.button-farming').disabled = false; // enable the button again
  document.querySelector('.progres-text').textContent = 'Claim';
  
}

document.querySelector('.button-farming').addEventListener('click', function(event) {
  if (isProgressRunning) {
    console.log('Button clicked while progress is running!');
    this.disabled = true; // disable the button
  } else {
    startProgres();
  }
});
