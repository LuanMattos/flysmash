/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { SignUpComponent } from './signup.component';

/** Components */


const routes: Routes = [
    {
        path: '',
        component: SignUpComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Sign Up'
        },
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignupRoutingModule {

}