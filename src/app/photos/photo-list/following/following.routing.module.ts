/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { FollowingComponent } from './following.component';

const routes: Routes = [
    {
        path: '',
        component: FollowingComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
            // follower: FollowingResolver
        },
        data: {
          title: 'Following'
        }
      },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FollowingRoutingModule {}