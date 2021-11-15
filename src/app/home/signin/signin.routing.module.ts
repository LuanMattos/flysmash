/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { SignInComponent } from './signin.component';

/** Components */


const routes: Routes = [
    {
        path: '',
        component: SignInComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Sign In'
        },
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SigninRoutingModule {

}