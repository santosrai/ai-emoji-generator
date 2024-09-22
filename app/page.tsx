"use client";
import { useUser } from "@clerk/nextjs";
import { SignInButton, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
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
            <button 
              onClick={() => router.push("/dashboard")} 
              className="text-black hover:text-blue-500"
            >
              Dashboard
            </button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">AI Emojis</h1>
          <p className="text-lg text-black mb-8">350 emojis generated and counting!</p>
          <input
            type="text"
            placeholder="Search for emojis..."
            className="border rounded-lg p-2 mb-8 w-1/2 text-black"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Replace with your image data */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="relative group" key={index}>
                <img
                  src={`https://replicate.delivery/yhqm/yAL94Zy2aI4NNtsevs5gFhIY7bpA7Fp0Q6BvK52OJwxLksvJA/out-${index}.webp`}
                  alt={`Generated image ${index}`}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Prompt used for this image</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Centered CTA Button */}
      <div className="flex justify-center items-center mb-4">
        <a href="#create" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
          Create Your Own
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 text-center">
        <p className="text-black">Additional information and social proof here.</p>
      </footer>
    </div>
  );
}