/** System */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Class */
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthRequiredGuard } from './core/auth/auth-required.guard';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink';


/** Resolvers */
import { SettingProfileComponent } from './photos/photo-list/setting-profile/setting-profile.component';
import { UserResolver } from './core/user/user.resolver';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FollowersComponent } from './photos/photo-list/followers/followers.component';
import { FollowingComponent } from './photos/photo-list/following/following.component';
import { AboutComponent } from './home/footer/about/about.component';
import { PrivacyComponent } from './home/footer/privacy/privacy.component';
import { TermsComponent } from './home/footer/terms/terms.component';
import { PhotoCommentsComponent } from './photos/photo-detail/photo-comments/photo-comments.component';
import { PhotoListExplorerComponent } from './photos/photo-list-explorer/photo-list-explorer.component';
import { ChatComponent } from './photos/chat/chat.component';
import { NotificationComponent } from './photos/notification/notification.component';


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
    path: 'feed',
    loadChildren: () => import('src/app/photos/photo-list-feed/photo-list-feed.module').then(m => m.PhotoListFeedModule),
  },
  {
    path: 'add',
    loadChildren: () => import('src/app/photos/photo-form/photo-form.module').then(m => m.PhotoFormModule),
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
    path: 'change-password/:code',
    component: ChangePasswordComponent,
    data: {
      title: 'Change password'
    }
  },
  {
    path: ':userName/followers',
    component: FollowersComponent,
    canActivate: [AuthRequiredGuard],
    resolve: {
      // follower: FollowerResolver
    },
    data: {
      title: 'Followers'
    }
  },
  {
    path: ':userName/followings',
    component: FollowingComponent,
    canActivate: [AuthRequiredGuard],
    resolve: {
      // following: FollowingResolver
    },
    data: {
      title: 'Followers'
    }
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthRequiredGuard],
    resolve: {
      // following: FollowingResolver
    },
    data: {
      title: 'Chat'
    }
  },
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [AuthRequiredGuard],
    resolve: {
      // following: FollowingResolver
    },
    data: {
      title: 'Notification'
    }
  },
  {
    path: 'setting',
    component: SettingProfileComponent,
    canActivate: [AuthRequiredGuard],
    resolve: {
      user: UserResolver
    },
    data: {
      animation: 'HomePage',
      title: 'Setting Profile'
    },
  },
 
  {
    path: ':userName',
    component: PhotoListComponent,
    resolve: {
      user: UserResolver
      // photos: PhotoListResolver,
    },
    data: {
      animation: 'AboutPage',
      title: 'Timeline',
      isProfile: true
    }
  },
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
    })],
  exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {

}
