import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    const { data, error } = await supabase
      .from('emojis')
      .update({ likes: supabase.rpc('increment_likes', { row_id: id }) })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error liking emoji:', error);
    return NextResponse.json({ error: 'Failed to like emoji' }, { status: 500 });
  }
}