import { SignOutButton, SignInButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <div className="text-2xl font-bold text-black">AI Emojis Generator</div>
      <nav className="space-x-4">
        <a href="#about" className="text-black hover:text-blue-500">About</a>
        <a href="#how-it-works" className="text-black hover:text-blue-500">How it Works</a>
        <a href="#pricing" className="text-black hover:text-blue-500">Pricing</a>
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <button className="text-black hover:text-blue-500">Sign In</button>
          </SignInButton>
        ) : (
          <SignOutButton >
            <button className="text-black hover:text-blue-500">Sign Out</button>
          </SignOutButton>
        )}
      </nav>
    </header>
  );
};

export default Header;
