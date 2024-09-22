'use client';

import { SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import EmojiGrid from "./emoji-grid";
import EmojiGenerator from "./emoji-generator";
import { useEffect } from "react";
import { SignInButton, useSignIn } from "@clerk/nextjs";
import router, { useRouter } from "next/router";

export default function DashboardContent({ userId }: { userId: string }) {


  const { isSignedIn, isLoaded } = useUser();

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <div className="text-2xl font-bold text-black">Logo</div>
        <nav className="space-x-4">
          <a href="#about" className="text-black hover:text-blue-500">About</a>
          <a href="#how-it-works" className="text-black hover:text-blue-500">How it Works</a>
          <a href="#pricing" className="text-black hover:text-blue-500">Pricing</a>
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="text-black hover:text-blue-500">Sign In</button>
            </SignInButton>
          ) : (
            <>
              {/* sign out button wiht navigation to home*/}
              <SignOutButton redirectUrl="/">
                <button className="text-black hover:text-blue-500">Sign Out</button>
              </SignOutButton>
            </>
          )}
        </nav>
      </header>
      {/* <p>You are logged in with user ID: {userId}</p> */}
      <EmojiGenerator />
      <EmojiGrid />

    </div>
  );
}