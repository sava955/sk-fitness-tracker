export interface Exercise {
  id: number;
  code: string;
  mets: number;
  major_heading: string;
  specific_activities: string;
}

export interface ExerciseParams {
  _start: number;
  _limit: number;
  specific_activities_like?: string;
}