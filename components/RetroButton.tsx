import React from 'react';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

const RetroButton: React.FC<RetroButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  loading = false,
  ...props 
}) => {
  let baseColors = "";
  let shadowColor = "";

  switch (variant) {
    case 'primary':
      baseColors = "bg-green-500 text-black hover:bg-green-400 active:translate-y-1";
      shadowColor = "shadow-[4px_4px_0px_0px_rgba(0,100,0,1)]";
      break;
    case 'secondary':
      baseColors = "bg-yellow-400 text-black hover:bg-yellow-300 active:translate-y-1";
      shadowColor = "shadow-[4px_4px_0px_0px_rgba(180,100,0,1)]";
      break;
    case 'danger':
      baseColors = "bg-red-500 text-white hover:bg-red-400 active:translate-y-1";
      shadowColor = "shadow-[4px_4px_0px_0px_rgba(139,0,0,1)]";
      break;
  }

  return (
    <button
      className={`
        relative px-6 py-3 font-bold text-lg uppercase tracking-widest
        border-2 border-black
        transition-all duration-75
        disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0
        ${baseColors}
        ${shadowColor}
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'LOADING...' : children}
    </button>
  );
};

export default RetroButton;