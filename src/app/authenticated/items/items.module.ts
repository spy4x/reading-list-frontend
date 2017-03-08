import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
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
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_shared/shared.module';

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
    FormsModule,
    MomentModule,
    NgbModule,
    HttpModule,
    CommonModule,
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
