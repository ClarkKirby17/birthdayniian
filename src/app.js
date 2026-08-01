/* ==================================================================
   EDIT EVERYTHING IN THIS BLOCK. Nothing below it needs touching.
   ================================================================== */

const CONFIG = {
  // ---- Names and copy ----------------------------------------------
  initials: "YA",
  heroTitle: "Happy Birthday Ya!",
  enterButton: "Pindutin mo 'to",
  transitionText: "Tanda mo na hahahahahaha",

  siteHeadline: "Happy birthday ya, pwede na pang portfolio 'to",
  greetingsSub: "Mga taong hindi nakapunta, pero may sinabi pa rin.",
  gallerySub: "Ebidensya. Wala nang bawian.",
  shotpunoSub: "Sunod-sunod. Walang palusot.",

  messageTitle: "Salamat, tol",
  message: `Isa ka sa mga taong hindi mo kailangang tawagan para malaman mong nandiyan.

Sana ganito pa rin sa susunod na taon: mahaba ang gabi, mura ang alak, at walang umuuwi nang maaga.

Happy birthday. Tagay.`,
  signedBy: "— Mula sa aming lahat",

  // ---- Photos and videos -------------------------------------------
  // Put files in /public/... then list them here.
  avatar: "/images/avatar.png",
  heroPhoto: "/images/hero.jpg",

  // Faces that bounce around the background. Add as many as you want.
  faces: [
    // "/images/face1.png",
    // "/images/face2.png",
  ],
 faceCount: 4,
faceSize: 90,
faceOpacity: 0.09,
  faceSpeed: 0.55, // higher = faster

  videos: [
    // { src: "/videos/kevin.mp4", name: "Kevin" },
    // { src: "/videos/tita.mp4",  name: "Tita Baby" },
  ],

  gallery: [
    // "/images/gallery/01.jpg",
    // "/images/gallery/02.jpg",
  ],

  // ---- The drinking queue ------------------------------------------
  queue: [],
};

/* ==================================================================
   Below here: the actual site. Read it if you're curious, but you
   don't need to edit anything.
   ================================================================== */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// A stand-in face so the background works before you add real photos.
