import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { PostCardComponent } from './post-card.component';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { OverlayModule } from 'src/app/shared/overlay/overlay.module';
import { CommentModule } from 'src/app/shared/comment/comment.module';
import { LikeModule } from 'src/app/shared/like/like.module';
import { DropdownModule } from '../dropdown/dropdown.module';


@NgModule({
  declarations: [
    PostCardComponent
  ],
  exports: [
    PostCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    OverlayModule,
    CommentModule,
    LikeModule,
    DropdownModule,
  ]
})
export class PostCardModule{}

