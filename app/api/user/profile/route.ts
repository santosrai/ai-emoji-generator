import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if user exists in profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!profile) {
      // Create new profile if it doesn't exist
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({ user_id: userId })
        .select()
        .single();

      if (insertError) throw insertError;

      return NextResponse.json(newProfile);
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error managing user profile:', error);
    return NextResponse.json({ error: 'Failed to manage user profile' }, { status: 500 });
  }
}