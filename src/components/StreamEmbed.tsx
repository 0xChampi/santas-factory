'use client';

import { useState } from 'react';

interface StreamEmbedProps {
  platform?: 'twitch' | 'youtube' | 'kick';
  channel?: string;
  isLive?: boolean;
}

export default function StreamEmbed({
  platform = 'twitch',
  channel = 'dakota',
  isLive = true
}: StreamEmbedProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getEmbedUrl = () => {
    switch (platform) {
      case 'twitch':
        return `https://player.twitch.tv/?channel=${channel}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&muted=true`;
      case 'youtube':
        return `https://www.youtube.com/embed/live_stream?channel=${channel}&autoplay=1&mute=1`;
      case 'kick':
        return `https://player.kick.com/${channel}`;
      default:
        return '';
    }
  };

  return (
    <div className="relative">
      {/* Live indicator */}
      {isLive && (
        <div className="absolute -top-3 left-4 z-10 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-white text-xs font-bold uppercase tracking-wide">Live</span>
        </div>
      )}

      <div className="bg-black/90 rounded-xl border-4 border-[#C0392B] overflow-hidden shadow-2xl">
        {/* Stream header */}
        <div className="bg-gradient-to-r from-[#C0392B] to-[#922B21] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#27AE60] flex items-center justify-center border-2 border-white">
              <span className="text-white text-lg">🎅</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm md:text-base">Dakota&apos;s Workshop</h3>
              <p className="text-white/70 text-xs">Streaming the chaos live</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white/80 hover:text-white transition-colors text-sm"
          >
            {isExpanded ? 'Minimize' : 'Expand'}
          </button>
        </div>

        {/* Stream embed */}
        <div className={`relative transition-all duration-300 ${isExpanded ? 'h-[400px] md:h-[500px]' : 'h-[200px] md:h-[300px]'}`}>
          <iframe
            src={getEmbedUrl()}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
        </div>

        {/* Stream footer with chat link */}
        <div className="bg-[#1a1a2e] px-4 py-2 flex items-center justify-between">
          <p className="text-white/60 text-xs">
            Join the stream to influence the games!
          </p>
          <a
            href={`https://twitch.tv/${channel}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F1C40F] text-xs hover:underline"
          >
            Open in {platform.charAt(0).toUpperCase() + platform.slice(1)} →
          </a>
        </div>
      </div>
    </div>
  );
}
