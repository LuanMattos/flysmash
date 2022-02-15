/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { SupportComponent } from './support.component';

const routes: Routes = [
    {
        path: '',
        component: SupportComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Support'
        }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupportRoutingModule {

}