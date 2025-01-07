import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExercisesComponent } from './features/exercises/exercises.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'exercises', component: ExercisesComponent },
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }
];
