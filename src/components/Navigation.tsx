'use client';

export default function Navigation() {
  return (
    <nav className="flex items-center justify-center gap-8 py-4">
      {['About', 'Team', 'Socials'].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="font-pixel text-xs text-white hover:text-[#F1C40F] transition-colors cursor-pointer"
          style={{ textShadow: '2px 2px 0 #2C3E50' }}
        >
          {item}
        </a>
      ))}
    </nav>
  );
}
