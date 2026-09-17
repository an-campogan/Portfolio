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

  const aboutButtons = document.querySelectorAll('.about-btn');
  const overlay = document.getElementById('project-overlay');
  const closeBtn = document.querySelector('.close-btn');

  const overlayImg = document.getElementById('overlay-img');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayDesc = document.getElementById('overlay-description');
  const overlayTagsContainer = document.getElementById('overlay-tags');

  aboutButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    overlayTitle.textContent = btn.dataset.title;
    overlayImg.src = btn.dataset.img;
    overlayDesc.textContent = btn.dataset.description;

    overlayTagsContainer.innerHTML = '';

    if (btn.dataset.stack) {
      const stackList = btn.dataset.stack.split(',');
      stackList.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech.trim();
        overlayTagsContainer.appendChild(tag);
      });
    }

    overlay.classList.remove('hidden');
  });
});

  closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));
  window.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.add('hidden');
});
