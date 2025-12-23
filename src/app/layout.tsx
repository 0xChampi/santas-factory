import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santa's Factory | Farm $PRESENTS on Solana",
  description: "A gamified DeFi experience on Solana. Stake SOL, earn $COOKIES, receive $PRESENTS on Christmas. Experimental yield farming with pixel art vibes.",
  keywords: ["Solana", "DeFi", "yield farming", "Christmas", "crypto", "NFT", "$PRESENTS", "$COOKIES"],
  openGraph: {
    title: "Santa's Factory | Farm $PRESENTS on Solana",
    description: "Stake SOL, earn $COOKIES, receive $PRESENTS on Christmas. 8 days until the big reveal!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santa's Factory | Farm $PRESENTS on Solana",
    description: "Stake SOL, earn $COOKIES, receive $PRESENTS on Christmas. 8 days until the big reveal!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
