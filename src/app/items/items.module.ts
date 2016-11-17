import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsComponent } from './items.component';
import { ItemsAllComponent } from './all/all.component';
import { ItemsListComponent } from './list/list.component';
import { ItemsItemComponent } from './item/item.component';
import { ItemsReadTodayComponent } from './read-today/read-today.component';
import { ItemsAddComponent } from './add/add.component';
import { ItemsEditComponent } from './edit/edit.component';
import { ItemsEditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsAddComponent,
    ItemsListComponent,
    ItemsItemComponent,
    ItemsAllComponent,
    ItemsReadTodayComponent,
    ItemsEditComponent,
    ItemsEditorComponent,
  ],
  exports: [
    ItemsReadTodayComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MomentModule,
    NgbModule,
    HttpModule,
    BrowserModule
  ]
})
export class ItemsModule {
  static readonly routes: Routes = [
    {path: '', component: ItemsAllComponent},
    {path: 'add', component: ItemsAddComponent}
  ];
  static readonly routeRootComponent = ItemsComponent;
}
