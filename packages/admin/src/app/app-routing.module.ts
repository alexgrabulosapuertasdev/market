import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { authGuard } from './auth/guard/auth.guard';
import { rolesGuard } from './auth/guard/roles.guard';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { USER_ROLE } from './shared/enum/user-role.enum';

const routes: Routes = [
  {
    path: 'user',
    component: UserListComponent,
    canActivate: [authGuard, rolesGuard],
    data: { roles: [USER_ROLE.ADMIN] },
  },
  {
    path: 'product',
    component: ProductListComponent,
    canActivate: [authGuard, rolesGuard],
    data: { roles: [USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE] },
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
