import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemsAddComponent } from './items/add/add.component';
import { ItemsListComponent } from './items/list/list.component';
import { ItemsItemComponent } from './items/item/item.component';
import { HeaderComponent } from './header/header.component';
import { ItemsService } from './items/items.service';
import { AuthService } from './auth/auth.service';
import { LoggedInGuard } from './auth/loggedIn.guard';
import { NotLoggedInGuard } from './auth/notLoggedIn.guard';
import { LoginComponent } from './auth/login/login.component';


export const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [NotLoggedInGuard]},
  {path: 'items', component: ItemsComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemsAddComponent,
    ItemsListComponent,
    ItemsItemComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    ReactiveFormsModule,
    MomentModule,
    HttpModule,
    RouterModule.forRoot(routes)
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
}
