/* =====================================================
   BİZİM HİKAYEMİZ — script.js
   ===================================================== */

/* ── Fallback verisi (data.json yüklenemezse kullanılır) ── */
const FALLBACK = {
  couple: {
    name1:     "Furkan",
    name2:     "Derya",
    startDate: "2019-08-30",   // ← Birliktelik başlangıç tarihi (YYYY-MM-DD)
    tagline:   "Her gün seninle daha güzel",
    playlist: [
      "music/Ajda Pekkan - Haykıracak Nefesim Kalmasa Bile (Official Audio) [G81e4utp3Mo].mp3",
      "music/Can Ozan feat. Damla Eker - Öyle kolay aşık olmam [pbeiDLdeaYs].mp3",
      "music/Cem Adrian & Hande Mehan - Sen Benim Şarkılarımsın (Official Audio) [brRnhthvnKs].mp3",
      "music/Dolu Kadehi Ters Tut - Dilerim Ki (Official Audio) [aDju79MtUR8].mp3",
      "music/Nerdeysen [GnJjJDlk7_g].mp3",
      "music/Nilüfer - Son Arzum (Official Audio) [gwtiHjOixDQ].mp3",
      "music/Seni Her Gördüğümde [gtNUnb8UeO4].mp3",
      "music/teoman - Sevdim Seni Bir Kere [C54MOn6n_Ao].mp3"
    ]
  },
  cards: [
    {
      id: 1,
      title:       "İlk Aşkımız",
      category:    "Başlangıç",
      date:        "30 Ağustos 2019",
      description: "Her şeyin başladığı o muhteşem gün… Seni ilk gördüğümde dünya sanki durdu. Gülüşün, bakışların — hepsini ilk andan aklıma kazıdım.\n\nO an bilmiyordum ama bu buluşma hayatımı sonsuza kadar değiştirecekti.",
      image:       "images/first-meet.jpg",
      emoji:       "💫",
      gradient:    "linear-gradient(145deg, #1a0505 0%, #3a0a0a 100%)"
    },
    {
      id: 2,
      title:       "Anılarımız",
      category:    "Özel Anlar",
      date:        "",
      description: "Birlikte yaşadığımız her an kalbimde özel bir yerde saklı.\n\nKahkahalarımız, sarılmalarımız, birlikte izlediğimiz filmler… Her anı seninle güzel.",
      image:       "images/memories.jpg",
      emoji:       "📸",
      gradient:    "linear-gradient(145deg, #050515 0%, #0a0a3a 100%)"
    },
    {
      id: 3,
      title:       "Gezilerimiz",
      category:    "Macera",
      date:        "",
      description: "Seninle yolculuk etmek hayat güzelliği.\n\nHer gittiğimiz yer seninle anlam kazanıyor. Hangi şehirde, hangi kıyıda olursa olsun — sen yanımdayken her yer cennet.",
      image:       "images/travels.jpg",
      emoji:       "✈️",
      gradient:    "linear-gradient(145deg, #051505 0%, #0a3a0a 100%)"
    },
    {
      id: 4,
      title:       "Sana Mektubum",
      category:    "Sevgi Dolu",
      date:        "",
      description: "Sevgili Derya,\n\nBu dünyada seni tanıdığım için kendimi en şanslı insan hissediyorum. Her sabah seni düşünerek uyanmak, her akşam seninle konuşmak — bunlar hayatımın en güzel anları.\n\nSeni seviyorum. Her geçen gün biraz daha.\n\nSonsuza kadar seninle,\nFurkan ❤️",
      image:       "images/letter.jpg",
      emoji:       "💌",
      gradient:    "linear-gradient(145deg, #150510 0%, #2a0a25 100%)"
    },
    {
      id: 5,
      title:       "Doğum Günün",
      category:    "Özel Gün",
      date:        "17 Eylül",
      description: "17 Eylül — seninle aynı dünyayı paylaşmak ne büyük şans.\n\nDerya, bu dünyaya geldiğin gün benim için de bir mucize başladı. Yıllar geçtikçe daha da güzelleşiyorsun — içinden, dışından, her yönünle.\n\nUmarım bu özel günün güzel geçer. Canım benim. ❤️",
      image:       "images/birthday.jpg",
      emoji:       "🎂",
      gradient:    "linear-gradient(145deg, #150015 0%, #3a003a 100%)"
    },
    {
      id: 6,
      title:       "Sürpriz",
      category:    "Özel",
      date:        "",
      description: "🎉 Mutlu Yıllar Sevgilim!\n\nBu sürpriz sadece sana özel… Seni çok seviyorum ve her zaman seveceğim.\n\nSeninle geçirdiğim her an paha biçilemez. İşte bu yüzden bu küçük dünyayı senin için yarattım. ❤️",
      image:       "images/surprise.jpg",
      emoji:       "🎁",
      gradient:    "linear-gradient(145deg, #150a00 0%, #3a1a00 100%)"
    }
  ]
};

