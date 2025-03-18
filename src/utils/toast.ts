
// Define the toast function on the window object
declare global {
  interface Window {
    showToast: (title: string, message: string, type?: string) => void;
  }
}

// Initialize the toast function if it doesn't exist
export const initToast = () => {
  if (typeof window !== 'undefined' && !window.showToast) {
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
    };
  }
};

export default initToast;
