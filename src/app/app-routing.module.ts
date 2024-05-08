import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAutenticatedGuard } from './auth/guards/is-autenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path:'auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'dashboard',
    canActivate:[isAutenticatedGuard],
    loadChildren:()=> import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path:'**',
    redirectTo:'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
