import { supabase } from "@/lib/initSupabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getCurrentUserData() {
  const cookieStore = cookies();
  const supabaseAuth = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  return user;
}

export const fetchUserWorkoutData = async () => {
  const userData = await getCurrentUserData();
  if (userData) {
    const { data: workoutData, error } = await supabase
      .from("workout_templates")
      .select("*, exercise_templates(*)")
      .eq("user_id", userData.id);
    if (error == null) {
      // processing
      workoutData.map((workout: any) => {
        workout.exercise_templates.sort((a: any, b: any) => a.order - b.order);
      });
      return workoutData;
    } else {
      return null;
    }
  }
};
