
// Set current year in footer
export const setCurrentYear = () => {
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear().toString();
  }
};

// Initialize Lucide icons
export const initializeIcons = () => {
  if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
};
