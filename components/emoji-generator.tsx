"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEmoji } from '@/lib/EmojiContext';
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function EmojiGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmoji, setGeneratedEmoji] = useState<string | null>(null);
  const { addEmoji } = useEmoji();

  const generateEmoji = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.image_url) {
        setGeneratedEmoji(data.image_url);
        // Add the new emoji to the context
        addEmoji(data);
        toast.success("Emoji generated successfully!");
      } else {
        throw new Error('Failed to generate emoji');
      }
    } catch (error) {
      console.error('Error generating emoji:', error);
      toast.error("Failed to generate emoji. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6 mb-8">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Enter your emoji prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
        />
        <Button onClick={generateEmoji} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating
            </>
          ) : (
            "Generate Emoji"
          )}
        </Button>
      </div>
      {generatedEmoji && (
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img src={generatedEmoji} alt="Generated Emoji" className="w-32 h-32" />
        </motion.div>
      )}
    </Card>
  );
}