const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll("nav a");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 40),
  { passive: true },
);

menuButton.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.13, rootMargin: "0px 0px -40px" },
);

document.querySelectorAll(".reveal, .split-reveal").forEach((item) => {
  revealObserver.observe(item);
});

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const suffix = element.dataset.suffix || "";
      const duration = reducedMotion ? 0 : 1400;
      const startTime = performance.now();

      const update = (now) => {
        const progress = duration === 0 ? 1 : Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        element.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
      countObserver.unobserve(element);
    });
  },
  { threshold: 0.7 },
);

document.querySelectorAll("[data-count]").forEach((item) => countObserver.observe(item));

if (window.matchMedia("(pointer: fine)").matches) {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
  });

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX - 19}px, ${ringY - 19}px)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll("a, button, .skill-card, .education-item").forEach((item) => {
    item.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
    item.addEventListener("mouseleave", () => ring.classList.remove("is-hovering"));
  });

  document.querySelectorAll(".magnetic").forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const bounds = item.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      item.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
    });
  });
}

const canvas = document.querySelector("#particle-canvas");
const context = canvas.getContext("2d");
let particles = [];
let animationFrame;

const resizeCanvas = () => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const bounds = canvas.getBoundingClientRect();
  canvas.width = bounds.width * dpr;
  canvas.height = bounds.height * dpr;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.min(55, Math.floor(bounds.width / 24));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * bounds.width,
    y: Math.random() * bounds.height,
    size: Math.random() * 1.3 + 0.3,
    speedX: (Math.random() - 0.5) * 0.15,
    speedY: (Math.random() - 0.5) * 0.15,
    alpha: Math.random() * 0.45 + 0.08,
  }));
};

const drawParticles = () => {
  const bounds = canvas.getBoundingClientRect();
  context.clearRect(0, 0, bounds.width, bounds.height);

  particles.forEach((particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    if (particle.x < 0) particle.x = bounds.width;
    if (particle.x > bounds.width) particle.x = 0;
    if (particle.y < 0) particle.y = bounds.height;
    if (particle.y > bounds.height) particle.y = 0;

    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
    context.fill();
  });

  animationFrame = requestAnimationFrame(drawParticles);
};

resizeCanvas();
if (!reducedMotion) drawParticles();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("visibilitychange", () => {
  if (reducedMotion) return;
  if (document.hidden) {
    cancelAnimationFrame(animationFrame);
  } else {
    drawParticles();
  }
});
