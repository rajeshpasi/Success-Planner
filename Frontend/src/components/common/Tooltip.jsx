import React, { useState } from 'react';

const Tooltip = ({ children, message, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return '-top-10 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return '-bottom-10 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'top-1/2 -left-2 transform -translate-y-1/2 -translate-x-full';
      case 'right':
        return 'top-1/2 -right-2 transform -translate-y-1/2 translate-x-full';
      default:
        return '-top-10 left-1/2 transform -translate-x-1/2';
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg animate-fade-in ${getPositionClasses()}`}>
          {message}
          <div className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
            'right-full top-1/2 -translate-y-1/2 -mr-1'
          }`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;