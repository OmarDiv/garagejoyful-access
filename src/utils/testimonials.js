
// Testimonials carousel
export const initializeTestimonials = () => {
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
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons({
          icons: 'star',
          classSelector: testimonialRating
        });
      }
      
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
};
