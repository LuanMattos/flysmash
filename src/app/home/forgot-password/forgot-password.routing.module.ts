/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { ForgotPasswordComponent } from './forgot-password.component';

/** Components */


const routes: Routes = [
    {
        path: '',
        component: ForgotPasswordComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Forgot password'
        },
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ForgotPasswordRoutingModule {

}