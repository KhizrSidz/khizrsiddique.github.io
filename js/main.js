
// ── DATA ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1, title: "QuantCalc", year: "2026", type: "ML/AI",
    desc: "Quantum circuit simulator built in React/JS with IBM Qiskit hardware validation. Supports real quantum gate simulation — Hadamard, CNOT, Pauli gates — with step-through execution and Bloch sphere visualisation. Validated against IBM real hardware via Qiskit backend.",
    stack: ["React", "JavaScript", "IBM Qiskit", "Quantum Computing"],
    github: "https://github.com/KhizrSidz/quantcalc",
    live: "",
    images: ["assets/quantcalc/QuantCalc1.png", "assets/quantcalc/QuantCalc2.png", "assets/quantcalc/QuantCalc3.png"],
    video: null
  },
  {
    id: 2, title: "Quarry", year: "2025", type: "Open Source",
    desc: "AI-powered SQL PR review tool. Two-pass sqlfluff + LLM engine with GitHub App integration — born from a real gap in the Loblaw replenishment workflow. Automates SQL quality enforcement in CI/CD pipelines.",
    stack: ["Python", "Flask", "GitHub Apps", "LLM", "sqlfluff"],
    github: "https://github.com/KhizrSidz/quarry",
    live: "", images: [], video: null
  },
  {
    id: 3, title: "MOSFET Device Simulator", year: "2025", type: "Hardware / Simulation",
    desc: "First-principles MOSFET simulator built from MOS capacitor electrostatics and long-channel transistor theory. Computes threshold voltage analytically and derives ID–VGS and ID–VDS characteristics across doping, oxide thickness, geometry, and temperature. CLI-driven parametric sweeps with full plot output.",
    stack: ["Python", "NumPy", "Matplotlib", "Semiconductor Physics", "MOSFETs"],
    github: "https://github.com/KhizrSidz/mosfet-simulation",
    live: "", images: ["assets/mosfet/mosfet1.jpeg", "assets/mosfet/mosfet2.jpeg", "assets/mosfet/mosfet3.jpeg"], video: null
  },
  {
    id: 4, title: "MasjidOS", year: "2024", type: "Full-Stack",
    desc: "A single platform where mosque administrators can run their community, and where any member of the public can find their local masjid. Multi-mosque SaaS platform with multi-tenancy, Aladhan prayer times API, and a full admin portal. Built after analysing 47+ competitors in the mosque management space.",
    stack: ["React", "Vite", "Supabase", "PostgreSQL"],
    github: "https://github.com/KhizrSidz/masjidOS",
    live: "", images: ["assets/masjidOS/masjid1.png", "assets/masjidOS/masjid2.png", "assets/masjidOS/masjid3.png", "assets/masjidOS/masjid4.png", "assets/masjidOS/masjid5.png", "assets/masjidOS/masjid6.png", 
      "assets/masjidOS/masjid7.png", "assets/masjidOS/masjid8.png", "assets/masjidOS/masjid9.png", "assets/masjidOS/masjid10.png"], 
      video: null
  },
  {
    id: 5, title: "OpenCL Matrix Benchmark", year: "2026", type: "Hardware",
    desc: "OpenCL matrix multiplication benchmark achieving ~4.5x speedup on 512x512 matrices. Demonstrates GPU parallelism fundamentals with detailed CPU vs GPU performance profiling.",
    stack: ["OpenCL", "C++", "GPU Computing"],
    github: "https://github.com/KhizrSidz/GPU-CPU-Matrix-Multiplication",
    live: "", 
    images: ["assets/opencl/matrix1.png", "assets/opencl/matrix2.png", "assets/opencl/matrix3.png", "assets/opencl/matrix4.png"], video: null
  },
  {
    id: 6, title: "Quadcopter w/ Phone Holder", year: "2025", type: "CAD / Design",
    desc: "Quadcopter frame designed in SolidWorks with a custom-integrated phone holder mount. Fully modelled, 3D printed, and assembled. The phone holder was designed as a snap-fit component integrated directly into the frame geometry.",
    stack: ["SolidWorks", "3D Printing", "CAD", "Mechanical Design"],
    github: "", live: "",
    images: [],
    video: "assets/quadcopter/drone.mp4"
  },
  {
    id: 7, title: "18650 Battery Pack", year: "2026", type: "CAD / Design",
    desc: "Custom 18650 lithium cell battery pack designed in SolidWorks. Modelled cell holders, bus bar geometry, and enclosure with thermal clearance. Designed with BMS integration in mind.",
    stack: ["SolidWorks", "CAD", "Battery Design", "BMS"],
    github: "", live: "", 
    images: [], 
    video: "assets/battery/Battery1.mp4"
  },
  {
    id: 8, title: "4-Cylinder Piston Engine", year: "2024", type: "CAD / Design",
    desc: "Piston Engine designed and simulatedin SolidWorks Fully modelled, 3D printed, and assembled.",
    stack: ["SolidWorks", "3D Printing", "CAD", "Mechanical Design"],
    github: "", live: "",
    images: [],
    video: "assets/piston/piston.mp4"
  },
  {
    id: 9, title: "COMING SOON!", year: "", type: "",
    desc: "",
    stack: [""],
    github: "", live: "",
    images: [],
    video: ""
  }
];

// ── MODAL STATE ───────────────────────────────────────────────────────
let modalImgIdx = 0;
let activeProjectId = null;

