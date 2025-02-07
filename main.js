// Theme toggle functionality
const themeToggle = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
const logo = document.querySelector('.logo');

function setTheme(isDark) {
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );
  themeToggle.textContent = isDark ? "☀️" : "🌙";
}

// Set initial theme based on system preference
setTheme(prefersDarkScheme.matches);

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  setTheme(!isDark);
});

// Hamburger menu functionality
hamburger.addEventListener("click", () => {
  nav.classList.toggle("nav-open");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && nav.classList.contains("nav-open")) {
    nav.classList.remove("nav-open");
  }
});

// Navigation functionality
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section");

function showSection(sectionId) {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
  document.querySelector(sectionId).classList.add("active");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === sectionId) {
      link.classList.add("active");
    }
  });

  // Close mobile menu after navigation
  nav.classList.remove("nav-open");
}

// Add click handler for logo
logo.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('#home');
});

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("href");
    showSection(sectionId);
  });
});

// Add click handlers for mobile menu links
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("href");
    showSection(sectionId);
  });
});

// Slideshow functionality
function initializeSlideshow(slideshow) {
  const slides = slideshow.querySelector(".slides");
  const images = slides.querySelectorAll("img");
  const dotsContainer = slideshow.querySelector(".slide-dots");
  let currentSlide = 0;

  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    currentSlide = index;
    slides.style.transform = `translateX(-${index * 100}%)`;

    // Update dots
    dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    goToSlide(currentSlide);
  }

  // Auto-advance slides every 3 seconds
  setInterval(nextSlide, 3000);
}

// Initialize all slideshows
document.querySelectorAll(".slideshow").forEach(initializeSlideshow);

// Show home section by default
// showSection("#home");
showSection("#projects");
