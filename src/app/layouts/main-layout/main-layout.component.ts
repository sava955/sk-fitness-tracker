import {
  AfterViewInit,
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDrawerContent,
  MatDrawerMode,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { SidebarComponent } from '../../core/sidebar/sidebar.component';
import { HeaderComponent } from '../../core/header/header.component';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { DrawerContentScrollService } from '../../core/drawer-content-scroll.service';
import { UserService } from '../../shared/services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild(MatDrawerContent) drawerContent!: MatDrawerContent;
  private innerWidth!: number;
  sideNavMode: MatDrawerMode = 'side';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setSidenavMode();
  }

  private readonly drawerContentScrollService = inject(
    DrawerContentScrollService
  );
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.setSidenavMode();

    this.userService
      .getUser(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngAfterViewInit(): void {
    this.drawerContent
      .elementScrolled()
      .pipe(map(() => this.drawerContent.measureScrollOffset('bottom')))
      .subscribe((res) => {
        this.drawerContentScrollService.scrollOffset.set(res);
      });
  }

  setSidenavMode(): void {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 767) {
      this.sideNavMode = 'over';
    } else {
      this.sideNavMode = 'side';
    }
  }
}