// ── RENDER CARDS ──────────────────────────────────────────────────────
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  PROJECTS.forEach((p, i) => {
    const num    = String(i + 1).padStart(2, "0");
    const tags   = p.stack.map(t => `<span class="tag">${e(t)}</span>`).join("");
    const hasImg = p.images && p.images.length > 0;
    const hasVid = !!p.video;

    let mediaHTML = "";
    if (hasVid) {
      mediaHTML = `
        <div class="card-media">
          <video class="card-vid-thumb" muted playsinline preload="metadata">
            <source src="${e(p.video)}" type="video/mp4">
          </video>
          <div class="card-play">&#9654;</div>
        </div>`;
    } else if (hasImg) {
      mediaHTML = `
        <div class="card-media">
          <img class="card-img-thumb" src="${p.images[0]}" alt="${e(p.title)}">
        </div>`;
    }

    const shortDesc = p.desc.length > 110 ? p.desc.substring(0, 110) + "…" : p.desc;

    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("data-id", p.id);
    card.innerHTML = `
      ${mediaHTML}
      <div class="card-body">
        <div class="card-meta">${num} &nbsp;/&nbsp; ${e(p.year || "—")}</div>
        <div class="card-title">${e(p.title)}</div>
        <p class="card-desc">${e(shortDesc)}</p>
        <div class="card-tags">${tags}</div>
        <div class="card-footer">
          <span class="card-hint">Click to expand ↗</span>
          <span class="card-type">${e(p.type)}</span>
        </div>
      </div>`;

    card.addEventListener("click", () => openModal(p.id));
    grid.appendChild(card);
  });
}

// ── MODAL OPEN ────────────────────────────────────────────────────────
function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  activeProjectId = id;
  modalImgIdx = 0;

  // populate text
  document.getElementById("mTitle").textContent = p.title;
  document.getElementById("mType").textContent  = p.type;
  document.getElementById("mDesc").textContent  = p.desc;
  document.getElementById("mStack").innerHTML   = p.stack.map(t => `<span class="tag">${e(t)}</span>`).join("");

  // links
  let links = "";
  if (p.github) links += `<a href="${e(p.github)}" target="_blank" rel="noopener" class="mlink-primary">View on GitHub ↗</a>`;
  if (p.live)   links += `<a href="${e(p.live)}"   target="_blank" rel="noopener" class="mlink-ghost">Live Demo ↗</a>`;
  document.getElementById("mLinks").innerHTML = links;

  // media
  const mMedia = document.getElementById("mMedia");
  mMedia.innerHTML = "";

  if (p.video) {
    mMedia.innerHTML = `
      <video id="mVideo" controls autoplay muted loop playsinline
        style="width:100%;max-height:460px;object-fit:contain;display:block;background:#000">
        <source src="${e(p.video)}" type="video/mp4">
      </video>`;
  } else if (p.images && p.images.length > 0) {
    const imgs = p.images.map((src, ii) => `
      <img src="${src}" class="modal-img${ii === 0 ? " active" : ""}" alt="screenshot ${ii+1}">`
    ).join("");

    let nav = "";
    if (p.images.length > 1) {
      const dots = p.images.map((_, ii) =>
        `<button class="mdot${ii === 0 ? " active" : ""}" onclick="goToImg(${ii})"></button>`
      ).join("");
      nav = `
        <button class="marrow marrow-l" onclick="shiftImg(-1)">&#8592;</button>
        <button class="marrow marrow-r" onclick="shiftImg(1)">&#8594;</button>
        <div class="mdots">${dots}</div>`;
    }

    mMedia.innerHTML = `<div class="modal-img-wrap">${imgs}${nav}</div>`;
  }

  // show modal
  document.getElementById("modalBg").classList.add("open");
  document.body.style.overflow = "hidden";
}

// ── MODAL CLOSE ───────────────────────────────────────────────────────
function closeModal() {
  document.getElementById("modalBg").classList.remove("open");
  document.body.style.overflow = "";
  const vid = document.getElementById("mVideo");
  if (vid) { vid.pause(); vid.removeAttribute("src"); vid.load(); }
  activeProjectId = null;
}

document.addEventListener("keydown", ev => { if (ev.key === "Escape") closeModal(); });

// ── IMAGE NAV ─────────────────────────────────────────────────────────
function shiftImg(dir) {
  const p = PROJECTS.find(x => x.id === activeProjectId);
  if (!p || !p.images.length) return;
  const next = (modalImgIdx + dir + p.images.length) % p.images.length;
  goToImg(next);
}

function goToImg(idx) {
  const imgs = document.querySelectorAll("#mMedia .modal-img");
  const dots = document.querySelectorAll("#mMedia .mdot");
  if (!imgs.length) return;
  imgs[modalImgIdx].classList.remove("active");
  dots[modalImgIdx]?.classList.remove("active");
  imgs[idx].classList.add("active");
  dots[idx]?.classList.add("active");
  modalImgIdx = idx;
}

// ── PROFILE PHOTO ─────────────────────────────────────────────────────

// ── INTRO ─────────────────────────────────────────────────────────────
function enterSite() {
  const intro = document.getElementById("intro");
  const app   = document.getElementById("app");
  intro.classList.add("hide");
  setTimeout(() => { intro.style.display = "none"; app.classList.add("visible"); }, 1100);
}
setTimeout(enterSite, 3700);

// ── SCROLL REVEAL ─────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("in-view"); });
}, { threshold: 0.1 });

// ── UTILS ─────────────────────────────────────────────────────────────
function e(str) {
  return String(str)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ── BOOT ──────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  document.querySelectorAll("#about, #experience, #skills, #labs, #projects, #contact, .reveal")
    .forEach(el => revealObserver.observe(el));
});
