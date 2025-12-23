'use client';

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export default function ActionButton({ 
  children, 
  variant = 'primary', 
  onClick,
  className = ''
}: ActionButtonProps) {
  const baseStyles = "px-8 py-3 rounded-xl font-display font-semibold text-lg transition-all duration-100 cursor-pointer";
  
  const variants = {
    primary: `
      bg-[#C0392B] text-white
      border-4 border-[#922B21]
      shadow-[inset_0_-4px_0_#922B21,0_4px_0_#1A252F]
      hover:translate-y-[2px] hover:shadow-[inset_0_-2px_0_#922B21,0_2px_0_#1A252F]
      active:translate-y-[4px] active:shadow-[inset_0_0_0_#922B21,0_0_0_#1A252F]
    `,
    secondary: `
      bg-[#27AE60] text-white
      border-4 border-[#1E8449]
      shadow-[inset_0_-4px_0_#1E8449,0_4px_0_#1A252F]
      hover:translate-y-[2px] hover:shadow-[inset_0_-2px_0_#1E8449,0_2px_0_#1A252F]
      active:translate-y-[4px] active:shadow-[inset_0_0_0_#1E8449,0_0_0_#1A252F]
    `
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
