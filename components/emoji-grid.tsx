"use client";
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase-client';
import { Card } from "@/components/ui/card";
import { Download, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEmoji } from '@/lib/EmojiContext';

// Mock data for emojis (replace with actual data from your backend)
// const mockEmojis = [
//   { id: 1, url: "https://replicate.delivery/yhqm/yAL94Zy2aI4NNtsevs5gFhIY7bpA7Fp0Q6BvK52OJwxLksvJA/out-0.webp" },
//   { id: 2, url: "https://example.com/emoji2.png" },
//   // Add more mock emojis here
// ];

const downloadEmoji = async (url: string, id: number) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `emoji-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading emoji:', error);
  }
};

export default function EmojiGrid() {
  const { emojis, likeEmoji } = useEmoji();
  const [hoveredEmoji, setHoveredEmoji] = useState<number | null>(null);

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className="relative p-2 overflow-hidden"
            onMouseEnter={() => setHoveredEmoji(emoji.id)}
            onMouseLeave={() => setHoveredEmoji(null)}
          >
            <img src={emoji.image_url} alt={`Emoji ${emoji.id}`} className="w-full h-auto" />
            <motion.div 
              className="absolute top-2 right-2 flex gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: hoveredEmoji === emoji.id ? 1 : 0, y: hoveredEmoji === emoji.id ? 0 : -10 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                onClick={() => downloadEmoji(emoji.url, emoji.id)}
              >
                <Download size={16} />
              </button>
              <button 
                className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                onClick={() => likeEmoji(emoji.id)}
              >
                <Heart size={16} fill={emoji.likes > 0 ? "red" : "none"} />
              </button>
            </motion.div>
            <motion.div 
              className="absolute bottom-2 left-2 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: hoveredEmoji === emoji.id ? 1 : 0, y: hoveredEmoji === emoji.id ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              {emoji.likes} likes
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}