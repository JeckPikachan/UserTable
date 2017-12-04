import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'signIn', loadChildren: 'app/sign-in/sign-in/sign-in.module#SignInModule'},
  { path: 'main', canActivateChild: [AuthGuardService], children: [
      { path: '', loadChildren: 'app/user-page/user-page/user-page.module#UserPageModule' }
    ]
  },
  { path: 'users', canActivateChild: [AuthGuardService], children: [
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
  providers: [AuthGuardService, AuthService]
})
export class AppRoutingModule {}
