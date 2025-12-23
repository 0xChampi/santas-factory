'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TokenLaunchProps {
  tokenAddress?: string;
  tokenName?: string;
  tokenSymbol?: string;
  launchProgress?: number;
}

export default function TokenLaunch({
  tokenAddress = 'TBD',
  tokenName = '$PRESENTS',
  tokenSymbol = 'PRESENTS',
  launchProgress = 0
}: TokenLaunchProps) {
  const [copied, setCopied] = useState(false);
  const [marketCap, setMarketCap] = useState(0);

  // Simulate market cap animation on mount
  useEffect(() => {
    const target = 42069; // Demo value
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setMarketCap(target);
        clearInterval(timer);
      } else {
        setMarketCap(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const copyAddress = () => {
    if (tokenAddress !== 'TBD') {
      navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const bondingCurveProgress = launchProgress || 23; // Demo: 23% filled

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl border-4 border-[#F1C40F] p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src="/presents.png"
              width={60}
              height={60}
              alt={tokenName}
              className="rounded-full border-2 border-[#F1C40F]"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#27AE60] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              NEW
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{tokenName}</h3>
            <p className="text-[#F1C40F] text-sm">${tokenSymbol}</p>
          </div>
        </div>
        <a
          href="https://pump.fun"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#00d4aa] hover:bg-[#00b894] text-black font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          View on pump.fun
        </a>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-white/60 text-xs mb-1">Market Cap</p>
          <p className="text-[#27AE60] font-bold text-lg">${marketCap.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-white/60 text-xs mb-1">Holders</p>
          <p className="text-white font-bold text-lg">--</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-white/60 text-xs mb-1">24h Volume</p>
          <p className="text-white font-bold text-lg">--</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <p className="text-white/60 text-xs mb-1">Pool Status</p>
          <p className="text-[#F1C40F] font-bold text-lg">Bonding</p>
        </div>
      </div>

      {/* Bonding curve progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-white/60">Bonding Curve Progress</span>
          <span className="text-[#F1C40F] font-bold">{bondingCurveProgress}%</span>
        </div>
        <div className="h-4 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C0392B] via-[#F1C40F] to-[#27AE60] rounded-full transition-all duration-1000"
            style={{ width: `${bondingCurveProgress}%` }}
          />
        </div>
        <p className="text-white/40 text-xs mt-2">
          When 100% filled, liquidity moves to Raydium and burns
        </p>
      </div>

      {/* Contract address */}
      <div className="bg-black/30 rounded-lg p-4">
        <p className="text-white/60 text-xs mb-2">Contract Address</p>
        <div className="flex items-center gap-2">
          <code className="text-[#00d4aa] text-sm flex-1 truncate font-mono">
            {tokenAddress}
          </code>
          <button
            onClick={copyAddress}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-xs transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Buy button */}
      <button className="w-full mt-6 bg-gradient-to-r from-[#C0392B] to-[#E74C3C] hover:from-[#A93226] hover:to-[#C0392B] text-white font-bold py-4 rounded-xl text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg">
        🎁 Buy $PRESENTS on pump.fun
      </button>
    </div>
  );
}
