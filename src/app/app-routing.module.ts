import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';
import {CONSTS} from "./CONSTS";
import {Page404Component} from "./page-404/page-404.component";
import {ErrorGuardService} from "./error-guard.service";

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: '404', component: Page404Component, canActivate: [ErrorGuardService]},
  { path: 'signIn', loadChildren: 'app/sign-in/sign-in/sign-in.module#SignInModule'},
  { path: 'main', canActivateChild: [AuthGuardService], data: [CONSTS.ROLE_USER], children: [
      { path: '', loadChildren: 'app/user-page/user-page/user-page.module#UserPageModule' }
    ]
  },
  { path: 'users', canActivateChild: [AuthGuardService], data: [CONSTS.ROLE_ADMIN], children: [
      { path: '', loadChildren: 'app/users/users/users.module#UsersModule' },
      { path: 'addUser', loadChildren: 'app/add-user/add-user/add-user.module#AddUserModule' },
      { path: 'detail/:login', loadChildren: 'app/user-detail/user-detail/user-detail.module#UserDetailModule'}
      ]
  }
];



export const appRoutingProviders: any[] = [

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true})],
  exports: [ RouterModule ],
  providers: [AuthGuardService, AuthService, ErrorGuardService]
})
export class AppRoutingModule {}
