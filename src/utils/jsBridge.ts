
import { initToast } from './toast';
import { initializeMobileMenu, initializeNavbarScroll } from './navigation';
import { setCurrentYear, initializeIcons } from './utilities';

// Initialize all JavaScript functionality
export const initializeJavaScript = () => {
  // Initialize toast
  initToast();
  
  // Initialize icons
  initializeIcons();
  
  // Set current year in footer
  setCurrentYear();

  // Initialize other JS functionality as needed
  initializeMobileMenu();
  initializeNavbarScroll();
};

export default initializeJavaScript;
