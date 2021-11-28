import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {PhotoModule} from '../photo/photo.module';
import {CardModule} from '../../shared/card/card.module';
import {DarkenOnHoverModule} from '../../shared/directives/dark-on-hover/darken-on-hover.module';
import {UxModule} from '../../core/ux/ux-module';
import {ShowIsLoggedModule} from '../../shared/directives/show-is-logged/show-is-logged.module';
import {LikeModule} from '../../shared/like/like.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StoriesModule } from '../stories/stories.module';
import { PhotoListFeedComponent } from './photo-list-feed.component';
import { ShimmerLoadingModule } from 'src/app/shared/shimmer-loading/shimmer-loading.module';
import { DropdownModule } from 'src/app/photos/photo-list-feed/dropdown/dropdown.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { PhotoListFeedRoutingModule } from './photo-list-feed.routing.module';
import { PhotoListModule } from '../photo-list/photo-list.module';
import { OverlayModule } from 'src/app/shared/overlay/overlay.module';
import { CommentModule } from 'src/app/shared/comment/comment.module';


@NgModule({
  declarations: [
    PhotoListFeedComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    PhotoModule,
    CardModule,
    DarkenOnHoverModule,
    UxModule,
    RouterModule,
    ShowIsLoggedModule,
    LikeModule,
    InfiniteScrollModule,
    StoriesModule,
    ShimmerLoadingModule,
    DropdownModule,
    ModalModule,
    PhotoListFeedRoutingModule,
    OverlayModule,
    CommentModule
  ]
})
export class PhotoListFeedModule{}

