// Floating petals animation
(function () {
  const emojis = ['🌸', '💕', '✨', '🌷', '💗', '🌺', '💖', '⭐'];
  const container = document.getElementById('petals');
  if (!container) return;

  const count = window.innerWidth < 480 ? 12 : 22;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left              = Math.random() * 100 + 'vw';
    el.style.fontSize          = (0.8 + Math.random() * 1.1) + 'rem';
    el.style.animationDuration = (8 + Math.random() * 10) + 's';
    el.style.animationDelay    = (-Math.random() * 14) + 's';
    el.style.opacity           = 0.35 + Math.random() * 0.35;
    container.appendChild(el);
  }
})();
