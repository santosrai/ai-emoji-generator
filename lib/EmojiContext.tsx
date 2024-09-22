"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase-client';

type Emoji = {
  id: number;
  image_url: string;
  prompt: string;
  likes: number;
};

type EmojiContextType = {
  emojis: Emoji[];
  addEmoji: (emoji: Emoji) => void;
  likeEmoji: (id: number) => void;
};

const EmojiContext = createContext<EmojiContextType | undefined>(undefined);

export const EmojiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    fetchEmojis();
  }, []);

  const fetchEmojis = async () => {
    const { data, error } = await supabase
      .from('emojis')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching emojis:', error);
    } else {
      setEmojis(data);
    }
  };

  const addEmoji = (emoji: Emoji) => {
    setEmojis((prevEmojis) => [emoji, ...prevEmojis]);
  };

  const likeEmoji = async (id: number) => {
    const { data, error } = await supabase
      .from('emojis')
      .update({ likes: emojis.find(e => e.id === id)!.likes + 1 })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error liking emoji:', error);
    } else {
      setEmojis((prevEmojis) =>
        prevEmojis.map((emoji) =>
          emoji.id === id ? { ...emoji, likes: data[0].likes } : emoji
        )
      );
    }
  };

  return (
    <EmojiContext.Provider value={{ emojis, addEmoji, likeEmoji }}>
      {children}
    </EmojiContext.Provider>
  );
};

export const useEmoji = () => {
  const context = useContext(EmojiContext);
  if (context === undefined) {
    throw new Error('useEmoji must be used within an EmojiProvider');
  }
  return context;
};