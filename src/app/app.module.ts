import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
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

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemsAddComponent,
    ItemsListComponent,
    ItemsItemComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    ReactiveFormsModule,
    MomentModule,
    HttpModule
  ],
  providers: [ItemsService, AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
