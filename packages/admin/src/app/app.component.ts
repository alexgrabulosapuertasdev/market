import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuIsOpened = true;

  toggleMenu(): void {
    this.menuIsOpened = !this.menuIsOpened;
  }
}
