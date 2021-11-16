/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoProfileFormComponent } from './photo-profile-form.component';


const routes: Routes = [
    {
        path: '',
        component: PhotoProfileFormComponent,
        // canActivate: [AuthRequiredGuard],
        data: {
            animation: 'HomePage',
            title: 'Edit photo profile'
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotoProfileFormRoutingModule {

}