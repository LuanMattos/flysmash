import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {PhotoDetailComponent} from './photo-detail.component';
import {PhotoModule} from '../photo/photo.module';
import {PhotoCommentsComponent} from './photo-comments/photo-comments.component';
import {VmessageModule} from '../../shared/vmessage/vmessage.module';
import {UxModule} from '../../core/ux/ux-module';
import {PhotoOwnerOnlyModule} from '../../shared/directives/owner-only/photo-owner-only.module';
import {ShowIsLoggedModule} from '../../shared/directives/show-is-logged/show-is-logged.module';
import {CommentsFormComponent} from '../comments/comments-form.component';
import {LikeModule} from '../../shared/like/like.module';
import { PhotoDescriptionModule } from '../photo-description/photo-description.module';
import { VideosModule } from '../photo-list/videos/videos.module';
import { PhotoCardHeaderComponent } from '../photo-card-header/photo-card-header.component';


@NgModule({
  declarations: [
    PhotoDetailComponent,
    PhotoCommentsComponent,
    CommentsFormComponent,
    PhotoCardHeaderComponent
  ],
  exports: [
    PhotoDetailComponent,
    PhotoCommentsComponent,
    CommentsFormComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    VmessageModule,
    UxModule,
    PhotoOwnerOnlyModule,
    ShowIsLoggedModule,
    LikeModule,
    PhotoDescriptionModule,
    VideosModule,
  ]
})
export class PhotoDetailModule{}
