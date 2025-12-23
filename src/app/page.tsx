'use client';

import { useState } from 'react';
import Image from 'next/image';
import DisclaimerModal from '@/components/DisclaimerModal';
import Snowfall from '@/components/Snowfall';
import StreamEmbed from '@/components/StreamEmbed';
import TokenLaunch from '@/components/TokenLaunch';
import GameCard, { GamesSection } from '@/components/GameCard';
import LiveTicker from '@/components/LiveTicker';
import { PixelSanta, PixelElf, PixelTree } from '@/components/PixelCharacters';

export default function Home() {
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#16213e]">
      {/* Snowfall animation */}
      <Snowfall />

      {/* Top banner */}
      <div className="bg-gradient-to-r from-[#C0392B] via-[#E74C3C] to-[#C0392B] text-white text-center py-2 px-4 text-sm font-medium">
        <span className="animate-pulse">🎄</span>
        {' '}Santa&apos;s Factory is LIVE! Token launching on pump.fun{' '}
        <span className="animate-pulse">🎄</span>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/santa.gif"
            width={50}
            height={50}
            alt="Santa"
            unoptimized
            className="rounded-full border-2 border-[#F1C40F]"
          />
          <div>
            <h1 className="text-white font-bold text-lg md:text-xl">Santa&apos;s Factory</h1>
            <p className="text-[#F1C40F] text-xs">Stream-powered token games</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            Telegram
          </a>
          <button className="bg-[#C0392B] hover:bg-[#A93226] text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Hero Section - Stream + Token */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Stream */}
          <div>
            <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
              <span className="text-3xl">📺</span> Watch Dakota Play
            </h2>
            <StreamEmbed platform="twitch" channel="dakota" isLive />
          </div>

          {/* Right - Token Launch */}
          <div>
            <h2 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
              <span className="text-3xl">🚀</span> Get $PRESENTS
            </h2>
            <TokenLaunch
              tokenName="$PRESENTS"
              tokenSymbol="PRESENTS"
              tokenAddress="TBD - Launching Soon"
            />
          </div>
        </div>
      </section>

      {/* How it works - Simple */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
          <h2 className="text-white font-bold text-2xl md:text-3xl text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C0392B] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                1️⃣
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Buy $PRESENTS</h3>
              <p className="text-white/60 text-sm">
                Get tokens on pump.fun. These power your gameplay in all games.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F1C40F] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                2️⃣
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Watch the Stream</h3>
              <p className="text-white/60 text-sm">
                Dakota plays live. Chat votes on game events. Your tokens, your choices.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                3️⃣
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Win Big</h3>
              <p className="text-white/60 text-sm">
                Play runner games, flip coins, spin wheels. Multiply your $PRESENTS!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-2xl md:text-3xl flex items-center gap-2">
            <span className="text-3xl">🎮</span> Games
          </h2>
          <div className="flex items-center gap-2 text-[#27AE60]">
            <span className="w-2 h-2 bg-[#27AE60] rounded-full animate-pulse" />
            <span className="text-sm font-medium">2 Live Now</span>
          </div>
        </div>
        <GamesSection />
      </section>

      {/* Live Activity + Stats */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Live ticker */}
          <div className="lg:col-span-2">
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span> Recent Plays
            </h2>
            <LiveTicker />
          </div>

          {/* Right - Quick stats */}
          <div>
            <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> Stats
            </h2>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Total Wagered</span>
                <span className="text-white font-bold">--</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Games Played</span>
                <span className="text-white font-bold">--</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Biggest Win</span>
                <span className="text-[#27AE60] font-bold">--</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Active Players</span>
                <span className="text-[#F1C40F] font-bold">--</span>
              </div>
              <hr className="border-white/10" />
              <div className="text-center">
                <p className="text-white/40 text-xs mb-2">Stream viewers</p>
                <p className="text-white font-bold text-2xl">--</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative characters at bottom */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end px-8">
          <PixelTree size={80} decorated />
          <PixelElf size={45} variant="green" />
          <PixelSanta size={60} />
          <PixelElf size={45} variant="red" />
          <PixelTree size={80} decorated />
        </div>
        {/* Ground gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      {/* Footer */}
      <footer className="bg-black/60 border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/santa.gif"
                width={40}
                height={40}
                alt="Santa"
                unoptimized
                className="rounded-full"
              />
              <span className="text-white/60 text-sm">
                Santa&apos;s Factory - Powered by $PRESENTS on Solana
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="text-[#00d4aa] hover:underline">
                pump.fun
              </a>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-white/40 text-xs">
              This is an experimental crypto game. Only play with what you can afford to lose. DYOR.
            </p>
          </div>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      {!agreed && <DisclaimerModal onAgree={() => setAgreed(true)} />}
    </main>
  );
}
