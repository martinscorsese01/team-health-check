import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

// Create a new supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const healthCheckSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  feeling: z.string().min(1, 'Feeling is required'),
  date: z.string().refine((date) => {
    try {
      new Date(date).toISOString();
      return true;
    } catch {
      return false;
    }
  }, 'Invalid date format'),
});

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const validatedData = healthCheckSchema.parse(body);

    const formattedData = {
      ...validatedData,
      date: new Date(validatedData.date).toISOString(),
    };

    const { data, error } = await supabase
      .from('team-health')
      .insert([formattedData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return Response.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.errors }, { status: 400 });
    }
    console.error('Unexpected error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<Response> {
  try {
    const { data, error } = await supabase
      .from('team-health')
      .select('id, name, feeling, date, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (!data) {
      return Response.json([], { status: 200 });
    }

    return Response.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 