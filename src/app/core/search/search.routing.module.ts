/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from '../auth/auth-required.guard';
import { SearchComponent } from './search.component';


const routes: Routes = [
    {
        path: '',
        component: SearchComponent,
        canActivate: [AuthRequiredGuard],
        data: {
            animation: 'HomePage',
            title: 'Search'
        },
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchRoutingModule { }