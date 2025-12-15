import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded-sm transition-all duration-300 font-serif tracking-wider uppercase";
  
  const variants = {
    primary: "bg-gold-500 text-star-900 hover:bg-gold-400 shadow-[0_0_15px_rgba(234,179,8,0.3)] font-bold",
    outline: "border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-star-900",
    ghost: "text-gray-300 hover:text-gold-500"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
