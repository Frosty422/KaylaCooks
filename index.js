// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth staggered fade-in observer
function createFadeObserver(elements, baseDelay = 0.1, staggerDelay = 0.1) {
  elements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.8s ease ${
      baseDelay + index * staggerDelay
    }s, transform 0.8s ease ${baseDelay + index * staggerDelay}s`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        } else {
          entry.target.style.opacity = 0;
          entry.target.style.transform = "translateY(30px)";
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((el) => observer.observe(el));
}

// Fade-in sections
const allSections = document.querySelectorAll(".hero, .feature, .contact");
createFadeObserver(allSections, 0, 0.15);

// Fade-in lazy-loaded images
const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
createFadeObserver(lazyImgs, 0, 0.1);

// Reveal button functionality
const buttons = document.querySelectorAll(".reveal-btn");

buttons.forEach((btn) => {
  const type = btn.dataset.type;
  const el = document.getElementById(type);

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";

    // Hide all other revealed elements
    document.querySelectorAll(".revealed").forEach((r) => {
      if (r !== el) {
        r.style.display = "none";
        r.setAttribute("aria-hidden", "true");
      }
    });

    // Reset all buttons
    document
      .querySelectorAll(".reveal-btn")
      .forEach((b) => b.setAttribute("aria-expanded", "false"));

    // Toggle current element
    if (!expanded) {
      el.style.display = "block";
      el.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
    } else {
      el.style.display = "none";
      el.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Keyboard accessibility
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      btn.click();
    }
  });
});
