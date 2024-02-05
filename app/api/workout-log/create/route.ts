import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/initSupabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const { data: data, error } = await supabase
      .from('workout_logs')
      .insert([body])
      .select()
    if (error == null) {
      return NextResponse.json({ data }, { status: 200 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
