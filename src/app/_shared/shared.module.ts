import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AboutComponent } from './about/about.component';
import { SharedHeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule
  ],
  declarations: [
    UserMenuComponent,
    AboutComponent,
    SharedHeaderComponent
  ],
  exports: [
    UserMenuComponent,
    AboutComponent,
    SharedHeaderComponent
  ]
})
export class SharedModule {
}
