import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {PhotoModule} from '../photo/photo.module';
import {CardModule} from '../../shared/card/card.module';
import {DarkenOnHoverModule} from '../../shared/directives/dark-on-hover/darken-on-hover.module';
import {UxModule} from '../../core/ux/ux-module';
import {ShowIsLoggedModule} from '../../shared/directives/show-is-logged/show-is-logged.module';
import {PhotoDetailModule} from '../photo-detail/photo-detail.module';
import {LikeModule} from '../../shared/like/like.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PhotoListExplorerComponent } from './photo-list-explorer.component';
import { VideoModule } from '../video/video.module';
import { PhotoMainModule } from '../photo-main/photo-main.module';


@NgModule({
  declarations: [
    PhotoListExplorerComponent
  ],
  exports: [
    PhotoListExplorerComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    VideoModule,
    CardModule,
    DarkenOnHoverModule,
    UxModule,
    RouterModule,
    ShowIsLoggedModule,
    PhotoDetailModule,
    LikeModule,
    InfiniteScrollModule,
    PhotoMainModule
  ]
})
export class PhotoListExplorerModule{}

