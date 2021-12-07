/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArComponent } from './ar.component';


const routes: Routes = [
    {
        path: '',
        component: ArComponent,
        // canActivate: [AuthRequiredGuard],
        data: {
            animation: 'HomePage',
            title: 'Augmented reality'
        },
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArRoutingModule { }