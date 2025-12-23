'use client';

import { useState, useEffect } from 'react';

interface TickerItem {
  id: number;
  type: 'win' | 'bet' | 'jackpot';
  user: string;
  amount: number;
  game: string;
  timestamp: Date;
}

const sampleEvents: Omit<TickerItem, 'id' | 'timestamp'>[] = [
  { type: 'win', user: '7xK3...mP2q', amount: 420, game: 'Runner' },
  { type: 'bet', user: '9nR5...kL8w', amount: 100, game: 'Coinflip' },
  { type: 'jackpot', user: '3mT7...bN4j', amount: 2500, game: 'Jackpot' },
  { type: 'win', user: '5pQ9...hY6r', amount: 69, game: 'Wheel' },
  { type: 'bet', user: '2wE4...cX1v', amount: 250, game: 'Runner' },
  { type: 'win', user: '8zS6...gF3u', amount: 1000, game: 'Coinflip' },
];

export default function LiveTicker() {
  const [events, setEvents] = useState<TickerItem[]>([]);

  useEffect(() => {
    // Initialize with some events
    const initialEvents = sampleEvents.slice(0, 3).map((e, i) => ({
      ...e,
      id: i,
      timestamp: new Date(Date.now() - i * 30000),
    }));
    setEvents(initialEvents);

    // Simulate new events coming in
    const interval = setInterval(() => {
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      const newEvent: TickerItem = {
        ...randomEvent,
        id: Date.now(),
        timestamp: new Date(),
        amount: Math.floor(randomEvent.amount * (0.5 + Math.random())),
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: TickerItem['type']) => {
    switch (type) {
      case 'win': return '🎉';
      case 'bet': return '🎲';
      case 'jackpot': return '💰';
    }
  };

  const getEventColor = (type: TickerItem['type']) => {
    switch (type) {
      case 'win': return 'text-[#27AE60]';
      case 'bet': return 'text-[#F1C40F]';
      case 'jackpot': return 'text-[#9B59B6]';
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#27AE60] rounded-full animate-pulse" />
        <span className="text-white/80 text-sm font-medium">Live Activity</span>
      </div>
      <div className="divide-y divide-white/5">
        {events.map((event) => (
          <div
            key={event.id}
            className="px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors"
          >
            <span className="text-xl">{getEventIcon(event.type)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm truncate">
                <span className="text-white/60">{event.user}</span>
                <span className="mx-1">
                  {event.type === 'win' ? 'won' : event.type === 'jackpot' ? 'hit jackpot' : 'bet'}
                </span>
                <span className={`font-bold ${getEventColor(event.type)}`}>
                  {event.amount} $PRESENTS
                </span>
              </p>
              <p className="text-white/40 text-xs">{event.game}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
