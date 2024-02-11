import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/initSupabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

interface Sets {
  previous_weight: string | number;
  current_weight: string | number;
  unit: string;
  reps: string | number;
}
interface Exercise {
  exerciseName: string;
  sets: Sets[];
}
interface Workout {
  workoutName: string;
  user_id: string;
  exercise: Exercise[];
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const userId = body?.user_id;
  try {
    const { data: workoutData, error } = await supabase
      .from("workout")
      .select("*")
      .eq("user_id", userId);
    if (error == null) {
      return NextResponse.json(workoutData, { status: 200 });
    } else {
      return NextResponse.json(
        { error: error },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "error occurred while fetching workouts" },
      { status: 500 }
    );
  }
}
