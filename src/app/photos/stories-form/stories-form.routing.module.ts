/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { StoriesFormComponent } from './stories-form.component';

const routes: Routes = [
    {
        path: '',
        component: StoriesFormComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
        },
        data: {
          animation: 'HomePage',
          title: 'Add Stories'
        }
      },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoriesFormRoutingModule {}