import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/error.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavMenuComponent } from './dashboard/sidenav-menu/sidenav-menu.component';
import { LoginComponent } from './login/login.component';
import { AuthTokenInterceptor } from './user/auth-token.interceptor';
import { ListComponent } from './dashboard/list/list.component';
import { DetailsComponent } from './dashboard/list/details/details.component';
import { ExchangeComponent } from './exchange/exchange.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidenavMenuComponent,
    ListComponent,
    DetailsComponent,
    ExchangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
