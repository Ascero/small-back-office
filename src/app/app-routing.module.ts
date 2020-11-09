import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './dashboard/list/list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './user/auth.guard';
import { UnauthGuard } from './user/unauth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [UnauthGuard],
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard/transactions',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: ':action',
        component: ListComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
