// Animate numbers counting up on page load
export function setupAnimatedCounters() {
  const counters = [
    { selector: '#presentations-count', end: 20 },
    { selector: '#members-count', end: 25 }
  ];

  function animateCount(el, end) {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * end);
      el.textContent = value + '+';
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = end + '+';
      }
    }
    requestAnimationFrame(update);
  }

  counters.forEach(({ selector, end }) => {
    const el = document.querySelector(selector);
    if (el) {
      animateCount(el, end);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupAnimatedCounters();
});
