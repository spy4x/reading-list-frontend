import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ItemsModule } from '../items/items.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ItemsModule
  ],
  declarations: [
    DashboardComponent,
    StatisticsComponent
  ]
})
export class DashboardModule {
  static readonly routeRootComponent = DashboardComponent;
}
