import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { PrimengModule } from './primeng/primeng.module';
import { DateFormatPipe } from './shared/pipe/data-formate.pipe';
import { TopbarComponent } from './components/partials/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    UserListComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PrimengModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
