import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AboutComponent } from './about/about.component';
import { SharedHeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { EditorHeaderComponent } from './editor-header/header.component';
import { LoggerService } from './logger/logger.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    UserMenuComponent,
    AboutComponent,
    SharedHeaderComponent,
    EditorHeaderComponent
  ],
  exports: [
    UserMenuComponent,
    AboutComponent,
    SharedHeaderComponent,
    EditorHeaderComponent
  ],
  providers: [
    LoggerService,
    { provide: ErrorHandler, useClass: LoggerService }
  ]
})
export class SharedModule {
  static readonly aboutComponent = AboutComponent;
}
