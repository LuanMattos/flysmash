import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { NotificationComponent } from './notification.component';

const routes: Routes = [
    {
        path: '',
        component: NotificationComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
            // follower: FollowingResolver
        },
        data: {
            title: 'Notification'
        }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationRoutingModule {

}