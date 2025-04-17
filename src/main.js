// Main entry point for Vite
import './styles.css';

// Set up counter animation for join-us page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('presentations-count') && 
      document.getElementById('members-count')) {
    setupAnimatedCounters();
  }
});

function setupAnimatedCounters() {
  const counters = document.querySelectorAll('#presentations-count, #members-count');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    let count = 0;
    
    const updateCounter = () => {
      if (count < target) {
        count++;
        counter.textContent = count + '+';
        setTimeout(updateCounter, 100);
      }
    };
    
    // Start with 0
    counter.textContent = '0+';
    setTimeout(updateCounter, 500);
  });
}
