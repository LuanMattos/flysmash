import {NgModule, Pipe} from '@angular/core';

import {PhotoListModule} from './photo-list/photo-list.module';
import {PhotoFormModule} from './photo-form/photo-form.module';
import {PhotoModule} from './photo/photo.module';
import {PhotoDetailModule} from './photo-detail/photo-detail.module';
import { PhotoDescriptionModule } from './photo-description/photo-description.module';
import { VideoModule } from './video/video.module';
import { PhotoListFeedModule } from './photo-list-feed/photo-list-feed.module';
import { PhotoListExplorerModule } from './photo-list-explorer/photo-list-explorer.module';

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
    PhotoDescriptionModule
  ],
})
export class PhotosModule{

}
