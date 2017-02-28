/* tslint:disable:only-arrow-functions */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestOptions, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// authFactory's && authProvider's specification shouldn't be changed
//   because it affects AOT build
export function authFactory (http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    // Config options if you want
    globalHeaders: [{'Content-Type': 'application/json; charset=utf-8'}]
  }), http, options);
}

// Include this in your ngModule providers
export const authProvider = {
  provide: AuthHttp,
  deps: [Http, RequestOptions],
  useFactory: authFactory
};

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    authProvider
  ],
  declarations: []
})
export class AuthModule {
}