/* ── Uygulama durumu ───────────────────────────────────── */
let DATA         = null;
let musicStarted = false;

/* ── Başlatıcı ────────────────────────────────────────── */
async function init() {
  // data.json'ı yüklemeyi dene, başarısız olursa fallback kullan
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error("fetch failed");
    DATA = await res.json();
  } catch {
    console.info("[BizimHikaye] data.json yüklenemedi — varsayılan veri kullanılıyor.");
    DATA = FALLBACK;
  }

  setupCouple();
  setupCounter();
  renderCards();
  setupMusic();
  setupModal();
  setupNavbar();
  initHearts();
  hideLoading();
}

/* ── Çift bilgisi ─────────────────────────────────────── */
function setupCouple() {
  const { name1, name2, tagline } = DATA.couple;

  document.getElementById("hero-title").textContent   = `${name1} ❤️ ${name2}`;
  document.getElementById("hero-tagline").textContent = tagline || "Her gün seninle daha güzel";
  document.getElementById("footer-names").textContent = `${name1} & ${name2}`;
  document.title = `${name1} ❤️ ${name2} — Bizim Hikayemiz`;
}

/* ── Gün sayacı ──────────────────────────────────────── */
function setupCounter() {
  const start = new Date(DATA.couple.startDate);

  function tick() {
    const diff = Math.floor((new Date() - start) / 86400000);
    const el   = document.getElementById("day-count");
    if (el) el.textContent = diff >= 0 ? diff.toLocaleString("tr-TR") : "0";
  }

  tick();
  setInterval(tick, 60_000);
}

/* ── Kartları render et ──────────────────────────────── */
function renderCards() {
  const grid = document.getElementById("cards-grid");
  if (!grid) return;
  grid.innerHTML = "";

  DATA.cards.forEach((card, i) => {
    const el = document.createElement("div");
    el.className = "card";
    el.style.animationDelay = `${i * 0.1}s`;

    el.innerHTML = `
      <!-- gradient arka plan -->
      <div class="card-gradient" style="background:${card.gradient || "#1a0505"}">
        <div class="card-emoji">${card.emoji || "❤️"}</div>
      </div>

      <!-- fotoğraf (varsa) -->
      <img
        class="card-photo"
        src="${card.image || ""}"
        alt="${card.title}"
        loading="lazy"
        onerror="this.style.display='none'"
      />

      <div class="card-overlay"></div>

      <!-- hover play ikonu -->
      <div class="card-play">▶</div>

      <!-- kart metinleri -->
      <div class="card-info">
        <div class="card-cat">${card.category || ""}</div>
        <div class="card-name">${card.title}</div>
        <div class="card-date-tag">📅 ${card.date || ""}</div>
      </div>
    `;

    // Fotoğraf yüklenince gradient+emoji'yi gizle
    const photoEl    = el.querySelector(".card-photo");
    const gradientEl = el.querySelector(".card-gradient");
    photoEl.addEventListener("load",  () => { gradientEl.style.display = "none"; });
    photoEl.addEventListener("error", () => { photoEl.style.display    = "none"; });

    el.addEventListener("click", () => openModal(card));
    grid.appendChild(el);
  });
}

