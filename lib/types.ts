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
  name: string;
  set: Sets[];
}
export interface Workout {
  name: string;
  id: number;
  exercise: Exercise[];
}
