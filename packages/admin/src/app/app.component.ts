import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuIsOpened = true;
  isLogged = false;

  constructor(public readonly authService: AuthService) {
    this.authService.isLogged().subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

  toggleMenu(): void {
    this.menuIsOpened = !this.menuIsOpened;
  }
}
