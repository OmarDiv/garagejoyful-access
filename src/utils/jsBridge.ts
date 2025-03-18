
import { initToast } from './toast';
import { initializeMobileMenu, initializeNavbarScroll } from './navigation';
import { setCurrentYear } from './utilities';

// Initialize all JavaScript functionality
export const initializeJavaScript = () => {
  // Initialize toast
  initToast();
  
  // Set current year in footer
  setCurrentYear();

  // Initialize other JS functionality as needed
  initializeMobileMenu();
  initializeNavbarScroll();
};

// Add Lucide type
declare global {
  interface Window {
    lucide?: {
      createIcons: (options?: any) => void;
    };
  }
}

export default initializeJavaScript;
