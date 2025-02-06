import { ExerciseGroup } from "../exercises/exercise.interface";

export interface User {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  password: string;
  profileImage: string;
  weight: number;
  height: number;
  days: [
    {
      day: Date;
      exercisesGroup: ExerciseGroup[];
      nutrition: [];
      caloriesBalance: number;
    }
  ];
}
