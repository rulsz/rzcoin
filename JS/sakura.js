
// Mendapatkan elemen canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Mengatur ukuran gambar
const gambarSize = 50;

// Mengatur jumlah gambar
const jumlahGambar = 20;
const jumlahBoom = 1;
const jumlahEs = 1;

// Mengatur posisi awal gambar
let gambar = [];
let boom = [];
let es = [];
for (let i = 0; i < jumlahGambar; i++) {
  gambar.push({
    x: Math.random() * (canvas.width - gambarSize),
    y: Math.random() * -canvas.height,
    speed: Math.random() * 2 + 1,
    angle: Math.random() * 360 // tambahkan atribut angle
  });
}
for (let i = 0; i < jumlahBoom; i++) {
  boom.push({
    x: Math.random() * (canvas.width - gambarSize),
    y: Math.random() * -canvas.height,
    speed: Math.random() * 2 + 1,
    angle: Math.random() * 360
  });
}
for (let i = 0; i < jumlahEs; i++) {
  es.push({
    x: Math.random() * (canvas.width - gambarSize),
    y: Math.random() * -canvas.height,
    speed: Math.random() * 2 + 1,
    angle: Math.random() * 360
  });
}

// Mengatur skor
let skor = 0;

// Mengatur waktu
let waktu = 30; // 30 detik
let intervalWaktu;

// Membuat gambar
const gambarImage = new Image();
gambarImage.src = 'sakura.png'; // Ganti dengan nama file gambar kamu
const boomImage = new Image();
boomImage.src = 'branch.png'; // Ganti dengan nama file gambar boom kamu
const esImage = new Image();
esImage.src = 'es.png'; // Ganti dengan nama file gambar boom kamu


// Fungsi untuk menggambar gambar
function drawGambar() {
  for (let i = 0; i < gambar.length; i++) {
    ctx.save(); // simpan konteks canvas
    ctx.translate(gambar[i].x + gambarSize / 2, gambar[i].y + gambarSize / 2); // pindahkan titik asal ke pusat gambar
    ctx.rotate(gambar[i].angle * Math.PI / 180); // putar gambar
    ctx.drawImage(gambarImage, -gambarSize / 2, -gambarSize / 2, gambarSize, gambarSize); // gambar sakura
    ctx.restore(); // kembalikan konteks canvas
  }
  for (let i = 0; i < boom.length; i++) {
  ctx.save(); // simpan konteks canvas
  ctx.translate(boom[i].x + gambarSize / 2, boom[i].y + gambarSize / 2); // pindahkan titik asal ke pusat gambar
  ctx.rotate(boom[i].angle * Math.PI / 180); // putar gambar
  ctx.drawImage(boomImage, -gambarSize / 2, -gambarSize / 2, gambarSize, gambarSize); // gambar boom
  ctx.restore(); // kembalikan konteks canvas
}
for (let i = 0; i < es.length; i++) {
  ctx.save(); // simpan konteks canvas
  ctx.translate(es[i].x + gambarSize / 2, es[i].y + gambarSize / 2); // pindahkan titik asal ke pusat gambar
  ctx.rotate(es[i].angle * Math.PI / 180); // putar gambar
  ctx.drawImage(esImage, -gambarSize / 2, -gambarSize / 2, gambarSize, gambarSize); // gambar es
  ctx.restore(); // kembalikan konteks canvas
}
}

let isFrozen = false;
// Fungsi untuk mengupdate posisi gambar
function updateGambar() {
  if (!isFrozen) {
  for (let i = 0; i < gambar.length; i++) {
    gambar[i].y += gambar[i].speed;
    gambar[i].angle += 2; // update nilai angle
    if (gambar[i].y > canvas.height) {
      gambar[i].y = Math.random() * -canvas.height;
      gambar[i].x = Math.random() * (canvas.width - gambarSize);
      gambar[i].angle = Math.random() * 360; // reset nilai angle
    }
  }
  for (let i = 0; i < boom.length; i++) {
  boom[i].y += boom[i].speed;
  boom[i].angle += 1; // update nilai angle
  if (boom[i].y > canvas.height) {
    boom[i].y = Math.random() * -canvas.height;
    boom[i].x = Math.random() * (canvas.width - gambarSize);
    boom[i].angle = Math.random() * 360; // reset nilai angle
  }
}
for (let i = 0; i < es.length; i++) {
  es[i].y += es[i].speed;
  es[i].angle += 3; // update nilai angle
  if (es[i].y > canvas.height) {
    es[i].y = Math.random() * -canvas.height;
    es[i].x = Math.random() * (canvas.width - gambarSize);
    es[i].angle = Math.random() * 360; // reset nilai angle
  }
}
}
}

// Fungsi untuk menangkap gambar
function catchGambar(event) {
  // Mendapatkan posisi mouse
  const mouseX = event.clientX;
  const mouseY = event.clientY;


// Mengecek apakah gambar atau boom berada di dalam area mouse
for (let i = 0; i < gambar.length; i++) {
  if (mouseX > gambar[i].x && mouseX < gambar[i].x + gambarSize &&
    mouseY > gambar[i].y && mouseY < gambar[i].y + gambarSize) {
    skor += Math.floor(Math.random() * 5) + 1; // add a random score between 1 and 10
    gambar[i].y = Math.random() * -canvas.height;
    gambar[i].x = Math.random() * (canvas.width - gambarSize);

  }
}

for (let i = 0; i < boom.length; i++) {
  if (mouseX > boom[i].x && mouseX < boom[i].x + gambarSize &&
    mouseY > boom[i].y && mouseY < boom[i].y + gambarSize) {
    skor = 0; // reset skor
    boom[i].y = Math.random() * -canvas.height;
    boom[i].x = Math.random() * (canvas.width - gambarSize);
  }
}
for (let i = 0; i < es.length; i++) {
  if (mouseX > es[i].x && mouseX < es[i].x + gambarSize &&
    mouseY > es[i].y && mouseY < es[i].y + gambarSize) {
    es[i].y = Math.random() * -canvas.height;
    es[i].x = Math.random() * (canvas.width - gambarSize);
    isFrozen = true; // Membekukan semua gambar
    document.body.style.backgroundImage = 'url(sakura_background.png)';
    setTimeout(function() {
      isFrozen = false; // Membatalkan pembekuan setelah 3 detik
      document.body.style.backgroundImage = 'url(sakura_background.png)';
    }, 3000);
  }
}
}



// Fungsi untuk menggambar skor
function drawSkor() {
  ctx.font = '26px Arial';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`🌸 ${skor}`, 20,20);
}

// Fungsi untuk menggambar waktu
function drawWaktu() {
  ctx.font = '26px Arial Bold';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.fillText(`0:${waktu}`, canvas.width - 20, 20);
}

// Fungsi untuk mengupdate game
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGambar();
  updateGambar();
  drawSkor();
  drawWaktu();
  requestAnimationFrame(updateGame);
}

// Fungsi untuk mengupdate waktu
function updateWaktu() {
  waktu--;
  if (waktu <= 0) {
    clearInterval(intervalWaktu);
    alert(`Waktu habis! Skor kamu adalah ${skor}`);
  }
}

// Mengatur event listener untuk menangkap gambar
canvas.addEventListener('click', catchGambar);

// Memulai game
updateGame();
intervalWaktu = setInterval(updateWaktu, 1000); // 1 detik
