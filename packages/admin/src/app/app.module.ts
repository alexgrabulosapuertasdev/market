import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { TopbarComponent } from './components/partials/topbar/topbar.component';
import { MenuComponent } from './components/partials/menu/menu.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, TopbarComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    UserListComponent,
    LoginComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
