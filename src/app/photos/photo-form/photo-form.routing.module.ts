/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { PhotoFormComponent } from './photo-form.component';

const routes: Routes = [
    {
        path: '',
        component: PhotoFormComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
        },
        data: {
          animation: 'HomePage',
          title: 'Add'
        }
      },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotoFormRoutingModule {}