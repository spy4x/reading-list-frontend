import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { SharedModule } from '../_shared/shared.module';
import { TagsAddComponent } from './add/add.component';
import { TagsEditComponent } from './edit/edit.component';
import { TagsEditorComponent } from './editor/editor.component';
import { TagsHeaderComponent } from './header/header.component';
import { TagsLineComponent } from './line/line.component';
import { TagsListComponent } from './list/list.component';
import { TagsComponent } from './tags.component';
import { TagsService } from './tags.service';

@NgModule({
  declarations: [
    TagsComponent,
    TagsAddComponent,
    TagsListComponent,
    TagsLineComponent,
    TagsEditComponent,
    TagsEditorComponent,
    TagsHeaderComponent
  ],
  providers: [
    TagsService
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
export class TagsModule {
  static readonly routes: Routes = [
    {path: '', component: TagsListComponent},
    {path: 'add', component: TagsAddComponent},
    {path: ':id', component: TagsEditComponent}
  ];
  static readonly routeRootComponent = TagsComponent;
}