/* ── Modal ───────────────────────────────────────────── */
function openModal(card) {
  // Emoji (başta görünür, fotoğraf gelince gizlenir)
  const emojiBg = document.getElementById("modal-emoji-bg");
  emojiBg.textContent = card.emoji || "❤️";
  emojiBg.style.opacity = "0.3";

  // Görseli doldur
  const img = document.getElementById("modal-img");
  img.style.display = "block";
  img.src   = card.image || "";
  img.alt   = card.title;
  img.onload  = () => { emojiBg.style.opacity = "0"; };          // fotoğraf geldi → emoji gizle
  img.onerror = () => { img.style.display = "none"; emojiBg.style.opacity = "0.4"; }; // fotoğraf yok → emoji göster

  // Gradient arka plan
  const visual = document.getElementById("modal-visual");
  visual.style.background = card.gradient || "#1a0505";

  // Metin alanları
  document.getElementById("modal-category").textContent  = card.category    || "";
  document.getElementById("modal-heading").textContent   = card.title;
  document.getElementById("modal-date").textContent      = card.date ? `📅 ${card.date}` : "";
  document.getElementById("modal-description").textContent = card.description || "";

  // Modalı aç
  document.getElementById("modal-overlay").classList.add("active");
  document.body.style.overflow = "hidden";

  // Sürpriz kartı için confetti efekti
  if (card.id === 6 || card.title === "Sürpriz") {
    burstConfetti();
  }
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
  document.body.style.overflow = "";

  setTimeout(() => {
    const img = document.getElementById("modal-img");
    img.src   = "";
    img.style.display = "block";
  }, 350);
}

function setupModal() {
  document.getElementById("modal-close-x")   .addEventListener("click", closeModal);
  document.getElementById("modal-close-btn") .addEventListener("click", closeModal);

  // Overlay'e tıkla → kapat
  document.getElementById("modal-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modal-overlay")) closeModal();
  });

  // ESC tuşu
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

/* ── Müzik / Playlist ────────────────────────────────── */
function setupMusic() {
  const audio = document.getElementById("bg-music");
  const btn   = document.getElementById("music-btn");
  const icon  = document.getElementById("music-icon");

  // Playlist'i data'dan al (yoksa boş)
  const playlist    = DATA.couple.playlist || [];
  let   trackIndex  = 0;

  audio.volume = 0.45;

  /* Dosya yolunu tarayıcıya uygun URL'e çevir
     (Türkçe karakter, boşluk, köşeli parantez gibi özel karakterleri encode eder) */
  function toSrc(path) {
    return path.split("/").map((seg, i) =>
      i === 0 ? seg : encodeURIComponent(seg)
    ).join("/");
  }

  /* Şarkı adını dosya adından temizle */
  function trackName(path) {
    return path.split("/").pop()
      .replace(/\.[^.]+$/, "")          // .mp3 kaldır
      .replace(/\[.*?\]/g, "")          // [YouTubeID] kaldır
      .replace(/\(Official.*?\)/gi, "") // (Official Audio) kaldır
      .replace(/\(1\)/g, "")            // (1) kaldır
      .replace(/\s+/g, " ")
      .trim();
  }

  /* Belirtilen index'teki şarkıyı yükle ve çal */
  function loadTrack(index, play = false) {
    if (!playlist.length) return;
    trackIndex    = ((index % playlist.length) + playlist.length) % playlist.length;
    audio.src     = toSrc(playlist[trackIndex]);
    audio.load();
    if (play) {
      audio.play().then(() => setPlayingUI(true)).catch(() => {});
    }
  }

  /* UI güncelle */
  function setPlayingUI(playing) {
    if (playing) {
      btn.classList.add("playing");
      icon.textContent = trackName(playlist[trackIndex] || "");
    } else {
      btn.classList.remove("playing");
      icon.textContent = "Müzik";
    }
  }

  // İlk şarkıyı yükle
  loadTrack(0);

  // Şarkı bitince sıradakine geç
  audio.addEventListener("ended", () => loadTrack(trackIndex + 1, true));

  // Hata olursa (dosya bulunamazsa) sıradakine geç
  audio.addEventListener("error", () => {
    console.warn("Şarkı yüklenemedi:", playlist[trackIndex]);
    if (playlist.length > 1) loadTrack(trackIndex + 1, !audio.paused);
  });

  /* Buton: tıklayınca aç/kapat */
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play()
        .then(() => { musicStarted = true; setPlayingUI(true); })
        .catch(() => {});
    } else {
      audio.pause();
      setPlayingUI(false);
    }
  });

  /* Autoplay — sayfa yüklenince dene, olmadı ilk etkileşimde dene */
  function tryAutoplay() {
    if (musicStarted || playlist.length === 0) return;
    audio.play()
      .then(() => { musicStarted = true; setPlayingUI(true); })
      .catch(() => { /* tarayıcı izin vermedi, bekle */ });
  }

  tryAutoplay();

  const onInteract = () => { tryAutoplay(); };
  document.addEventListener("click",      onInteract, { once: true });
  document.addEventListener("touchstart", onInteract, { once: true });
  document.addEventListener("scroll",     onInteract, { once: true });
}

