
/**
 * Utility functions for the application
 */

// Set current year in footer
export const setCurrentYear = (): void => {
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear().toString();
  }
};

// Initialize Lucide icons
export const initializeIcons = (): void => {
  if (typeof window !== 'undefined' && window.lucide && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
};

// Add Lucide type definition
declare global {
  interface Window {
    lucide?: {
      createIcons: (options?: any) => void;
    };
  }
}
