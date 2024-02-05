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
  const body = (await request.json()) as Workout;
  console.dir(body, { depth: null });
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
        .from("workout")
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
      body.exercise.forEach(async (item) => {
        const { data, error } = await supabase
          .from("exercise")
          .insert([{ name: item.exerciseName, workout_id: workoutId }])
          .select();

        if (data) {
          const exerciseId = data[0].id;
          createSets(exerciseId, item.sets);
        }
      });
    } catch (e) {
      console.log("exercise create error: ", e);
      return NextResponse.json({ error: e, status: 500 });
    }
  };

  const createSets = async (exerciseId: number, setData: Sets[]) => {
    console.dir(setData, { depth: null });
    try {
      const { data, error } = await supabase
        .from("set")
        .insert(
          setData.map((set) => ({
            previous_weight:
              set.previous_weight === "" ? null : set.previous_weight,
            current_weight:
              set.current_weight === "" ? null : set.current_weight,
            unit: set.unit,
            reps: set.reps === "" ? null : set.reps,
            exercise_id: exerciseId,
          }))
        )
        .select();
      console.log("create sets response: ", error);
    } catch (e) {
      console.log("set create error: ", e);
      return NextResponse.json({ error: e, status: 500 });
    }
  };

  createWorkout();
  return NextResponse.json({ hi: "hello", status: 200 });
}