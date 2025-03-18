
import React from 'react';

type PageBackgroundVariant = 'home' | 'dashboard' | 'garage' | 'about';

interface PageBackgroundProps {
  variant?: PageBackgroundVariant;
  children: React.ReactNode;
}

const PageBackground: React.FC<PageBackgroundProps> = ({ 
  variant = 'home',
  children 
}) => {
  // Different background styles for different pages
  const getBackgroundStyle = (variant: PageBackgroundVariant) => {
    switch(variant) {
      case 'dashboard':
        return 'bg-gradient-to-b from-blue-50 via-indigo-50 to-white';
      case 'garage':
        return 'bg-gradient-to-b from-emerald-50 via-teal-50 to-white';
      case 'about':
        return 'bg-gradient-to-b from-indigo-50 via-purple-50 to-white';
      case 'home':
      default:
        return 'bg-gradient-to-b from-indigo-50 via-purple-50 to-white';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${getBackgroundStyle(variant)} relative`}>
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id={`${variant}-pattern`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(5)">
            <circle cx="1" cy="1" r="1" fill="currentColor" className="text-indigo-400" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#${variant}-pattern)`} />
        </svg>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
