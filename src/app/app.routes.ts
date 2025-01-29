import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExercisesComponent } from './features/exercises/exercises.component';
import { AddExerciseComponent } from './features/exercises/add-exercise/add-exercise.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'exercises', component: ExercisesComponent, children: [
        { path: 'add-exercise/:id', component: AddExerciseComponent }
    ] },
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }
];
