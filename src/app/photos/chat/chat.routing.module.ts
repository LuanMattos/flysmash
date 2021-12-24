import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { ChatComponent } from './chat.component';

const routes: Routes = [
    {
        path: '',
        component: ChatComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
            // follower: FollowingResolver
        },
        data: {
            title: 'Chat'
        }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {

}