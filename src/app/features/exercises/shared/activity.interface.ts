import { Exercise } from './exercise.interface';

export interface Activity {
  date: string;
  activities: {
    met: string;
    duration: string;
    sets: string;
    exercise: Exercise;
    status: string;
  }[];
  caloriesBurned: number;
}
