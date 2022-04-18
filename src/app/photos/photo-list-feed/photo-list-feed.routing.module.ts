/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { PostsFeedResolver } from 'src/app/core/posts/posts-feed.resolver';
import { StoriesFeedResolver } from 'src/app/core/stories/stories-feed.resolver';
import { UserResolver } from 'src/app/core/user/user.resolver';
import { PhotoListFeedComponent } from './photo-list-feed.component';


const routes: Routes = [
  {
    path: '',
    component: PhotoListFeedComponent,
    canActivate: [AuthRequiredGuard],
    resolve: {
      // photos: PhotoListFeedResolver,
      user: UserResolver,
      stories:StoriesFeedResolver,
      posts: PostsFeedResolver
    },
    data: {
      title: 'Feed',
    }
  },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotoListFeedRoutingModule {

}