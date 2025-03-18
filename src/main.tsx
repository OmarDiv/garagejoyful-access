
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import initializeJavaScript from './utils/jsBridge';

// Initialize the React app
createRoot(document.getElementById("root")!).render(<App />);

// Initialize JavaScript functionality once the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons if available
  if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
    window.lucide.createIcons();
  }
  
  // Initialize other JavaScript functionality
  initializeJavaScript();
});
