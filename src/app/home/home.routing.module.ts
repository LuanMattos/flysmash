/** System */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../core/auth/auth.guard';

/** Components */
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('src/app/home/signin/signin.module').then(m => m.SigninModule),
      },
      {
        path: 'signup',
        loadChildren: () => import('src/app/home/signup/signup.module').then(m => m.SignupModule),
      },
      // {
      //   path: 'login',
      //   component: SignInComponent,
      //   canActivate: [AuthGuard],
      //   data: {
      //     title: 'Sign In'
      //   }
      // },
      // {
      //   path: 'signup',
      //   component: SignUpComponent,
      //   canActivate: [AuthGuard],
      //   data: {
      //     title: 'Sign Up'
      //   }
      // },
      // {
      //   path: 'forgot-password',
      //   component: ForgotPasswordComponent,
      //   data: {
      //     title: 'Forgot password'
      //   }
      // },
    ]
  },

];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class HomeRoutingModule{

}