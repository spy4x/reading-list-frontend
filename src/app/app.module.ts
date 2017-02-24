/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './_general/auth/auth.service';
import { AuthenticatedComponent } from './_general/auth/authenticated/authenticated.component';
import { LoggedInGuard } from './_general/auth/loggedIn.guard';
import { NotLoggedInGuard } from './_general/auth/notLoggedIn.guard';
import { MineCookieService } from './_general/cookie/cookie.service';
import { FooterComponent } from './_general/footer/footer.component';
import { LoginComponent } from './_general/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { ItemsModule } from './items/items.module';
import { TagsModule } from './tags/tags.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
    StatisticsComponent,
    AuthenticatedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppModule.routes),
    NgbModule.forRoot(),
    ItemsModule,
    TagsModule
  ],
  providers: [
    AuthService,
    MineCookieService,
    NotLoggedInGuard,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  static readonly routes: Routes = [
    // Non-Logged in routes
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [NotLoggedInGuard]
    },

    // Logged in routes
    {
      path: '',
      component: AuthenticatedComponent,
      canActivate: [LoggedInGuard],
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'tags',
          component: TagsModule.routeRootComponent,
          children: TagsModule.routes
        },
        {
          path: '',
          component: ItemsModule.routeRootComponent,
          children: ItemsModule.routes
        }
      ]
    }
  ];

}
