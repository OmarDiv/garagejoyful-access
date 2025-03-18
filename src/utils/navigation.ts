
// Mobile menu functionality
export const initializeMobileMenu = () => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const menuIcon = menuToggle.querySelector('i');
      
      if (mobileMenu.classList.contains('max-h-0')) {
        // Open menu
        mobileMenu.classList.remove('max-h-0');
        mobileMenu.classList.add('max-h-96');
        if (menuIcon) menuIcon.setAttribute('data-lucide', 'x');
      } else {
        // Close menu
        mobileMenu.classList.remove('max-h-96');
        mobileMenu.classList.add('max-h-0');
        if (menuIcon) menuIcon.setAttribute('data-lucide', 'menu');
      }
      
      // Recreate the icon if lucide is available
      if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
        window.lucide.createIcons();
      }
    });
  }
};

// Navbar scroll effect
export const initializeNavbarScroll = () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm');
      } else {
        navbar.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
  }
};
