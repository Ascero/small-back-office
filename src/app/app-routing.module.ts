import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './dashboard/list/details/details.component';
import { ListComponent } from './dashboard/list/list.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './user/guards/auth.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { UnauthGuard } from './user/guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [UnauthGuard],
  },
  {
    path: 'exchange',
    component: ExchangeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    redirectTo: 'dashboard/transactions',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AdminGuard],
    component: DashboardComponent,
    children: [
      {
        path: ':action',
        component: ListComponent,
      },
      {
        path: ':action/:id',
        component: DetailsComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
