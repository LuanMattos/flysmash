import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {PhotoListComponent} from './photo-list.component';
import {FilterByDescription} from './filter-by-description.pipe';
import {PhotoModule} from '../photo/photo.module';
import {CardModule} from '../../shared/card/card.module';
import {SearchComponent} from './search/search.component';
import {DarkenOnHoverModule} from '../../shared/directives/dark-on-hover/darken-on-hover.module';
import {UxModule} from '../../core/ux/ux-module';
import {ShowIsLoggedModule} from '../../shared/directives/show-is-logged/show-is-logged.module';
import {PhotoDetailModule} from '../photo-detail/photo-detail.module';
import {LikeModule} from '../../shared/like/like.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {SettingProfileComponent} from './setting-profile/setting-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {VmessageModule} from '../../shared/vmessage/vmessage.module';
import {PhotoOwnerOnlyModule} from '../../shared/directives/owner-only/photo-owner-only.module';
import {FollowersComponent} from './followers/followers.component';
import {FollowingComponent} from './following/following.component';
import {ImgOnerrorModule} from '../../shared/directives/img-onerror/img-onerror.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import {DialogSettingComponent} from './setting-profile/dialog/dialog-setting.component';
import { BannerProfileComponent } from './banner-profile/banner-profile.component';
import { PhotoDescriptionModule } from '../photo-description/photo-description.module';
import { VideoModule } from '../video/video.module';
import { StoriesModule } from '../stories/stories.module';
import { BackHistoryModule } from 'src/app/shared/directives/back-history/back-history.module';


@NgModule({
  declarations: [
    PhotoListComponent,
    FilterByDescription,
    SearchComponent,
    SettingProfileComponent,
    FollowersComponent,
    FollowingComponent,
    DialogSettingComponent,
    BannerProfileComponent,
  ],
  exports: [
    SearchComponent
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
        ReactiveFormsModule,
        VmessageModule,
        PhotoOwnerOnlyModule,
        ImgOnerrorModule,
        ImageCropperModule,
        PhotoDescriptionModule,
        StoriesModule,
        BackHistoryModule
    ]
})
export class PhotoListModule{}

