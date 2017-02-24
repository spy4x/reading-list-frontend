import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { SharedModule } from '../_shared/shared.module';
import { ItemsAddComponent } from './add/add.component';
import { ItemsAllComponent } from './all/all.component';
import { ItemsEditComponent } from './edit/edit.component';
import { ItemsEditorComponent } from './editor/editor.component';
import { ItemsHeaderComponent } from './header/header.component';
import { ItemsComponent } from './items.component';
import { ItemsService } from './items.service';
import { ItemsLineComponent } from './line/line.component';
import { ItemsListComponent } from './list/list.component';
import { ItemsReadTodayComponent } from './read-today/read-today.component';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsAddComponent,
    ItemsListComponent,
    ItemsLineComponent,
    ItemsAllComponent,
    ItemsReadTodayComponent,
    ItemsEditComponent,
    ItemsEditorComponent,
    ItemsHeaderComponent
  ],
  exports: [
    ItemsReadTodayComponent,
    ItemsHeaderComponent
  ],
  providers: [
    ItemsService
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MomentModule,
    NgbModule,
    HttpModule,
    BrowserModule,
    SharedModule
  ]
})
export class ItemsModule {
  static readonly routes: Routes = [
    {path: '', component: ItemsAllComponent},
    {path: 'items/add', component: ItemsAddComponent},
    {path: 'items/:id', component: ItemsEditComponent}
  ];
  static readonly routeRootComponent = ItemsComponent;
}
