import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { map } from 'rxjs';
import { DrawerContentScrollService } from './core/drawer-content-scroll.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'devsofteon-fitness-tracker';

  @ViewChild(MatDrawerContent) drawerContent!: MatDrawerContent;

  readonly drawerContentScrollService = inject(DrawerContentScrollService);

  ngAfterViewInit(): void {
    this.drawerContent.elementScrolled().pipe(
      map(() => this.drawerContent.measureScrollOffset('bottom')),
    ).subscribe((res) => {
     this.drawerContentScrollService.scrollOffset.set(res);
    })
  }
}
