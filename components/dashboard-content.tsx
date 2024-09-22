'use client';

import EmojiGrid from "./emoji-grid";
import EmojiGenerator from "./emoji-generator";

import Header from "./header";

export default function DashboardContent({ userId }: { userId: string }) {


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <div className="mt-40"> {/* Added margin-top for spacing */}
        <div className="flex justify-center w-full"> {/* Center EmojiGenerator in a row */}
          <div className="w-1/2"> {/* Set width to 50% */}
            <EmojiGenerator />
          </div>
        </div>
      </div>
    
      <EmojiGrid />
 
    </div>
  );
}