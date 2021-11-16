/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation.component';

const routes: Routes = [
    {
        path: '',
        component: ConfirmationComponent,
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