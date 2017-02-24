import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    UserMenuComponent
  ],
  exports: [
    UserMenuComponent
  ]
})
export class SharedModule {
}
