/* ---------- Hamburger menu ---------- */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#site-nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelectorAll(`#site-nav a[href="#${entry.target.id}"]`)
          .forEach((link) => link.classList.add("active"));
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));

/* ---------- Project About overlay ---------- */
const aboutButtons = document.querySelectorAll(".about-btn");
const overlay = document.getElementById("project-overlay");
const closeBtn = document.querySelector(".close-btn");

const overlayImg = document.getElementById("overlay-img");
const overlayTitle = document.getElementById("overlay-title");
const overlayDesc = document.getElementById("overlay-description");
const overlayTagsContainer = document.getElementById("overlay-tags");

aboutButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    overlayTitle.textContent = btn.dataset.title;
    overlayImg.src = btn.dataset.img;
    overlayDesc.textContent = btn.dataset.description;

    overlayTagsContainer.innerHTML = "";

    if (btn.dataset.stack) {
      btn.dataset.stack.split(",").forEach((tech) => {
        const tag = document.createElement("span");
        tag.className = "tech-tag";
        tag.textContent = tech.trim();
        overlayTagsContainer.appendChild(tag);
      });
    }

    overlay.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => overlay.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.add("hidden");
});

/* ---------- Project filter (All / Software / Hardware) ---------- */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll("#myprojects .details-container");
const noProjects = document.getElementById("no-projects");
const projectScroller = document.querySelector("#myprojects .about-containers");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    let shown = 0;

    projectCards.forEach((card) => {
      const match =
        filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.style.display = match ? "" : "none";
      if (match) shown++;
    });

    noProjects.hidden = shown > 0;
    projectScroller.scrollLeft = 0;
  });
});

/* ---------- Contact form (Formspree) ---------- */
const form = document.querySelector(".contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector(".submit-btn");
  btn.disabled = true;
  statusText.textContent = "Sending...";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      statusText.textContent = "Thanks! Your message was sent.";
      form.reset();
    } else {
      statusText.textContent = "Something went wrong. Please try again.";
    }
  } catch {
    statusText.textContent = "Network error. Please try again.";
  }

  btn.disabled = false;
});

/* ---------- Night mode toggle ---------- */
const themeToggles = document.querySelectorAll(".theme-toggle");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggles.forEach((btn) => {
    btn.querySelector("i").className = isDark ? "ri-moon-line" : "ri-sun-line";
    btn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  });
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch {}
applyTheme(savedTheme === "dark");

themeToggles.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    applyTheme(isDark);
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
  });
});
