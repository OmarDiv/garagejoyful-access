
import { initializeMobileMenu, initializeNavbarScroll } from './utils/navigation.js';
import { initializeFeatures } from './utils/features.js';
import { initializeTestimonials } from './utils/testimonials.js';
import { initializeAnimations } from './utils/animations.js';
import { initializeToasts } from './utils/toast.js';
import { setCurrentYear, initializeIcons } from './utils/utilities.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize core utilities
  initializeIcons();
  setCurrentYear();
  
  // Initialize navigation components
  initializeMobileMenu();
  initializeNavbarScroll();
  
  // Initialize page-specific components
  initializeFeatures();
  initializeTestimonials();
  initializeAnimations();
  
  // Initialize toast system
  initializeToasts();
});
