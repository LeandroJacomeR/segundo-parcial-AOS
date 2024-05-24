import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SidebarComponent , CommonModule, MatSnackBarModule],
  template: `
    <div class="flex">
      <app-sidebar *ngIf="showSidebar"></app-sidebar>
      <div class="flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {
  showSidebar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showSidebar = this.router.url !== '/login';
    });
  }
}
