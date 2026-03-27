// Bow & arrow mini-game
(function () {
  const MESSAGES = [
    { text: "I Love You 💕",              emoji: "💕", sub: "te amo demais" },
    { text: "I Miss You 🌸",              emoji: "🌸", sub: "saudades de você" },
    { text: "You're my everything ✨",    emoji: "✨", sub: "minha vida toda" },
    { text: "My heart is yours 💗",       emoji: "💗", sub: "sempre" },
    { text: "You're so cute 🥰",          emoji: "🥰", sub: "demasiado fofa" },
    { text: "Always & forever 🌷",        emoji: "🌷", sub: "pra sempre" },
    { text: "My favorite person 🌟",      emoji: "🌟", sub: "a minha preferida" },
    { text: "You make me happy 🍀",       emoji: "🍀", sub: "você me faz feliz" },
    { text: "Thinking of you 💭",         emoji: "💭", sub: "todo segundo" },
    { text: "Te Amo, Tamires 💖",         emoji: "💖", sub: "do fundo do coração" },
    { text: "Você é incrível 🌺",         emoji: "🌺", sub: "sabia?" },
    { text: "Dream girl 🦋",              emoji: "🦋", sub: "você é perfeita" },
  ];

  let score    = 0;
  let msgIndex = 0;
  let target   = null;
  let animId   = null;

  const canvas    = document.getElementById('gameCanvas');
  const ctx       = canvas.getContext('2d');
  const gameArea  = document.getElementById('gameArea');
  const popup     = document.getElementById('popup');
  const popupText = document.getElementById('popupText');
  const popupEmoji= document.getElementById('popupEmoji');
  const popupSub  = document.getElementById('popupSub');
  const scoreEl   = document.getElementById('score');

  /* ---- resize ---- */
  function resize() {
    canvas.width  = gameArea.clientWidth;
    canvas.height = gameArea.clientHeight;
    if (!target) spawnTarget();
  }

  /* ---- target ---- */
  function spawnTarget() {
    const r  = Math.max(18, Math.min(34, canvas.width * 0.05));
    const x  = r + Math.random() * (canvas.width  - 2 * r);
    const y  = r + Math.random() * (canvas.height - 2 * r);
    const vx = (1.2 + Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1);
    const vy = (0.8 + Math.random() * 1.5) * (Math.random() < 0.5 ? 1 : -1);
    target = { x, y, r, vx, vy, pulse: 0 };
  }

  function drawTarget(t) {
    t.pulse += 0.06;
    const s = 1 + 0.08 * Math.sin(t.pulse);

    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.scale(s, s);

    // Glow
    const grd = ctx.createRadialGradient(0, 0, t.r * 0.1, 0, 0, t.r * 1.6);
    grd.addColorStop(0, 'rgba(244,160,181,0.25)');
    grd.addColorStop(1, 'rgba(244,160,181,0)');
    ctx.beginPath();
    ctx.arc(0, 0, t.r * 1.6, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // Rings
    [
      { r: 1.0,  color: '#f4a0b5' },
      { r: 0.72, color: '#fff3b0' },
      { r: 0.44, color: '#e8d5f5' },
      { r: 0.18, color: '#f4a0b5' },
    ].forEach(ring => {
      ctx.beginPath();
      ctx.arc(0, 0, t.r * ring.r, 0, Math.PI * 2);
      ctx.fillStyle = ring.color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Heart emoji
    ctx.font = `${t.r * 0.7}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💕', 0, 1);

    ctx.restore();
  }

  /* ---- game loop ---- */
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (target) {
      target.x += target.vx;
      target.y += target.vy;

      // Gentle speed cap
      const spd = Math.hypot(target.vx, target.vy);
      const max = 3.5 + score * 0.08;
      if (spd < max) { target.vx *= 1.001; target.vy *= 1.001; }

      if (target.x - target.r < 0)              { target.x = target.r;              target.vx *= -1; }
      if (target.x + target.r > canvas.width)   { target.x = canvas.width - target.r;  target.vx *= -1; }
      if (target.y - target.r < 0)              { target.y = target.r;              target.vy *= -1; }
      if (target.y + target.r > canvas.height)  { target.y = canvas.height - target.r; target.vy *= -1; }

      drawTarget(target);
    }

    animId = requestAnimationFrame(loop);
  }

  /* ---- input helpers ---- */
  function canvasPos(e) {
    const rect  = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const src    = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top)  * scaleY,
    };
  }

  function tryHit(e) {
    e.preventDefault();
    if (!target) return;
    const { x, y } = canvasPos(e);
    if (Math.hypot(x - target.x, y - target.y) <= target.r) {
      score++;
      scoreEl.textContent = score;
      spawnParticles(target.x, target.y);
      target = null;
      setTimeout(spawnTarget, 550);
      showMessage();
    }
  }

  /* ---- popup ---- */
  function showMessage() {
    const m = MESSAGES[msgIndex % MESSAGES.length];
    msgIndex++;
    popupText.textContent  = m.text;
    popupEmoji.textContent = m.emoji;
    popupSub.textContent   = m.sub;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 2000);
  }

  /* ---- particles ---- */
  function spawnParticles(cx, cy) {
    const emojis    = ['💕','✨','🌸','💗','⭐','🌷'];
    const canvasRect = canvas.getBoundingClientRect();
    const relX = cx * (canvasRect.width  / canvas.width);
    const relY = cy * (canvasRect.height / canvas.height);

    for (let i = 0; i < 8; i++) {
      const el    = document.createElement('span');
      el.className = 'particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
      const dist  = 50 + Math.random() * 55;
      el.style.left = relX + 'px';
      el.style.top  = relY + 'px';
      el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      gameArea.appendChild(el);
      setTimeout(() => el.remove(), 800);
    }
  }

  /* ---- events ---- */
  canvas.addEventListener('click',      tryHit);
  canvas.addEventListener('touchstart', tryHit, { passive: false });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });

  resize();
  loop();
})();
