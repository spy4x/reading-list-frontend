import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_general/header/header.component';
import { ItemsService } from './items/items.service';
import { AuthService } from './_general/auth/auth.service';
import { LoggedInGuard } from './_general/auth/loggedIn.guard';
import { NotLoggedInGuard } from './_general/auth/notLoggedIn.guard';
import { LoginComponent } from './_general/login/login.component';
import { FooterComponent } from './_general/footer/footer.component';
import { TagsComponent } from './tags/tags.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { ItemsModule } from './items/items.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    TagsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppModule.routes),
    NgbModule.forRoot(),
    ItemsModule
  ],
  providers: [
    ItemsService,
    AuthService,
    CookieService,
    NotLoggedInGuard,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  static readonly routes: Routes = [
    // Non-Logged in routes
    {
      path: '',
      component: LoginComponent,
      canActivate: [NotLoggedInGuard]
    },

    // Logged in routes
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [LoggedInGuard]
    },
    {
      path: 'items',
      component: ItemsModule.routeRootComponent,
      canActivate: [LoggedInGuard],
      children: ItemsModule.routes
    },
    {
      path: 'tags',
      component: TagsComponent,
      canActivate: [LoggedInGuard]
    }
  ];

}
