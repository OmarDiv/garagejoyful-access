
import { ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
  variant: 'home' | 'dashboard' | 'garage';
}

const PageBackground = ({ children, variant }: PageBackgroundProps) => {
  let backgroundClasses = '';
  
  // Different background styling based on page variant
  switch (variant) {
    case 'home':
      backgroundClasses = 'bg-gradient-to-b from-purple-100 via-fuchsia-50 to-white';
      break;
    case 'dashboard':
      backgroundClasses = 'bg-gradient-to-br from-purple-50 via-fuchsia-50/30 to-white';
      break;
    case 'garage':
      backgroundClasses = 'bg-gradient-to-tr from-fuchsia-50 via-purple-50/20 to-white';
      break;
    default:
      backgroundClasses = 'bg-white';
  }

  return (
    <div className={`min-h-screen relative ${backgroundClasses}`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg 
          className="h-full w-full opacity-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {variant === 'home' && (
            <pattern 
              id="home-pattern" 
              width="10" 
              height="10" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(5)"
            >
              <circle cx="1" cy="1" r="1" fill="currentColor" className="text-purple-400" />
            </pattern>
          )}
          {variant === 'dashboard' && (
            <pattern 
              id="dashboard-pattern" 
              width="12" 
              height="12" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(15)"
            >
              <path d="M2 2 L4 4" strokeWidth="0.5" stroke="currentColor" className="text-fuchsia-400" />
            </pattern>
          )}
          {variant === 'garage' && (
            <pattern 
              id="garage-pattern" 
              width="14" 
              height="14" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(10)"
            >
              <rect width="1" height="1" fill="currentColor" className="text-purple-400" />
            </pattern>
          )}
          <rect width="100%" height="100%" fill={`url(#${variant}-pattern)`} />
        </svg>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
