export interface Sets {
  id: number;
  exercise_id: number;
  previous_weight: number;
  current_weight: number;
  unit: string;
  reps: number;
}
export interface Exercise {
  id: number;
  exercise_name: string;
  set_data: Sets[];
}
export interface Workout {
  name: string;
  id: number;
  exercise_templates: Exercise[];
}
