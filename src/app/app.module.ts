/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './_general/auth/auth.service';
import { AuthenticatedComponent } from './_general/auth/authenticated/authenticated.component';
import { LoggedInGuard } from './_general/auth/loggedIn.guard';
import { NotLoggedInGuard } from './_general/auth/notLoggedIn.guard';
import { RLCookieService } from './_general/cookie/cookie.service';
import { FooterComponent } from './_general/footer/footer.component';
import { LoginComponent } from './_general/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { ItemsModule } from './items/items.module';
import { TagsModule } from './tags/tags.module';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UserSignInActionEffect } from './_general/store/user/userSignIn.action';
import { UserSignOutActionEffect } from './_general/store/user/userSignOut.action';
import { ItemAddActionEffect } from './_general/store/items/itemAdd.action';
import { ItemEditActionEffect } from './_general/store/items/itemEdit.action';
import { ItemRemoveActionEffect } from './_general/store/items/itemRemove.action';
import { TagAddActionEffect } from './_general/store/tags/tagAdd.action';
import { TagEditActionEffect } from './_general/store/tags/tagEdit.action';
import { TagRemoveActionEffect } from './_general/store/tags/tagRemove.action';
import { AuthModule } from './_general/auth/auth.module';
import { StoreReducer } from './_general/store/app.reducer';
import { INITIAL_STATE } from './_general/store/app.state';


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
    TagsModule,
    AuthModule,
    StoreModule.provideStore(StoreReducer),

    EffectsModule.run(UserSignInActionEffect),
    EffectsModule.run(UserSignOutActionEffect),

    EffectsModule.run(ItemAddActionEffect),
    EffectsModule.run(ItemEditActionEffect),
    EffectsModule.run(ItemRemoveActionEffect),

    EffectsModule.run(TagAddActionEffect),
    EffectsModule.run(TagEditActionEffect),
    EffectsModule.run(TagRemoveActionEffect),

    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [
    AuthService,
    RLCookieService,
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
