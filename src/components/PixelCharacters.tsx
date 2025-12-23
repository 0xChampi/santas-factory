'use client';

import Image from 'next/image';

// Image-based character components using the pixel art assets
export function SantaWithGift({ className = '', size = 120 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/santa-gift.png"
      alt="Santa with gift"
      width={size}
      height={size}
      className={`${className} object-contain`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}

export function CharacterGroup({ className = '', size = 200 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/characters.png"
      alt="Christmas characters"
      width={size}
      height={size * 0.6}
      className={`${className} object-contain`}
      style={{ imageRendering: 'pixelated' }}
    />
  );
}

export function PixelSanta({ className = '', size = 80 }: { className?: string; size?: number }) {
  return (
    <svg 
      viewBox="0 0 32 40" 
      width={size} 
      height={size * 1.25} 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Hat */}
      <rect x="8" y="0" width="16" height="4" fill="#C0392B"/>
      <rect x="6" y="4" width="20" height="4" fill="#C0392B"/>
      <rect x="22" y="0" width="6" height="4" fill="#FFFFFF"/>
      <circle cx="26" cy="2" r="3" fill="#FFFFFF"/>
      {/* Hat trim */}
      <rect x="4" y="8" width="24" height="4" fill="#FFFFFF"/>
      {/* Face */}
      <rect x="8" y="12" width="16" height="12" fill="#FDBF6F"/>
      {/* Eyes */}
      <rect x="10" y="16" width="3" height="3" fill="#2C3E50"/>
      <rect x="19" y="16" width="3" height="3" fill="#2C3E50"/>
      {/* Nose */}
      <rect x="14" y="18" width="4" height="3" fill="#E67E22"/>
      {/* Beard */}
      <rect x="6" y="22" width="20" height="8" fill="#FFFFFF"/>
      <rect x="8" y="30" width="16" height="4" fill="#FFFFFF"/>
      <rect x="10" y="34" width="12" height="2" fill="#FFFFFF"/>
      {/* Body */}
      <rect x="8" y="36" width="16" height="4" fill="#C0392B"/>
    </svg>
  );
}

export function PixelMrsClaus({ className = '', size = 80 }: { className?: string; size?: number }) {
  return (
    <svg 
      viewBox="0 0 32 44" 
      width={size} 
      height={size * 1.375} 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Hair bow */}
      <rect x="12" y="0" width="8" height="4" fill="#C0392B"/>
      {/* Hair */}
      <rect x="6" y="4" width="20" height="8" fill="#F5B041"/>
      <rect x="4" y="8" width="4" height="8" fill="#F5B041"/>
      <rect x="24" y="8" width="4" height="8" fill="#F5B041"/>
      {/* Face */}
      <rect x="8" y="10" width="16" height="12" fill="#FDBF6F"/>
      {/* Eyes */}
      <rect x="10" y="14" width="3" height="3" fill="#2C3E50"/>
      <rect x="19" y="14" width="3" height="3" fill="#2C3E50"/>
      {/* Cheeks */}
      <rect x="8" y="18" width="3" height="2" fill="#F1948A"/>
      <rect x="21" y="18" width="3" height="2" fill="#F1948A"/>
      {/* Smile */}
      <rect x="13" y="19" width="6" height="2" fill="#C0392B"/>
      {/* Dress */}
      <rect x="6" y="22" width="20" height="4" fill="#FADBD8"/>
      <rect x="4" y="26" width="24" height="12" fill="#FADBD8"/>
      {/* Apron */}
      <rect x="10" y="26" width="12" height="12" fill="#FFFFFF"/>
      {/* Feet */}
      <rect x="8" y="38" width="6" height="4" fill="#2C3E50"/>
      <rect x="18" y="38" width="6" height="4" fill="#2C3E50"/>
    </svg>
  );
}

export function PixelElf({ className = '', size = 60, variant = 'green' }: { className?: string; size?: number; variant?: 'green' | 'red' }) {
  const colors = {
    green: { primary: '#27AE60', secondary: '#1E8449' },
    red: { primary: '#C0392B', secondary: '#922B21' }
  };
  const c = colors[variant];
  
  return (
    <svg 
      viewBox="0 0 24 32" 
      width={size} 
      height={size * 1.33} 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Hat */}
      <polygon points="12,0 4,12 20,12" fill={c.primary}/>
      <circle cx="12" cy="2" r="2" fill="#F1C40F"/>
      {/* Face */}
      <rect x="6" y="10" width="12" height="10" fill="#FDBF6F"/>
      {/* Ears */}
      <polygon points="4,14 6,12 6,16" fill="#FDBF6F"/>
      <polygon points="20,14 18,12 18,16" fill="#FDBF6F"/>
      {/* Eyes */}
      <rect x="8" y="14" width="2" height="2" fill="#2C3E50"/>
      <rect x="14" y="14" width="2" height="2" fill="#2C3E50"/>
      {/* Cheeks */}
      <rect x="7" y="17" width="2" height="1" fill="#F1948A"/>
      <rect x="15" y="17" width="2" height="1" fill="#F1948A"/>
      {/* Body */}
      <rect x="6" y="20" width="12" height="8" fill={c.primary}/>
      {/* Belt */}
      <rect x="6" y="24" width="12" height="2" fill="#2C3E50"/>
      <rect x="10" y="23" width="4" height="4" fill="#F1C40F"/>
      {/* Feet */}
      <rect x="6" y="28" width="4" height="4" fill={c.secondary}/>
      <rect x="14" y="28" width="4" height="4" fill={c.secondary}/>
    </svg>
  );
}

