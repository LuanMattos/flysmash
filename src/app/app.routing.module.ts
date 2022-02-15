/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Class */
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
    data: {
      title: ''
    }
  },

  {
    path: 'login',
    loadChildren: () => import('src/app/home/signin/signin.module').then(m => m.SigninModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('src/app/home/signup/signup.module').then(m => m.SignupModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('src/app/home/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: 'edit-photo-profile',
    loadChildren: () => import('src/app/photos/photo-list/photo-profile-form/photo-profile-form.module').then(m => m.PhotoProfileFormModule),
  },
  {
    path: 'search',
    loadChildren: () => import('src/app/core/search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'ar',
    loadChildren: () => import('src/app/ar/ar.module').then(m => m.ArModule),
  },
  {
    path: 'feed',
    loadChildren: () => import('src/app/photos/photo-list-feed/photo-list-feed.module').then(m => m.PhotoListFeedModule),
  },
  {
    path: 'add',
    loadChildren: () => import('src/app/photos/photo-form/photo-form.module').then(m => m.PhotoFormModule),
  },
  {
    path: 'add-stories',
    loadChildren: () => import('src/app/photos/stories-form/stories-form.module').then(m => m.StoriesFormModule),
  },
  {
    path: 'confirmation',
    loadChildren: () => import('src/app/confirmation/confirmation.module').then(m => m.ConfirmationModule),
  },
  {
    path: 'explore',
    loadChildren: () => import('src/app/photos/photo-list-explorer/photo-list-explorer.module').then(m => m.PhotoListExplorerModule),
  },
  {
    path: 'about',
    loadChildren: () => import('src/app/home/footer/about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'privacy',
    loadChildren: () => import('src/app/home/footer/privacy/privacy.module').then(m => m.PrivacyModule),
  },
  {
    path: 'terms',
    loadChildren: () => import('src/app/home/footer/terms/terms.module').then(m => m.TermsModule),
  },
  {
    path: 'support',
    loadChildren: () => import('src/app/home/support/support.module').then(m => m.SupportModule),
  },
  
  {
    path: 'change-password/:code',
    loadChildren: () => import('src/app/change-password/change-password.module').then(m => m.ChangePasswordModule),
  },  

  {
    path: 'followers',
    loadChildren: () => import('src/app/photos/photo-list/followers/followers.module').then(m => m.FollowersModule),
  },
  {
    path: 'followings',
    loadChildren: () => import('src/app/photos/photo-list/following/following.module').then(m => m.FollowingModule),
  },

  {
    path: 'chat',
    loadChildren: () => import('src/app/photos/chat/chat.module').then(m => m.ChatModule),
  },
  {
    path: 'notification',
    loadChildren: () => import('src/app/photos/notification/notification.module').then(m => m.NotificationModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('src/app/photos/photo-list/setting-profile/setting-profile.module').then(m => m.SettingProfileModule),
  },

  {
    path: '',
    loadChildren: () => import('src/app/photos/photo-list/photo-list.module').then(m => m.PhotoListModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Page not-found'
    }
  },

  // {
  //   path: 'comment/:photoId',
  //   component: PhotoCommentsComponent,
  //   canActivate: [AuthRequiredGuard],
  //   data: {
  //     animation: 'HomePage',
  //     title: 'Comments Photo',
  //     isPhotoComments: true
  //   },
  // },
  {
    path: '**',
    redirectTo: 'not-found'
  },

];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: QuicklinkStrategy
    // useHash: true
    ,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {

}
