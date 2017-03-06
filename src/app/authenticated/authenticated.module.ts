import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { AuthenticatedComponent } from './authenticated.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ItemsModule } from './items/items.module';
import { TagsModule } from './tags/tags.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    ItemsModule,
    TagsModule,
    SharedModule
  ],
  declarations: [
    FooterComponent,
    AuthenticatedComponent
  ]
})
export class AuthenticatedModule {
  static readonly routeRootComponent = AuthenticatedComponent;
  static readonly routes: Routes = [
    {
      path: '',
      component: ItemsModule.routeRootComponent,
      children: ItemsModule.routes
    },
    {
      path: 'dashboard',
      component: DashboardModule.routeRootComponent
    },
    {
      path: 'tags',
      component: TagsModule.routeRootComponent,
      children: TagsModule.routes
    },
    {
      path: 'about',
      component: SharedModule.aboutComponent
    }
  ];
}
