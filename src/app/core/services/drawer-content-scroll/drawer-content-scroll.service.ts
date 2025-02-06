import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerContentScrollService {
  scrollOffset = signal(151);
}
