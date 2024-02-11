import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/initSupabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getCurrentUserData } from "@/app/util-functions";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const user = await getCurrentUserData();
  // console.dir(body.exercise_templates, { depth: null });
  // try {
  //   const { data: data, error } = await supabase
  //     .from('workout_logs')
  //     .insert([body])
  //     .select()
  //   if (error == null) {
  //     return NextResponse.json({ data }, { status: 200 });
  //   } else {
  //     return NextResponse.json({ error }, { status: 500 });
  //   }
  // } catch (e) {
  //   return NextResponse.json({ error: e }, { status: 500 });
  // }
  const createWorkoutLog = async () => {
    try {
      const { data: data, error } = await supabase
        .from("workout_logs")
        .insert([
          {
            workout_template_id: body.workoutId,
            user_id: user?.id,
          },
        ])
        .select("*");
      if (data) {
        createExerciseLog(data[0].id);
      }
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 500 });
    }
  };
  const createExerciseLog = async (workout_log_id: string) => {
    try {
      // const { data: data, error } = await supabase.from("set_logs").insert
      body.exercise_templates.forEach((exercise: any) => {
        exercise.set_data.forEach(async (set: any) => {
          const { data: data, error } = await supabase
            .from("set_logs")
            .insert([
              {
                workout_log_id: workout_log_id,
                exercise_id: exercise.exercise_id,
                previous_weight:
                  set.previous_weight === "" ? null : set.previous_weight,
                current_weight:
                  set.current_weight === "" ? null : set.current_weight,
                unit: set.unit,
                reps: set.reps === "" ? null : set.reps,
              },
            ])
            .select();
          console.log(error);
        });
      });
      return NextResponse.json({ good: "good" }, { status: 200 });
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 500 });
    }
  };
  createWorkoutLog();
  return NextResponse.json({ good: "good" }, { status: 200 });
}
