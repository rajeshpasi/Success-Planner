import React from 'react';

const ToggleSwitch = ({ checked, onChange, disabled = false }) => {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        checked 
          ? 'bg-indigo-600' 
          : 'bg-gray-200'
      } ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;