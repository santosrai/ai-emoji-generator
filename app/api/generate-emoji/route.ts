import { NextResponse } from 'next/server';
import Replicate from "replicate";
import { supabase } from '@/lib/supabase-client';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
    return NextResponse.json({ message: "API is working. Use POST to generate emoji." });
  }

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  console.log("prompt", prompt)
  

  try {
    const output = await replicate.run(
      "fofr/sdxl-emoji:b761fa16918356ee07f31fad9b0d41d8919b9ff08f999e2d298a5a35b672f47e",
      {
        input: {
          prompt:prompt,
          width: 1024,
          height: 1024,
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: false,
          high_noise_frac: 0.8,
          negative_prompt: "",
          prompt_strength: 0.8,
          num_inference_steps: 50,
        },
      }
    );
    // const output = await replicate.run("bingbangboom-lab/flux-new-whimscape:2e8de10f217bc56da163a0204cf09f89995eaf643459014803fae79753183682", { input: { prompt } });

    if (!Array.isArray(output) || output.length === 0) {
      throw new Error('Invalid output from Replicate');
    }

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('emojis')
      .insert({ image_url: output[0], prompt, likes: 0, creator_user_id: userId })
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);

  } catch (error) {
    console.error('Error generating emoji:', error);
    return NextResponse.json({ error: 'Failed to generate emoji' }, { status: 500 });
  }
}