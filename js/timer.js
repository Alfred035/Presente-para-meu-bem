// Relationship timer — counting since 22 Feb 2025 07:25
(function () {
  const START = new Date('2025-02-22T07:25:00');

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function pad(n, len) {
    return String(n).padStart(len || 2, '0');
  }

  function update() {
    const diff    = Date.now() - START.getTime();
    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (daysEl)    daysEl.textContent    = pad(days, 3);
    if (hoursEl)   hoursEl.textContent   = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
})();
