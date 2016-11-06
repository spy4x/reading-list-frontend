import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemsAddComponent } from './items/add/add.component';
import { ItemsListComponent } from './items/list/list.component';
import { ItemsItemComponent } from './items/item/item.component';
import { HeaderComponent } from './header/header.component';
import { ItemsService } from './items/items.service';

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
    MomentModule
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
