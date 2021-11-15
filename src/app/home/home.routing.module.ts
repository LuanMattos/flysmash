/** System */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../core/auth/auth.guard';

/** Components */
import {HomeComponent} from './home.component';
import {SignInComponent} from './signin/signin.component';
import {SignUpComponent} from './signup/signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: SignInComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Sign In'
        }
      },
      {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Sign Up'
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Forgot password'
        }
      },
    ]
  },

];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class HomeRoutingModule{

}