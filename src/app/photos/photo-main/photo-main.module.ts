import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { PhotoMainComponent } from './photo-main.component';
import { SwiperModule } from 'swiper/angular';
import { LikeModule } from 'src/app/shared/like/like.module';
import { ShowIsLoggedModule } from 'src/app/shared/directives/show-is-logged/show-is-logged.module';
import { OverlayModule } from 'src/app/shared/overlay/overlay.module';
import { RouterModule } from '@angular/router';
import { CommentExplorerModule } from 'src/app/shared/comment-explorer/comment-explorer.module';


@NgModule({
  declarations:[
    PhotoMainComponent
  ],
  exports:[
    PhotoMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SwiperModule,
    LikeModule,
    ShowIsLoggedModule,
    OverlayModule,
    CommentExplorerModule
  ]
})
export class PhotoMainModule{}
