'use client';

import { useState } from 'react';

type GameType = 'runner' | 'coinflip' | 'wheel' | 'jackpot';

interface GameCardProps {
  type: GameType;
  currentPot?: number;
  isLive?: boolean;
  nextRoundIn?: number;
}

const gameConfigs = {
  runner: {
    title: "Santa's Runner",
    description: "Help Santa dodge obstacles! Token holders vote on difficulty. Survive = win the pot!",
    emoji: '🎅',
    color: 'from-[#C0392B] to-[#E74C3C]',
    borderColor: 'border-[#C0392B]',
  },
  coinflip: {
    title: 'Naughty or Nice',
    description: 'Flip the coin! Naughty or Nice? 50/50 odds, double or nothing with your tokens.',
    emoji: '🪙',
    color: 'from-[#F1C40F] to-[#F39C12]',
    borderColor: 'border-[#F1C40F]',
  },
  wheel: {
    title: 'Gift Wheel',
    description: 'Spin the wheel of presents! Multipliers from 0x to 10x. Chat picks the spin!',
    emoji: '🎁',
    color: 'from-[#27AE60] to-[#2ECC71]',
    borderColor: 'border-[#27AE60]',
  },
  jackpot: {
    title: 'Stocking Stuffer',
    description: 'Pool your tokens together. Random winner takes all! More tokens = better odds.',
    emoji: '🧦',
    color: 'from-[#9B59B6] to-[#8E44AD]',
    borderColor: 'border-[#9B59B6]',
  },
};

export default function GameCard({
  type,
  currentPot = 0,
  isLive = false,
  nextRoundIn = 0,
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = gameConfigs[type];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`relative bg-gradient-to-br ${config.color} rounded-xl border-4 ${config.borderColor} p-5 shadow-xl transition-all duration-300 ${isHovered ? 'transform scale-105 shadow-2xl' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Live indicator */}
      {isLive && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-white text-[10px] font-bold">LIVE</span>
        </div>
      )}

      {/* Game icon */}
      <div className="text-5xl mb-3 filter drop-shadow-lg">{config.emoji}</div>

      {/* Title */}
      <h3 className="text-white font-bold text-lg mb-2 drop-shadow-md">
        {config.title}
      </h3>

      {/* Description */}
      <p className="text-white/80 text-xs mb-4 leading-relaxed">
        {config.description}
      </p>

      {/* Stats */}
      <div className="bg-black/20 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/60 text-xs">Current Pot</span>
          <span className="text-white font-bold text-sm">
            {currentPot > 0 ? `${currentPot.toLocaleString()} $PRESENTS` : 'Starting soon'}
          </span>
        </div>
        {nextRoundIn > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-xs">Next Round</span>
            <span className="text-[#F1C40F] font-bold text-sm font-mono">
              {formatTime(nextRoundIn)}
            </span>
          </div>
        )}
      </div>

      {/* Play button */}
      <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur text-white font-bold py-3 rounded-lg text-sm transition-all border border-white/30">
        {isLive ? 'Join Game' : 'Coming Soon'}
      </button>
    </div>
  );
}

// Quick play section component
export function GamesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <GameCard type="runner" isLive currentPot={1250} nextRoundIn={45} />
      <GameCard type="coinflip" isLive currentPot={500} />
      <GameCard type="wheel" nextRoundIn={180} />
      <GameCard type="jackpot" currentPot={5000} nextRoundIn={3600} />
    </div>
  );
}
