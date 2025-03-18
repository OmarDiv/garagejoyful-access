
// Animation utilities
export const initializeAnimations = () => {
  // Add fade-in animation to hero section
  const hero = document.getElementById('hero');
  if (hero) {
    setTimeout(() => {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
      hero.style.transition = 'opacity 0.5s, transform 0.5s';
    }, 100);
  }
};
