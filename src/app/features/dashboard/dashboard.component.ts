import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '27.11.1995',
    gender: 'male',
    height: '175cm',
    goal: 'LOSE_WEIGHT',
    days: [
      {
        date: '',
        weight: { value: '84', balance: '-2%' },
        scheduledActivities: [
          { id: 1, name: 'Pushups', image: '/', met: '', duration: '', sets: '', category: 'exercise', status: 'DONE' }
        ],
        activities: [
          { id: 1, name: 'Pushups', image: '/', met: '', duration: '', sets: '', category: 'exercise', status: 'TO_DO' }
        ],
        nutrition: [],
        requiredCalories: '1500',
        caloryBalance: '-200',
      }
    ]
  };
}