/* ── Navbar scroll efekti ────────────────────────────── */
function setupNavbar() {
  const nav = document.getElementById("navbar");

  // Hero CTA scroll
  document.getElementById("scroll-btn").addEventListener("click", () => {
    document.getElementById("cards-section").scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });
}

/* ── Yükleme ekranını gizle ──────────────────────────── */
function hideLoading() {
  setTimeout(() => {
    document.getElementById("loading-screen").classList.add("hidden");
  }, 900);
}

/* ══════════════════════════════════════════════════════
   YÜZEN KALPLER (Canvas)
   ══════════════════════════════════════════════════════ */
function initHearts() {
  const canvas = document.getElementById("hearts-canvas");
  const ctx    = canvas.getContext("2d");
  let   hearts = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  /* Tek bir kalp nesnesi */
  class FloatHeart {
    constructor(randomY = false) { this.spawn(randomY); }

    spawn(randomY = false) {
      this.x      = Math.random() * canvas.width;
      this.y      = randomY ? Math.random() * canvas.height : canvas.height + 20;
      this.size   = Math.random() * 12 + 6;
      this.vy     = Math.random() * 1.2 + 0.4;
      this.vx     = (Math.random() - 0.5) * 0.6;
      this.alpha  = Math.random() * 0.45 + 0.08;
      this.rot    = Math.random() * Math.PI * 2;
      this.rotSpd = (Math.random() - 0.5) * 0.018;
    }

    /* Kalp şekli çizimi */
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = "#e50914";

      const s = this.size;
      ctx.beginPath();
      // Üst sol eğri
      ctx.moveTo(0, s * 0.35);
      ctx.bezierCurveTo(-s * 0.05, s * 0.15, -s * 0.55, -s * 0.1, -s * 0.5, -s * 0.35);
      ctx.bezierCurveTo(-s * 0.5,  -s * 0.7,  0,         -s * 0.8,  0,         -s * 0.45);
      // Üst sağ eğri
      ctx.bezierCurveTo(0,          -s * 0.8,  s * 0.5,  -s * 0.7,  s * 0.5,  -s * 0.35);
      ctx.bezierCurveTo(s * 0.55,  -s * 0.1,  s * 0.05,  s * 0.15,  0,         s * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    update() {
      this.y    -= this.vy;
      this.x    += this.vx;
      this.rot  += this.rotSpd;
      this.alpha -= 0.0006;
      if (this.y < -30 || this.alpha <= 0) this.spawn();
    }
  }

  // 18 kalp oluştur (başlangıçta ekrana dağıt)
  for (let i = 0; i < 18; i++) hearts.push(new FloatHeart(true));

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => { h.update(); h.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

/* ══════════════════════════════════════════════════════
   CONFETTİ / SPARKLE (Sürpriz kartı için)
   ══════════════════════════════════════════════════════ */
function burstConfetti() {
  const count  = 60;
  const colors = ["#e50914", "#ff6b6b", "#ffb3b3", "#f5c518", "#ffffff", "#ff4444"];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.style.cssText = `
      position: fixed;
      z-index: 9000;
      pointer-events: none;
      width:  ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
      left: ${Math.random() * 100}vw;
      top:  ${Math.random() * 100}vh;
      opacity: 1;
      transition: transform 1.8s ease-out, opacity 1.8s ease-out;
      transform: translate(0, 0) rotate(0deg);
    `;
    document.body.appendChild(el);

    const tx = (Math.random() - 0.5) * 300;
    const ty = (Math.random() - 0.5) * 300;
    const tr = Math.random() * 720;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${tr}deg)`;
        el.style.opacity   = "0";
      });
    });

    setTimeout(() => el.remove(), 2000);
  }
}

/* ── Başlat ───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", init);
