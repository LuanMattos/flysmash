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
import { PhotoListExplorerComponent } from './photo-list-explorer.component';
import { VideoModule } from '../video/video.module';
import { PhotoMainModule } from '../photo-main/photo-main.module';
import { PhotoListRoutingModule } from './photo-list.routing.module';
import { QuicklinkModule } from 'ngx-quicklink';


@NgModule({
  declarations: [
    PhotoListExplorerComponent
  ],
  exports: [
    PhotoListExplorerComponent,
    QuicklinkModule
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
    LikeModule,
    InfiniteScrollModule,
    PhotoMainModule,
    PhotoListRoutingModule
  ]
})
export class PhotoListExplorerModule{}

