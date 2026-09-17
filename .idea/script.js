function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {

        navLinks.forEach((link) => { link.classList.remove("active"); });

        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);

        if (activeLink) { activeLink.classList.add("active");}
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => { observer.observe(section); });

const menuBtn = document.querySelector(".menu-btn");

if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}
