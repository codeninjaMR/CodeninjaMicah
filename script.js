const helloText = document.getElementById('helloText');
const progressFill = document.getElementById('progressFill');
const screamAudio = document.getElementById('screamAudio');
const yayAudio = document.getElementById('yayAudio');
const escapeButton = document.getElementById('escapeButton');

const totalDuration = 4800;
let isCancelled = false;
let rafId = null;

let x = window.innerWidth * 0.5;
let y = window.innerHeight * 0.5;
let dx = 5;
let dy = 4;

function cancelSequence() {
  if (isCancelled) return;

  isCancelled = true;
  if (rafId) cancelAnimationFrame(rafId);

  screamAudio.pause();
  screamAudio.currentTime = 0;
  helloText.classList.add('hidden');
  progressFill.style.width = '100%';
  document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)), url('./images (3).jpg')";
  escapeButton.classList.add('hidden');

  yayAudio.currentTime = 0;
  yayAudio.play().catch(() => {});
}

function updateEscapeButton() {
  if (isCancelled) return;

  const buttonWidth = escapeButton.offsetWidth || 160;
  const buttonHeight = escapeButton.offsetHeight || 52;
  const maxX = window.innerWidth - buttonWidth - 20;
  const maxY = window.innerHeight - buttonHeight - 20;

  x += dx;
  y += dy;

  if (x <= 20 || x >= maxX) {
    dx *= -1;
    x = Math.max(20, Math.min(x, maxX));
  }

  if (y <= 20 || y >= maxY) {
    dy *= -1;
    y = Math.max(20, Math.min(y, maxY));
  }

  escapeButton.style.left = `${x}px`;
  escapeButton.style.top = `${y}px`;

  requestAnimationFrame(updateEscapeButton);
}

function startSequence() {
  if (isCancelled) return;

  const startTime = performance.now();

  function animate(now) {
    if (isCancelled) return;

    const elapsed = now - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);

    progressFill.style.width = `${progress * 100}%`;

    if (progress >= 1) {
      document.body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('./images (2).jpg')";
      helloText.classList.add('hidden');
      screamAudio.currentTime = 0;
      screamAudio.play().catch(() => {});
      return;
    }

    rafId = requestAnimationFrame(animate);
  }

  rafId = requestAnimationFrame(animate);
  requestAnimationFrame(updateEscapeButton);
}

escapeButton.addEventListener('click', cancelSequence);
window.addEventListener('load', startSequence);
