/** System */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

/** Class */
import {PhotoListComponent} from './photos/photo-list/photo-list.component';
import {PhotoFormComponent} from './photos/photo-form/photo-form.component';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {AuthRequiredGuard} from './core/auth/auth-required.guard';


/** Resolvers */
import {PhotoDetailComponent} from './photos/photo-detail/photo-detail.component';
import {SettingProfileComponent} from './photos/photo-list/setting-profile/setting-profile.component';
import {UserResolver} from './core/user/user.resolver';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {FollowersComponent} from './photos/photo-list/followers/followers.component';
import {FollowerResolver} from './core/follower/follower.resolver';
import {FollowingComponent} from './photos/photo-list/following/following.component';
import {FollowingResolver} from './core/following/following.resolver';
import {AboutComponent} from './home/footer/about/about.component';
import {PrivacyComponent} from './home/footer/privacy/privacy.component';
import {TermsComponent} from './home/footer/terms/terms.component';
import {SearchComponent} from './core/search/search.component';
import { PhotoCommentsComponent } from './photos/photo-detail/photo-comments/photo-comments.component';
import { SignInComponent } from './home/signin/signin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SignUpComponent } from './home/signup/signup.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { PhotoListExplorerComponent } from './photos/photo-list-explorer/photo-list-explorer.component';
import { PhotoListFeedComponent } from './photos/photo-list-feed/photo-list-feed.component';
import { ChatComponent } from './photos/chat/chat.component';


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
    component: SignInComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Sign In'
    }
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: {
      title: 'Sign Up'
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      animation: 'HomePage',
      title: 'Search user'
    },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot password'
    }
  },
  {
    // path: 'timeline/:userName',
    path: 'feed',
    component: PhotoListFeedComponent,
    // canActivate: [AuthRequiredGuard],
    resolve: {
      // photos: PhotoListTimelineResolver,
      // user: UserResolver
    },
    data: {
      animation: 'AboutPage',
      title: 'Timeline',
      isTimeline: true
    }
  },
  {
    path: 'add',
    component: PhotoFormComponent,
    // canActivate: [AuthRequiredGuard],
    resolve: {
      // user: UserResolver
    },
    data: {
      animation: 'HomePage',
      title: 'Add Photo'
    }
  },
  {
    path: 'photo/:photoId',
    component: PhotoDetailComponent,
    data: {
      animation: 'HomePage',
      title: 'Detail Photo',
      isDetail: true
    },
  },
  {
    path: 'comment/:photoId',
    component: PhotoCommentsComponent,
    data: {
      animation: 'HomePage',
      title: 'Comments Photo',
      isPhotoComments: true
    },
  },
  
  {
    path: 'confirmation/:userName',
    component: ConfirmationComponent,
    data: {
      title: 'Confirmation account'
    }
  }, {
    path: 'change-password/:code',
    component: ChangePasswordComponent,
    data: {
      title: 'Change'
    }
  },
  {
    path: 'explore',
    component: PhotoListExplorerComponent,
    // canActivate: [AuthRequiredGuard],
    resolve: {
      // photos: 
    },
    data: {
      title: 'Explorer Photos Circle',
      isToExplorer: true
    }
  }, 
  {
    path: ':userName/followers',
    component: FollowersComponent,
    // resolve: {
    //   user: UserResolver,
    //   follower: FollowerResolver
    // },
    data: {
      title: 'Followers'
    }
  }, 
  {
    path: ':userName/followings',
    component: FollowingComponent,
    // resolve: {
    //   user: UserResolver,
    //   following: FollowingResolver
    // },
    data: {
      title: 'Followers'
    }
  }, 
  {
    path: 'chat',
    component: ChatComponent,
    // resolve: {
    //   user: UserResolver,
    //   following: FollowingResolver
    // },
    data: {
      title: 'Chat'
    }
  }, 
  {
    path: 'setting',
    component: SettingProfileComponent,
    // canActivate: [AuthRequiredGuard],
    resolve: {
      // user: UserResolver
    },
    data: {
      animation: 'HomePage',
      title: 'Setting Profile'
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About'
    }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: {
      title: 'Privacy'
    }
  }, {
    path: 'terms',
    component: TermsComponent,
    data: {
      title: 'Terms and Condition'
    }
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Page not-found'
    }
  },

  {
    path: ':userName',
    component: PhotoListComponent,
    resolve: {
      // photos: PhotoListResolver,
      // user: UserResolver
    },
    data: {
      animation: 'AboutPage',
      title: 'Timeline',
      isProfile:true
    }
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
