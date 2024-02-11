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
  exerciseId: string;
  sets: Sets[];
}
interface Workout {
  workoutName: string;
  user_id: string;
  exercise: Exercise[];
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Workout;
  console.dir(body, { depth: null });

  console;
  const cookieStore = cookies();
  const supabaseAuth = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  // create workout entry
  const createWorkout = async () => {
    try {
      const { data, error } = await supabase
        .from("workout_templates")
        .insert([{ name: body.workoutName, user_id: user?.id }])
        .select();

      if (data) {
        const workoutId = data[0].id;
        createExercise(workoutId);
      }
    } catch (e) {
      console.log("workout create error: ", e);
      return NextResponse.json({ error: e, status: 500 });
    }
  };

  const createExercise = async (workoutId: number) => {
    try {
      const newBody = body.exercise.map((exercise: any, index) => ({
        ...exercise,
        order: index + 1,
      }));
      newBody.forEach(async (item) => {
        const { data, error } = await supabase
          .from("exercise_templates")
          .insert([
            {
              exercise_id: item.exerciseId,
              exercise_name: item.exerciseName,
              workout_template_id: workoutId,
              set_data: item.sets,
              order: item.order
            },
          ])
          .select();
      });
    } catch (e) {
      console.log("exercise create error: ", e);
      return NextResponse.json({ error: e, status: 500 });
    }
  };

  createWorkout();
  return NextResponse.json({ hi: "hello", status: 200 });
}
