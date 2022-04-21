/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredGuard } from 'src/app/core/auth/auth-required.guard';
import { PostsExplorerResolver } from 'src/app/core/posts/posts.explorer.resolver';
import { PhotoListExplorerComponent } from './photo-list-explorer.component';

const routes: Routes = [
    {
        path: '',
        component: PhotoListExplorerComponent,
        canActivate: [AuthRequiredGuard],
        resolve: {
          posts:PostsExplorerResolver 
        },
        data: {
          title: 'Explore',
          isToExplorer: true
        }
      },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PhotoListExplorerRoutingModule {

}