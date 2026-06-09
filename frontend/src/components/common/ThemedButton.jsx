import React from 'react';
import { motion } from 'framer-motion';

const ThemedButton = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  variant = 'primary', // primary (green), secondary (terracotta), outline
  disabled = false,
  ...props 
}) => {
  const baseStyle = "font-heading font-bold rounded-xl active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md inline-flex items-center justify-center";
  
  let variantStyle = "";
  if (variant === 'primary') {
    variantStyle = "bg-primary text-white hover:bg-primary-light shadow-primary/10";
  } else if (variant === 'secondary') {
    variantStyle = "bg-secondary text-white hover:bg-[#853424] shadow-secondary/10";
  } else {
    variantStyle = "border-2 border-primary/20 text-primary hover:bg-primary/5 bg-transparent";
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variantStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default ThemedButton;
