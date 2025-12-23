'use client';

interface IcicleBorderProps {
  position: 'top' | 'bottom';
  className?: string;
}

export default function IcicleBorder({ position, className = '' }: IcicleBorderProps) {
  const icicles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    height: 30 + Math.random() * 50,
    width: 8 + Math.random() * 6,
    delay: Math.random() * 2,
  }));

  return (
    <div 
      className={`w-full overflow-hidden ${position === 'bottom' ? 'rotate-180' : ''} ${className}`}
      style={{ height: '80px' }}
    >
      <div className="flex justify-between items-start px-1">
        {icicles.map((icicle) => (
          <div
            key={icicle.id}
            className="relative"
            style={{
              width: `${icicle.width}px`,
            }}
          >
            {/* Main icicle body */}
            <svg
              viewBox="0 0 20 100"
              className="w-full"
              style={{ height: `${icicle.height}px` }}
            >
              <defs>
                <linearGradient id={`iceGrad-${icicle.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#AED6F1" />
                  <stop offset="30%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#D6EAF8" />
                  <stop offset="100%" stopColor="#85C1E9" />
                </linearGradient>
              </defs>
              {/* Icicle shape */}
              <path
                d="M2 0 L18 0 L18 15 Q18 25 15 40 Q12 60 11 80 Q10 95 10 100 Q10 95 9 80 Q8 60 5 40 Q2 25 2 15 Z"
                fill={`url(#iceGrad-${icicle.id})`}
                stroke="#85C1E9"
                strokeWidth="1"
              />
              {/* Highlight */}
              <path
                d="M6 5 L8 5 L7 30 Z"
                fill="rgba(255,255,255,0.6)"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
