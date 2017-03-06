import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from '../_shared/about/about.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    PublicComponent,
    LoginComponent
  ]
})
export class PublicModule {
  static readonly routeRootComponent = PublicComponent;
  static readonly routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'login'
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'about',
      component: AboutComponent
    }
  ];
}
