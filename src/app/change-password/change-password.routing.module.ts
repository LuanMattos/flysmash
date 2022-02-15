/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { ChangePasswordComponent } from './change-password.component';

const routes: Routes = [
    {
        path: '',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Change password'
        }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangePasswordRoutingModule {

}