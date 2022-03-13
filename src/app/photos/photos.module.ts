import {NgModule, Pipe} from '@angular/core';

import {PhotoModule} from './photo/photo.module';
import { PhotoDescriptionModule } from './photo-description/photo-description.module';
import { VideoModule } from './video/video.module';
import { StoriesModule } from './stories/stories.module';
import { PhotoMainModule } from './photo-main/photo-main.module';
import { BackHistoryModule } from '../shared/directives/back-history/back-history.module';
import { DropdownModule } from './photo-list-feed/dropdown/dropdown.module';

@NgModule({
  declarations: [],
  imports: [
    PhotoModule,
    VideoModule,
    PhotoDescriptionModule,
    StoriesModule,
    PhotoMainModule,
    BackHistoryModule,
    DropdownModule,
  ],
})
export class PhotosModule{

}
