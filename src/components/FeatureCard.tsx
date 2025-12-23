'use client';

import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  icon: ReactNode;
  buttonText: string;
  onClick?: () => void;
}

export default function FeatureCard({ title, icon, buttonText, onClick }: FeatureCardProps) {
  return (
    <div className="pixel-card p-4 flex flex-col items-center gap-3 w-36 md:w-44 hover:scale-105 transition-transform cursor-pointer">
      {/* Title */}
      <h3 
        className="font-display font-semibold text-sm md:text-base text-[#C0392B] text-center"
        style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}
      >
        {title}
      </h3>
      
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      
      {/* Button */}
      <button 
        onClick={onClick}
        className="bg-white border-2 border-[#2C3E50] rounded-lg px-3 py-1 text-xs font-display text-[#2C3E50] hover:bg-gray-100 transition-colors shadow-sm"
      >
        {buttonText}
      </button>
    </div>
  );
}
