// Populate "I love you" cards in all languages
(function () {
  const LOVES = [
    { flag: "🇧🇷", text: "Eu te amo",                         lang: "Português" },
    { flag: "🇺🇸", text: "I love you",                         lang: "Inglês" },
    { flag: "🇪🇸", text: "Te quiero",                          lang: "Espanhol" },
    { flag: "🇫🇷", text: "Je t'aime",                          lang: "Francês" },
    { flag: "🇮🇹", text: "Ti amo",                             lang: "Italiano" },
    { flag: "🇩🇪", text: "Ich liebe dich",                     lang: "Alemão" },
    { flag: "🇯🇵", text: "愛してる",                            lang: "Japonês" },
    { flag: "🇨🇳", text: "我爱你",                              lang: "Chinês" },
    { flag: "🇰🇷", text: "사랑해",                              lang: "Coreano" },
    { flag: "🇷🇺", text: "Я тебя люблю",                       lang: "Russo" },
    { flag: "🇸🇦", text: "أحبك",                               lang: "Árabe" },
    { flag: "🇮🇳", text: "मैं तुमसे प्यार करता हूँ",           lang: "Hindi" },
    { flag: "🇵🇹", text: "Amo-te",                             lang: "Português de Portugal" },
    { flag: "🇬🇷", text: "Σ'αγαπώ",                            lang: "Grego" },
    { flag: "🇹🇷", text: "Seni seviyorum",                     lang: "Turco" },
    { flag: "🇵🇱", text: "Kocham cię",                         lang: "Polonês" },
    { flag: "🇳🇱", text: "Ik hou van je",                      lang: "Holandês" },
    { flag: "🇸🇪", text: "Jag älskar dig",                     lang: "Sueco" },
    { flag: "🇳🇴", text: "Jeg elsker deg",                     lang: "Norueguês" },
    { flag: "🇫🇮", text: "Minä rakastan sinua",                lang: "Finlandês" },
    { flag: "🇭🇺", text: "Szeretlek",                          lang: "Húngaro" },
    { flag: "🇨🇿", text: "Miluji tě",                          lang: "Tcheco" },
    { flag: "🇷🇴", text: "Te iubesc",                          lang: "Romeno" },
    { flag: "🇺🇦", text: "Я тебе кохаю",                       lang: "Ucraniano" },
    { flag: "🇮🇱", text: "אני אוהב אותך",                      lang: "Hebraico" },
    { flag: "🇹🇭", text: "ฉันรักคุณ",                           lang: "Tailandês" },
    { flag: "🇮🇩", text: "Aku cinta kamu",                     lang: "Indonésio" },
    { flag: "🇻🇳", text: "Anh yêu em",                         lang: "Vietnamita" },
    { flag: "🇲🇽", text: "Te adoro",                           lang: "Mexicano" },
    { flag: "🇿🇦", text: "Ek is lief vir jou",                 lang: "Africâner" },
    { flag: "🇪🇬", text: "بحبك",                               lang: "Árabe Egípcio" },
    { flag: "🇵🇭", text: "Mahal kita",                         lang: "Filipino" },
    { flag: "🇲🇾", text: "Saya cinta awak",                    lang: "Malaio" },
    { flag: "🇨🇦", text: "Je t'aime tant",                     lang: "Francês Canadense" },
    { flag: "🏴", text: "Rwy'n dy garu di",               lang: "Galês" },
    { flag: "🇮🇪", text: "Tá grá agam ort",                    lang: "Irlandês" },
  ];

  const grid = document.getElementById('grid');
  if (!grid) return;

  LOVES.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = (i * 0.04) + 's';
    card.innerHTML =
      `<span class="flag">${item.flag}</span>` +
      `<div class="card-body">` +
        `<span class="ilu">${item.text}</span>` +
        `<span class="lang">${item.lang}</span>` +
      `</div>`;
    grid.appendChild(card);
  });
})();
