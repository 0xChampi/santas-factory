'use client';

import { useState } from 'react';

interface DisclaimerModalProps {
  onAgree: () => void;
}

export default function DisclaimerModal({ onAgree }: DisclaimerModalProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAgree = () => {
    setIsVisible(false);
    onAgree();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Icicle top border */}
      <div className="w-full h-8 bg-gradient-to-b from-[#AED6F1] to-[#5DADE2]" 
        style={{
          clipPath: 'polygon(0% 0%, 3% 0%, 3% 50%, 4.5% 100%, 6% 50%, 6% 0%, 9% 0%, 9% 40%, 10.5% 80%, 12% 40%, 12% 0%, 15% 0%, 15% 60%, 16.5% 100%, 18% 60%, 18% 0%, 21% 0%, 21% 45%, 22.5% 90%, 24% 45%, 24% 0%, 27% 0%, 27% 55%, 28.5% 100%, 30% 55%, 30% 0%, 33% 0%, 33% 35%, 34.5% 75%, 36% 35%, 36% 0%, 39% 0%, 39% 65%, 40.5% 100%, 42% 65%, 42% 0%, 45% 0%, 45% 50%, 46.5% 95%, 48% 50%, 48% 0%, 51% 0%, 51% 40%, 52.5% 85%, 54% 40%, 54% 0%, 57% 0%, 57% 60%, 58.5% 100%, 60% 60%, 60% 0%, 63% 0%, 63% 45%, 64.5% 90%, 66% 45%, 66% 0%, 69% 0%, 69% 55%, 70.5% 100%, 72% 55%, 72% 0%, 75% 0%, 75% 35%, 76.5% 75%, 78% 35%, 78% 0%, 81% 0%, 81% 65%, 82.5% 100%, 84% 65%, 84% 0%, 87% 0%, 87% 50%, 88.5% 95%, 90% 50%, 90% 0%, 93% 0%, 93% 40%, 94.5% 85%, 96% 40%, 96% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }}
      />
      
      <div className="bg-[#5DADE2] px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Warning text */}
          <p className="font-pixel text-[8px] md:text-[10px] leading-relaxed text-white text-center mb-4" style={{ textShadow: '1px 1px 0 #2C3E50' }}>
            THIS PROJECT IS AN EXPERIMENTAL SURVEY OF ECONOMIC THEORY APPLIED TO BLOCKCHAIN TECHNOLOGY AND CRYPTOCURRENCIES AS A MEANS TO INCREASE SUSTAINABLE VALUE WITH INTRINSIC GAMIFICATION. THIS IS HIGH RISK AND WE DO NOT RECOMMEND SPENDING ANY AMOUNT OF FIAT DOLLARS OR OTHERWISE TO PARTICIPATE. WHEN YOU CONNECT AND DEPOSIT, YOU ARE EFFECTIVELY GIVING YOUR FUNDS AWAY, AS WE HAVE NO WAY OF ENSURING OUR CONTRACTS ARE 100% FAILSAFE. IF YOU ARE NOT AN ACCREDITED INVESTOR, STEER CLEAR.
          </p>
          
          {/* Warning icons and agree button */}
          <div className="flex items-center justify-center gap-4">
            {/* No entry sign */}
            <div className="w-8 h-8 rounded-full bg-white border-4 border-[#C0392B] flex items-center justify-center">
              <div className="w-5 h-1 bg-[#C0392B] rounded"></div>
            </div>
            
            {/* No smoking sign */}
            <div className="w-8 h-8 rounded-full bg-white border-4 border-[#C0392B] relative flex items-center justify-center">
              <div className="absolute w-6 h-0.5 bg-[#C0392B] rotate-45"></div>
              <span className="text-xs">🚬</span>
            </div>
            
            {/* Stop sign */}
            <div className="w-10 h-10 bg-[#C0392B] flex items-center justify-center" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
              <span className="font-pixel text-[6px] text-white">STOP</span>
            </div>
            
            <div className="flex-1"></div>
            
            {/* I AGREE button */}
            <button
              onClick={handleAgree}
              className="bg-white border-4 border-[#2C3E50] rounded-lg px-6 py-2 font-pixel text-xs text-[#2C3E50] hover:bg-gray-100 transition-colors shadow-[2px_2px_0_#1A252F]"
            >
              I AGREE
            </button>
            
            {/* X button */}
            <button
              onClick={() => setIsVisible(false)}
              className="w-8 h-8 bg-white border-2 border-[#2C3E50] rounded flex items-center justify-center font-bold text-[#2C3E50] hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
