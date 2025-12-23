'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.href = '/index.html';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #0f3460 50%, #16213e 100%)',
      color: 'white',
      fontFamily: 'monospace'
    }}>
      Loading Santa&apos;s Factory...
    </div>
  );
}
