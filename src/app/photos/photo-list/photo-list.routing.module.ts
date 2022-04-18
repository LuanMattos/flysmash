import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { PostsResolver } from 'src/app/core/posts/posts.resolver';
import { StoriesResolver } from 'src/app/core/stories/stories.resolver';
import { UserResolver } from 'src/app/core/user/user.resolver';
import { PhotoListComponent } from './photo-list.component';

const routes: Routes = [
    {
        path: ':userName',
        component: PhotoListComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
            user: UserResolver,
            stories:StoriesResolver,
            posts: PostsResolver
        },
        data: {
            animation: 'AboutPage',
            title: 'Timeline',
          }
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotoListRoutingModule {

}