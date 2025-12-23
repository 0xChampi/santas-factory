'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      {/* Pixel Art Logo */}
      <Image
        src="/logo.png"
        alt="Santa's Factory"
        width={400}
        height={200}
        className="w-[280px] md:w-[400px] lg:w-[500px] h-auto drop-shadow-lg"
        priority
      />

      {/* Tagline */}
      <p
        className="font-pixel text-xs md:text-sm text-white mt-4 tracking-wider"
        style={{
          textShadow: '2px 2px 0 #2C3E50',
        }}
      >
        CELEBRATE CHRISTMAS, FARM $PRESENTS
      </p>
    </div>
  );
}
