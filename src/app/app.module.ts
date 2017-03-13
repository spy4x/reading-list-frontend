/* tslint:disable:max-line-length */
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

import { LoggedInGuard } from './_general/auth/loggedIn.guard';
import { NotLoggedInGuard } from './_general/auth/notLoggedIn.guard';
import { RLCookieService } from './_general/cookie/cookie.service';
import { AppComponent } from './app.component';
import { AuthModule } from './_general/auth/auth.module';
import { StoreReducer } from './_general/store/app.reducer';
import { PublicModule } from './public/public.module';
import { AuthenticatedModule } from './authenticated/authenticated.module';
import { OpenGraphService } from './_general/openGraph/open-graph.service';
import { SharedModule } from './_shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppModule.routes),
    NgbModule.forRoot(),
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
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    AuthModule,
    PublicModule,
    AuthenticatedModule,
    SharedModule
  ],
  providers: [
    RLCookieService,
    NotLoggedInGuard,
    LoggedInGuard,
    OpenGraphService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  static readonly routes: Routes = [
    {
      path: 'public',
      component: PublicModule.routeRootComponent,
      canActivate: [NotLoggedInGuard],
      children: PublicModule.routes
    },

    {
      path: '',
      component: AuthenticatedModule.routeRootComponent,
      canActivate: [LoggedInGuard],
      children: AuthenticatedModule.routes
    },

    // Fallback
    {
      path: '**',
      redirectTo: ''
    }
  ];

}
