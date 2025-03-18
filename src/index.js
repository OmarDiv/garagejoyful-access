
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();

  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const menuIcon = menuToggle.querySelector('i');
      
      if (mobileMenu.classList.contains('max-h-0')) {
        // Open menu
        mobileMenu.classList.remove('max-h-0');
        mobileMenu.classList.add('max-h-96');
        menuIcon.setAttribute('data-lucide', 'x');
      } else {
        // Close menu
        mobileMenu.classList.remove('max-h-96');
        mobileMenu.classList.add('max-h-0');
        menuIcon.setAttribute('data-lucide', 'menu');
      }
      
      // Recreate the icon
      lucide.createIcons();
    });
  }

  // Scroll effect for navbar
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        navbar.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-sm');
      } else {
        navbar.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-sm');
      }
    });
    // Trigger once on load
    window.dispatchEvent(new Event('scroll'));
  }

  // Features section step animation
  const steps = document.querySelectorAll('[data-step]');
  const stepContent = document.getElementById('stepContent');

  if (steps.length > 0 && stepContent) {
    const stepContents = [
      {
        emoji: '🔍',
        text: 'Our real-time system shows available parking spots instantly.'
      },
      {
        emoji: '📅',
        text: 'Reserve your preferred spot with our easy-to-use interface.'
      },
      {
        emoji: '🔐',
        text: 'Verify your identity for secure and authorized access.'
      },
      {
        emoji: '🚗',
        text: 'Enter your license plate number for quick identification.'
      },
      {
        emoji: '✅',
        text: 'Enjoy the convenience of guaranteed parking without hassle.'
      }
    ];

    steps.forEach(step => {
      step.addEventListener('click', function() {
        // Update active state
        steps.forEach(s => {
          s.classList.add('opacity-70');
          const numSpan = s.querySelector('span:first-child');
          if (numSpan) {
            numSpan.classList.remove('bg-guardian-blue', 'text-white');
            numSpan.classList.add('bg-guardian-blue/10', 'text-guardian-blue');
          }
        });

        this.classList.remove('opacity-70');
        this.classList.add('opacity-100');
        const numSpan = this.querySelector('span:first-child');
        if (numSpan) {
          numSpan.classList.remove('bg-guardian-blue/10', 'text-guardian-blue');
          numSpan.classList.add('bg-guardian-blue', 'text-white');
        }

        // Update content
        const stepIndex = parseInt(this.getAttribute('data-step'));
        const content = stepContents[stepIndex];
        
        // Animate content change
        stepContent.style.opacity = '0';
        setTimeout(() => {
          stepContent.innerHTML = `
            <div class="mb-3 text-4xl">${content.emoji}</div>
            <p class="text-sm text-guardian-gray">${content.text}</p>
          `;
          stepContent.style.opacity = '1';
        }, 300);
      });
    });
  }

  // Testimonials carousel
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Regular User",
      quote: "Rakna has made parking so much easier. I can reserve my spot in advance and never worry about finding a place to park.",
      rating: 5,
      initial: "A"
    },
    {
      name: "Sarah Williams",
      role: "Property Manager",
      quote: "Managing our building's garage has never been easier. The real-time dashboard gives me complete visibility into parking usage.",
      rating: 5,
      initial: "S"
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      quote: "The security features are excellent. I feel confident that only authorized users can access our company's garage.",
      rating: 4,
      initial: "M"
    }
  ];

  let currentTestimonial = 0;
  let autoplayInterval;

  const testimonialText = document.getElementById('testimonialText');
  const testimonialName = document.getElementById('testimonialName');
  const testimonialRole = document.getElementById('testimonialRole');
  const testimonialInitial = document.getElementById('testimonialInitial');
  const testimonialRating = document.getElementById('testimonialRating');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevButton = document.getElementById('prevTestimonial');
  const nextButton = document.getElementById('nextTestimonial');

  function updateTestimonial(index) {
    if (!testimonialText || !testimonialName || !testimonialRole || !testimonialInitial || !testimonialRating) return;
    
    const testimonial = testimonials[index];
    
    // Update testimonial content with animation
    const container = document.getElementById('testimonialContainer');
    container.style.opacity = '0';
    container.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
      testimonialText.textContent = testimonial.quote;
      testimonialName.textContent = testimonial.name;
      testimonialRole.textContent = testimonial.role;
      testimonialInitial.textContent = testimonial.initial;
      
      // Update rating stars
      testimonialRating.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const starIcon = document.createElement('i');
        starIcon.setAttribute('data-lucide', 'star');
        starIcon.className = `h-4 w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`;
        testimonialRating.appendChild(starIcon);
      }
      
      // Update active dot
      testimonialDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.remove('w-2', 'bg-indigo-200');
          dot.classList.add('w-8', 'bg-indigo-600');
        } else {
          dot.classList.remove('w-8', 'bg-indigo-600');
          dot.classList.add('w-2', 'bg-indigo-200');
        }
      });
      
      // Re-initialize Lucide icons
      lucide.createIcons({
        icons: 'star',
        classSelector: testimonialRating
      });
      
      container.style.opacity = '1';
      container.style.transform = 'translateX(0)';
    }, 300);
    
    currentTestimonial = index;
  }

  function nextTestimonial() {
    updateTestimonial((currentTestimonial + 1) % testimonials.length);
  }

  function prevTestimonial() {
    updateTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextTestimonial, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Initialize testimonials if elements exist
  if (testimonialText && testimonialName && testimonialRole && testimonialInitial && testimonialRating) {
    // Set up navigation
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        prevTestimonial();
        stopAutoplay();
        setTimeout(startAutoplay, 10000);
      });
      
      prevButton.addEventListener('mouseenter', stopAutoplay);
      prevButton.addEventListener('mouseleave', startAutoplay);
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        nextTestimonial();
        stopAutoplay();
        setTimeout(startAutoplay, 10000);
      });
      
      nextButton.addEventListener('mouseenter', stopAutoplay);
      nextButton.addEventListener('mouseleave', startAutoplay);
    }
    
    // Set up dot navigation
    testimonialDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        updateTestimonial(index);
        stopAutoplay();
        setTimeout(startAutoplay, 10000);
      });
      
      dot.addEventListener('mouseenter', stopAutoplay);
      dot.addEventListener('mouseleave', startAutoplay);
    });
    
    // Start autoplay
    startAutoplay();
  }

  // Add fade-in animation to hero section
  const hero = document.getElementById('hero');
  if (hero) {
    setTimeout(() => {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
      hero.style.transition = 'opacity 0.5s, transform 0.5s';
    }, 100);
  }

  // Toast notification system
  window.showToast = function(title, message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set toast color based on type
    let bgColor, borderColor, titleColor;
    switch (type) {
      case 'success':
        bgColor = 'bg-guardian-green/10';
        borderColor = 'border-l-4 border-guardian-green';
        titleColor = 'text-guardian-green';
        break;
      case 'error':
        bgColor = 'bg-guardian-red/10';
        borderColor = 'border-l-4 border-guardian-red';
        titleColor = 'text-guardian-red';
        break;
      case 'warning':
        bgColor = 'bg-guardian-yellow/10';
        borderColor = 'border-l-4 border-guardian-yellow';
        titleColor = 'text-guardian-yellow';
        break;
      default:
        bgColor = 'bg-guardian-blue/10';
        borderColor = 'border-l-4 border-guardian-blue';
        titleColor = 'text-guardian-blue';
    }
    
    toast.classList.add(bgColor, borderColor);
    
    toast.innerHTML = `
      <div class="toast-header">
        <span class="font-medium ${titleColor}">${title}</span>
        <button class="toast-close">&times;</button>
      </div>
      <div class="toast-body text-guardian-darkGray text-sm">
        ${message}
      </div>
    `;
    
    // Add toast to the document
    document.body.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Close toast on click
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
          toast.remove();
        }, 300);
      });
    }
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  }
});