export function PixelReindeer({ className = '', size = 70 }: { className?: string; size?: number }) {
  return (
    <svg 
      viewBox="0 0 40 36" 
      width={size} 
      height={size * 0.9} 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Antlers */}
      <rect x="6" y="0" width="2" height="8" fill="#8B4513"/>
      <rect x="4" y="2" width="2" height="4" fill="#8B4513"/>
      <rect x="8" y="2" width="2" height="4" fill="#8B4513"/>
      <rect x="32" y="0" width="2" height="8" fill="#8B4513"/>
      <rect x="30" y="2" width="2" height="4" fill="#8B4513"/>
      <rect x="34" y="2" width="2" height="4" fill="#8B4513"/>
      {/* Head */}
      <rect x="12" y="6" width="16" height="12" fill="#D2691E"/>
      {/* Eyes */}
      <rect x="14" y="10" width="3" height="3" fill="#2C3E50"/>
      <rect x="23" y="10" width="3" height="3" fill="#2C3E50"/>
      {/* Nose */}
      <circle cx="20" cy="16" r="3" fill="#E74C3C"/>
      {/* Body */}
      <rect x="8" y="18" width="24" height="12" fill="#D2691E"/>
      {/* Legs */}
      <rect x="10" y="30" width="4" height="6" fill="#8B4513"/>
      <rect x="26" y="30" width="4" height="6" fill="#8B4513"/>
      {/* Tail */}
      <rect x="32" y="20" width="4" height="4" fill="#8B4513"/>
    </svg>
  );
}

export function PixelSnowman({ className = '', size = 70 }: { className?: string; size?: number }) {
  return (
    <svg 
      viewBox="0 0 32 44" 
      width={size} 
      height={size * 1.375} 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Hat */}
      <rect x="8" y="0" width="16" height="4" fill="#2C3E50"/>
      <rect x="4" y="4" width="24" height="4" fill="#2C3E50"/>
      {/* Head */}
      <circle cx="16" cy="14" r="8" fill="#FFFFFF" stroke="#D6EAF8" strokeWidth="1"/>
      {/* Eyes */}
      <rect x="12" y="12" width="2" height="2" fill="#2C3E50"/>
      <rect x="18" y="12" width="2" height="2" fill="#2C3E50"/>
      {/* Nose */}
      <polygon points="16,15 16,17 22,16" fill="#E67E22"/>
      {/* Smile */}
      <rect x="12" y="18" width="2" height="1" fill="#2C3E50"/>
      <rect x="14" y="19" width="4" height="1" fill="#2C3E50"/>
      <rect x="18" y="18" width="2" height="1" fill="#2C3E50"/>
      {/* Middle body */}
      <circle cx="16" cy="28" r="10" fill="#FFFFFF" stroke="#D6EAF8" strokeWidth="1"/>
      {/* Buttons */}
      <rect x="15" y="24" width="2" height="2" fill="#2C3E50"/>
      <rect x="15" y="28" width="2" height="2" fill="#2C3E50"/>
      <rect x="15" y="32" width="2" height="2" fill="#2C3E50"/>
      {/* Arms */}
      <rect x="0" y="26" width="6" height="2" fill="#8B4513"/>
      <rect x="26" y="26" width="6" height="2" fill="#8B4513"/>
      {/* Scarf */}
      <rect x="8" y="20" width="16" height="3" fill="#C0392B"/>
      <rect x="18" y="23" width="4" height="8" fill="#C0392B"/>
    </svg>
  );
}

export function PixelTree({ className = '', size = 120, decorated = true }: { className?: string; size?: number; decorated?: boolean }) {
  return (
    <svg 
      viewBox="0 0 60 80" 
      width={size} 
      height={size * 1.33} 
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Star */}
      {decorated && (
        <polygon points="30,0 33,8 42,8 35,14 38,22 30,17 22,22 25,14 18,8 27,8" fill="#F1C40F"/>
      )}
      {/* Tree layers */}
      <polygon points="30,10 10,30 50,30" fill="#27AE60"/>
      <polygon points="30,20 5,45 55,45" fill="#27AE60"/>
      <polygon points="30,35 0,65 60,65" fill="#27AE60"/>
      {/* Snow on branches */}
      <polygon points="30,10 20,22 40,22" fill="#FFFFFF" opacity="0.8"/>
      <polygon points="30,20 15,35 45,35" fill="#FFFFFF" opacity="0.7"/>
      <polygon points="30,35 10,52 50,52" fill="#FFFFFF" opacity="0.6"/>
      {/* Trunk */}
      <rect x="24" y="65" width="12" height="15" fill="#8B4513"/>
      {/* Ornaments */}
      {decorated && (
        <>
          <circle cx="22" cy="28" r="3" fill="#E74C3C"/>
          <circle cx="38" cy="26" r="3" fill="#F1C40F"/>
          <circle cx="18" cy="42" r="3" fill="#3498DB"/>
          <circle cx="42" cy="40" r="3" fill="#E74C3C"/>
          <circle cx="30" cy="38" r="3" fill="#9B59B6"/>
          <circle cx="14" cy="58" r="3" fill="#F1C40F"/>
          <circle cx="46" cy="56" r="3" fill="#3498DB"/>
          <circle cx="30" cy="54" r="3" fill="#E74C3C"/>
        </>
      )}
    </svg>
  );
}
