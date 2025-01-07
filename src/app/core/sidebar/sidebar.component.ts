import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, MatListModule, MatButtonModule, RouterLinkActive, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard'
    },
    {
      path: 'exercises',
      label: 'Exercises',
      icon: 'fitness_center'
    },
    /*{
      path: 'nutrition',
      label: 'Nutrition',
      icon: 'dashboard'
    }*/
  ]
}
