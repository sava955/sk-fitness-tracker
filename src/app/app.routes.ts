import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExercisesComponent } from './features/exercises/exercises.component';
import { AddExerciseComponent } from './features/exercises/add-exercise/add-exercise.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent), 
        children: [
            { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'exercises', component: ExercisesComponent, children: [
                { path: 'add-exercise/:id', component: AddExerciseComponent }
            ] }
        ]
    },
    { path: '',   redirectTo: '/', pathMatch: 'full' }
];