const PLACEHOLDER_FACE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="#fff"/>
      <circle cx="35" cy="40" r="6" fill="#000"/>
      <circle cx="65" cy="40" r="6" fill="#000"/>
      <path d="M30 62q20 20 40 0" stroke="#000" stroke-width="6" fill="none" stroke-linecap="round"/>
    </svg>`,
  );

/* ---------- Fill in all the text marked with data-config ---------- */
$$("[data-config]").forEach((el) => {
  const value = CONFIG[el.dataset.config];
  if (value) el.textContent = value;
});
if (CONFIG.avatar) $("#nav-avatar").src = CONFIG.avatar;
if (CONFIG.heroPhoto) $("#hero-photo").src = CONFIG.heroPhoto;

/* ==================================================================
   BOUNCING FACES
   Each face is a floating image that travels in a straight line and
   flips direction whenever it touches an edge of the screen.
   ================================================================== */
function startBouncingFaces() {
  const layer = $("#bounce-layer");
  const sources = CONFIG.faces.length ? CONFIG.faces : [PLACEHOLDER_FACE];
  const faces = [];

  for (let i = 0; i < CONFIG.faceCount; i++) {
    const img = document.createElement("img");
    img.src = sources[i % sources.length];
    img.alt = "";
    const size = CONFIG.faceSize * (0.7 + Math.random() * 0.7);
    img.style.cssText = `position:absolute;width:${size}px;height:${size}px;
      object-fit:cover;border-radius:9999px;opacity:${CONFIG.faceOpacity};
      filter:grayscale(1) contrast(1.1);will-change:transform`;
    layer.appendChild(img);

    faces.push({
      el: img,
      size,
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size),
      dx: (Math.random() > 0.5 ? 1 : -1) * CONFIG.faceSpeed * (0.6 + Math.random()),
      dy: (Math.random() > 0.5 ? 1 : -1) * CONFIG.faceSpeed * (0.6 + Math.random()),
      spin: (Math.random() - 0.5) * 0.4,
      angle: 0,
    });
  }

  function frame() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (const f of faces) {
      f.x += f.dx;
      f.y += f.dy;
      f.angle += f.spin;

      // Bounce off the edges.
      if (f.x <= 0) { f.x = 0; f.dx *= -1; }
      if (f.y <= 0) { f.y = 0; f.dy *= -1; }
      if (f.x + f.size >= w) { f.x = w - f.size; f.dx *= -1; }
      if (f.y + f.size >= h) { f.y = h - f.size; f.dy *= -1; }

      f.el.style.transform = `translate(${f.x}px, ${f.y}px) rotate(${f.angle}deg)`;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
startBouncingFaces();

/* ==================================================================
   LANDING → TRANSITION → SITE
   ================================================================== */
$("#enter-btn").addEventListener("click", () => {
  const landing = $("#landing");
  const transition = $("#transition");
  const site = $("#site");

  // 1. Landing drops away
  landing.style.transition = "opacity .5s ease, transform .5s ease";
  landing.style.opacity = "0";
  landing.style.transform = "scale(1.06)";

  // 2. Slam screen
  setTimeout(() => {
    landing.remove();
    transition.classList.remove("hidden");
    transition.classList.add("flex");
    $("#transition-text").classList.add("animate-slam");
  }, 450);

  // 3. Site fades in
  setTimeout(() => {
    transition.style.transition = "opacity .6s ease";
    transition.style.opacity = "0";
    site.classList.remove("hidden");
    site.style.opacity = "0";
    requestAnimationFrame(() => {
      site.style.transition = "opacity .8s ease";
      site.style.opacity = "1";
    });
    revealOnScroll();
  }, 2200);

  setTimeout(() => transition.remove(), 3000);
});

/* ==================================================================
   GREETINGS + GALLERY
   ================================================================== */
function buildGreetings() {
  const rail = $("#greetings-rail");
  const items = CONFIG.videos.length ? CONFIG.videos : Array(3).fill(null);

  rail.innerHTML = items
    .map((video, i) => {
      if (!video) {
        return `<div class="w-[260px] shrink-0 sm:w-[300px]">
            <div class="flex aspect-square w-full items-center justify-center bg-slab text-center text-[0.6rem] uppercase tracking-[0.2em] text-black/40">
              Video slot ${i + 1}
            </div>
          </div>`;
      }
      return `<button class="video-card w-[260px] shrink-0 text-left sm:w-[300px]" data-index="${i}">
          <div class="relative aspect-square w-full overflow-hidden bg-slab">
            <video src="${video.src}#t=0.1" preload="metadata" muted playsinline
                   class="h-full w-full object-cover"></video>
            <span class="absolute inset-0 flex items-center justify-center bg-black/25 font-display text-4xl text-white opacity-80">▶</span>
          </div>
          <p class="mt-3 font-display text-lg">${video.name}</p>
        </button>`;
    })
    .join("");

  $$(".video-card").forEach((card) =>
    card.addEventListener("click", () => openVideo(Number(card.dataset.index))),
  );
}

function buildGallery() {
  const rail = $("#gallery-rail");
  const items = CONFIG.gallery.length ? CONFIG.gallery : Array(3).fill(null);

  rail.innerHTML = items
    .map((src, i) => {
      if (!src) {
        return `<div class="flex aspect-square w-[260px] shrink-0 items-center justify-center bg-slab text-[0.6rem] uppercase tracking-[0.2em] text-black/40 sm:w-[300px]">
            Photo slot ${i + 1}
          </div>`;
      }
      return `<button class="photo-card aspect-square w-[260px] shrink-0 overflow-hidden bg-slab sm:w-[300px]" data-index="${i}">
          <img src="${src}" alt="" loading="lazy"
               class="h-full w-full object-cover transition duration-500 hover:scale-105" />
        </button>`;
    })
    .join("");

  $$(".photo-card").forEach((card) =>
    card.addEventListener("click", () => openLightbox(Number(card.dataset.index))),
  );
}

buildGreetings();
buildGallery();

/* ---------- Carousel arrows ---------- */
$$(".rail-prev, .rail-next").forEach((btn) => {
  btn.addEventListener("click", () => {
    const rail = document.getElementById(btn.dataset.rail);
    const step = rail.firstElementChild?.offsetWidth ?? 300;
    rail.scrollBy({ left: btn.classList.contains("rail-next") ? step + 24 : -(step + 24), behavior: "smooth" });
  });
});

/* ---------- Video modal ---------- */
function openVideo(index) {
  const video = CONFIG.videos[index];
  if (!video) return;
  $("#video-title").textContent = video.name;
  $("#video-player").src = video.src;
  $("#video-modal").classList.replace("hidden", "flex");
  document.body.style.overflow = "hidden";
}
function closeVideo() {
  $("#video-player").pause();
  $("#video-player").removeAttribute("src");
  $("#video-modal").classList.replace("flex", "hidden");
  document.body.style.overflow = "";
}
$("#video-close").addEventListener("click", closeVideo);
$("#video-modal").addEventListener("click", (e) => {
  if (e.target.id === "video-modal") closeVideo();
});

/* ---------- Lightbox ---------- */
let lightboxIndex = 0;
function openLightbox(index) {
  lightboxIndex = index;
  renderLightbox();
  $("#lightbox").classList.replace("hidden", "flex");
  document.body.style.overflow = "hidden";
}
function renderLightbox() {
  $("#lightbox-img").src = CONFIG.gallery[lightboxIndex];
  $("#lightbox-count").textContent = `${lightboxIndex + 1} / ${CONFIG.gallery.length}`;
}
function stepLightbox(direction) {
  lightboxIndex = (lightboxIndex + direction + CONFIG.gallery.length) % CONFIG.gallery.length;
  renderLightbox();
}
function closeLightbox() {
  $("#lightbox").classList.replace("flex", "hidden");
  document.body.style.overflow = "";
}
$("#lightbox-close").addEventListener("click", closeLightbox);
$("#lightbox-prev").addEventListener("click", () => stepLightbox(-1));
$("#lightbox-next").addEventListener("click", () => stepLightbox(1));
$("#lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeLightbox(); closeVideo(); }
  if (!$("#lightbox").classList.contains("hidden")) {
    if (e.key === "ArrowRight") stepLightbox(1);
    if (e.key === "ArrowLeft") stepLightbox(-1);
  }
});

/* ==================================================================
   SHOT PUNO — queue, scores, log, timer
   Everything is saved in localStorage so a refresh loses nothing.
   ================================================================== */
const STORE_KEY = "shotpuno-v1";

const blankState = () => ({
  turn: 0,
  shots: Object.fromEntries(CONFIG.queue.map((n) => [n, 0])),
  log: [],
  timer: { running: false, banked: 0, startedAt: null },
});

let state = load();

function load() {
  // Fresh start on every refresh — nothing is remembered.
  return blankState();
}

function save() {
  // Persistence off. Delete this function's body's comment and
  // put the localStorage line back if you ever want it to remember.
}

function currentPerson() {
  return CONFIG.queue[state.turn % CONFIG.queue.length];
}

function addLog(text) {
  state.log.unshift({ at: Date.now(), text });
  state.log = state.log.slice(0, 120);
}

function render() {
  const names = CONFIG.queue;

  // Current turn
  $("#current-name").textContent = currentPerson() ?? "—";
  $("#current-sub").textContent = `${state.shots[currentPerson()] ?? 0} shots na. Wag mag-alangan.`;

  // Up next
  $("#queue-list").innerHTML = names
    .map((_, i) => names[(state.turn + 1 + i) % names.length])
    .slice(0, names.length - 1)
    .map(
      (name, i) => `<li class="flex items-center gap-4 border-b border-white/10 py-3">
          <span class="font-display text-xs text-accent">${String(i + 1).padStart(2, "0")}</span>
          <span class="${i === 0 ? "text-white" : "text-white/50"}">${name}</span>
          ${i === 0 ? '<span class="ml-auto text-[0.6rem] uppercase tracking-[0.25em] text-accent">Sunod</span>' : ""}
        </li>`,
    )
    .join("");

  // Scoreboard
  const total = Object.values(state.shots).reduce((a, b) => a + b, 0);
  $("#total-shots").textContent = total;
  $("#score-list").innerHTML = names
    .map((name) => {
      const count = state.shots[name] ?? 0;
      const glasses = count > 12 ? "🥃 ×" + count : "🥃".repeat(count);
      return `<li class="flex flex-wrap items-center gap-x-4 border-b border-white/10 py-3">
          <span class="w-24 shrink-0 font-display">${name}</span>
          <span class="flex-1 text-lg leading-none">${glasses || '<span class="text-xs text-white/25">Wala pa</span>'}</span>
          <span class="text-sm tabular-nums text-white/40">${count}</span>
        </li>`;
    })
    .join("");

  // Log
  $("#log-list").innerHTML = state.log.length
    ? state.log
        .map(
          (entry) => `<li class="border-b border-white/10 py-3">
            <p class="text-[0.6rem] uppercase tracking-[0.3em] text-accent/80">
              ${new Date(entry.at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
            </p>
            <p class="mt-1 text-sm text-white/70">${entry.text}</p>
          </li>`,
        )
        .join("")
    : '<li class="py-3 text-sm text-white/30">Wala pang nangyayari.</li>';

  save();
}

/* ---------- Queue buttons ---------- */
$("#btn-cheers").addEventListener("click", () => {
  const name = currentPerson();
  state.shots[name] = (state.shots[name] ?? 0) + 1;
  addLog(`Tagay ni ${name}. 🥃`);
  state.turn = (state.turn + 1) % CONFIG.queue.length;
  render();
  flashName();
});

$("#btn-skip").addEventListener("click", () => {
  addLog(`Pinalampas ni ${currentPerson()}.`);
  state.turn = (state.turn + 1) % CONFIG.queue.length;
  render();
});

$("#btn-prev").addEventListener("click", () => {
  state.turn = (state.turn - 1 + CONFIG.queue.length) % CONFIG.queue.length;
  addLog("Balik isang turn.");
  render();
});

$("#btn-reset").addEventListener("click", () => {
  state.turn = 0;
  state.shots = blankState().shots;
  addLog("Reset ang queue.");
  render();
});

$("#clear-log").addEventListener("click", () => {
  state.log = [];
  render();
});

function flashName() {
  const el = $("#current-name");
  el.classList.remove("animate-slam");
  void el.offsetWidth; // restart the animation
  el.classList.add("animate-slam");
}

/* ---------- Timer ---------- */
function elapsed() {
  const live = state.timer.running && state.timer.startedAt ? Date.now() - state.timer.startedAt : 0;
  return state.timer.banked + live;
}

function renderTimer() {
  const total = Math.floor(elapsed() / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  $("#timer-display").textContent =
    `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`;
  $("#timer-toggle").textContent = state.timer.running ? "Pause" : elapsed() > 0 ? "Resume" : "Start";
}

$("#timer-toggle").addEventListener("click", () => {
  if (state.timer.running) {
    state.timer.banked = elapsed();
    state.timer.running = false;
    state.timer.startedAt = null;
    addLog("Pause muna ang timer.");
  } else {
    state.timer.running = true;
    state.timer.startedAt = Date.now();
    addLog("Umandar ang timer.");
  }
  render();
  renderTimer();
});

$("#timer-reset").addEventListener("click", () => {
  state.timer = blankState().timer;
  addLog("Reset ang timer.");
  render();
  renderTimer();
});

setInterval(renderTimer, 500);
render();
renderTimer();

/* ==================================================================
   Scroll behaviour: reveal on scroll + active nav link
   ================================================================== */
function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  $$(".reveal").forEach((el) => observer.observe(el));
}

const sections = ["greetings", "gallery", "shotpuno", "message"];
window.addEventListener("scroll", () => {
  const y = window.scrollY + 140;
  let active = null;
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= y) active = id;
  });
  $$(".nav-link").forEach((link) =>
    link.classList.toggle("is-active", link.getAttribute("href") === `#${active}`),
  );
});
