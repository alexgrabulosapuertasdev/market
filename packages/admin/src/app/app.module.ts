import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { TopbarComponent } from './components/partials/topbar/topbar.component';
import { MenuComponent } from './components/partials/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TopbarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    UserListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
