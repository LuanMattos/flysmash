import {NgModule, Pipe} from '@angular/core';

import {PhotoListModule} from './photo-list/photo-list.module';
import {PhotoFormModule} from './photo-form/photo-form.module';
import {PhotoModule} from './photo/photo.module';
import {PhotoDetailModule} from './photo-detail/photo-detail.module';
import { PhotoDescriptionModule } from './photo-description/photo-description.module';
import { VideoModule } from './video/video.module';
import { PhotoListFeedModule } from './photo-list-feed/photo-list-feed.module';
import { PhotoListExplorerModule } from './photo-list-explorer/photo-list-explorer.module';
import { ChatModule } from './chat/chat.module';
import { StoriesModule } from './stories/stories.module';
import { NotificationModule } from './notification/notification.module';
import { PhotoMainModule } from './photo-main/photo-main.module';
import { BackHistoryModule } from '../shared/directives/back-history/back-history.module';
import { DropdownModule } from './photo-list-feed/dropdown/dropdown.module';

@NgModule({
  declarations: [],
  imports: [
    PhotoListModule,
    PhotoFormModule,
    PhotoModule,
    VideoModule,
    PhotoDetailModule,
    PhotoListFeedModule,
    PhotoListExplorerModule,
    PhotoDescriptionModule,
    ChatModule,
    StoriesModule,
    NotificationModule,
    PhotoMainModule,
    BackHistoryModule,
    DropdownModule
  ],
})
export class PhotosModule{

}
