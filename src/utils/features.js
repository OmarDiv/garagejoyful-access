
// Features section step animation
export const initializeFeatures = () => {
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
};
