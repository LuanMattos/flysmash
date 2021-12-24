/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { FollowersComponent } from './followers.component';

const routes: Routes = [
    {
        path: '',
        component: FollowersComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
            // follower: FollowerResolver
        },
        data: {
          title: 'Followers'
        }
      },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FollowersRoutingModule {}