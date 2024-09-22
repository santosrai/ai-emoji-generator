import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { EmojiProvider } from '@/lib/EmojiContext';
import { Toaster } from 'react-hot-toast';
import { UserProfileInitializer } from '@/components/user-profile-initializer';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Emoji Generator",
  description: "Generate custom emojis with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <EmojiProvider>
            <UserProfileInitializer />
            {children}
            <Toaster position="bottom-right" />
          </EmojiProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
