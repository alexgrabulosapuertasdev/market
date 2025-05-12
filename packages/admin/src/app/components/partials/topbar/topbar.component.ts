import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  authService = inject(AuthService);
  @Input() isLogged = false;
  @Output() menuToggled = new EventEmitter<void>();

  logout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.menuToggled.emit();
  }
}
