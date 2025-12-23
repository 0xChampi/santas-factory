'use client';

export function GiftIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={{ imageRendering: 'pixelated' }}>
      {/* Box body */}
      <rect x="8" y="28" width="48" height="32" fill="#E74C3C" stroke="#922B21" strokeWidth="2"/>
      {/* Box lid */}
      <rect x="4" y="20" width="56" height="12" fill="#C0392B" stroke="#922B21" strokeWidth="2"/>
      {/* Vertical ribbon */}
      <rect x="28" y="20" width="8" height="40" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="1"/>
      {/* Horizontal ribbon */}
      <rect x="8" y="36" width="48" height="8" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="1"/>
      {/* Bow */}
      <ellipse cx="24" cy="16" rx="8" ry="6" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="1"/>
      <ellipse cx="40" cy="16" rx="8" ry="6" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="1"/>
      <circle cx="32" cy="18" r="4" fill="#D4AC0D"/>
    </svg>
  );
}

export function SnowflakeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <g fill="none" stroke="#5DADE2" strokeWidth="3" strokeLinecap="round">
        {/* Main cross */}
        <line x1="32" y1="4" x2="32" y2="60"/>
        <line x1="4" y1="32" x2="60" y2="32"/>
        {/* Diagonals */}
        <line x1="12" y1="12" x2="52" y2="52"/>
        <line x1="52" y1="12" x2="12" y2="52"/>
        {/* Branches */}
        <line x1="32" y1="12" x2="24" y2="4"/>
        <line x1="32" y1="12" x2="40" y2="4"/>
        <line x1="32" y1="52" x2="24" y2="60"/>
        <line x1="32" y1="52" x2="40" y2="60"/>
        <line x1="12" y1="32" x2="4" y2="24"/>
        <line x1="12" y1="32" x2="4" y2="40"/>
        <line x1="52" y1="32" x2="60" y2="24"/>
        <line x1="52" y1="32" x2="60" y2="40"/>
      </g>
      <circle cx="32" cy="32" r="4" fill="#AED6F1"/>
    </svg>
  );
}

export function HeartIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path 
        d="M32 56 C16 44 4 32 4 20 C4 10 12 4 22 4 C28 4 32 8 32 8 C32 8 36 4 42 4 C52 4 60 10 60 20 C60 32 48 44 32 56Z"
        fill="#E74C3C"
        stroke="#922B21"
        strokeWidth="2"
      />
      <ellipse cx="20" cy="18" rx="6" ry="4" fill="#FF6B6B" opacity="0.5"/>
    </svg>
  );
}

export function CoinsIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      {/* Back coins */}
      <ellipse cx="44" cy="20" rx="14" ry="8" fill="#D4AC0D" stroke="#B7950B" strokeWidth="2"/>
      <rect x="30" y="20" width="28" height="12" fill="#D4AC0D"/>
      <ellipse cx="44" cy="32" rx="14" ry="8" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="2"/>
      
      {/* Middle coins */}
      <ellipse cx="32" cy="28" rx="14" ry="8" fill="#D4AC0D" stroke="#B7950B" strokeWidth="2"/>
      <rect x="18" y="28" width="28" height="12" fill="#D4AC0D"/>
      <ellipse cx="32" cy="40" rx="14" ry="8" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="2"/>
      
      {/* Front coins */}
      <ellipse cx="20" cy="36" rx="14" ry="8" fill="#D4AC0D" stroke="#B7950B" strokeWidth="2"/>
      <rect x="6" y="36" width="28" height="14" fill="#D4AC0D"/>
      <ellipse cx="20" cy="50" rx="14" ry="8" fill="#F1C40F" stroke="#D4AC0D" strokeWidth="2"/>
      
      {/* Dollar signs */}
      <text x="20" y="54" textAnchor="middle" fill="#B7950B" fontSize="10" fontWeight="bold">$</text>
      <text x="32" y="44" textAnchor="middle" fill="#B7950B" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}

export function StockingIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 64" className={className}>
      {/* Stocking body */}
      <path 
        d="M12 16 L12 36 Q12 44 8 52 Q4 60 12 60 L28 60 Q36 60 36 52 L36 36 L36 16 Z"
        fill="#E74C3C"
        stroke="#922B21"
        strokeWidth="2"
      />
      {/* White trim */}
      <rect x="8" y="12" width="32" height="12" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1" rx="2"/>
      {/* Stripes */}
      <rect x="12" y="28" width="24" height="4" fill="#27AE60"/>
      <rect x="12" y="40" width="20" height="4" fill="#27AE60"/>
    </svg>
  );
}
