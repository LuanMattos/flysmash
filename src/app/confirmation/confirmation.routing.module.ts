/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { ConfirmationComponent } from './confirmation.component';

const routes: Routes = [
    {
        path: '',
        component: ConfirmationComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Confirmation account'
        }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfirmationRoutingModule {

}