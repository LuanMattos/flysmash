import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { PhotoMainComponent } from './photo-main.component';
import { SwiperModule } from 'swiper/angular';
import { LikeModule } from 'src/app/shared/like/like.module';
import { CommentModule } from 'src/app/shared/comment/comment.module';
import { ShowIsLoggedModule } from 'src/app/shared/directives/show-is-logged/show-is-logged.module';

@NgModule({
  declarations:[
    PhotoMainComponent
  ],
  exports:[
    PhotoMainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SwiperModule,
    LikeModule,
    CommentModule,
    ShowIsLoggedModule
  ]
})
export class PhotoMainModule{}
