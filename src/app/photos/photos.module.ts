import {NgModule, Pipe} from '@angular/core';

import {PhotoListModule} from './photo-list/photo-list.module';
import {PhotoFormModule} from './photo-form/photo-form.module';
import {PhotoModule} from './photo/photo.module';
import {PhotoDetailModule} from './photo-detail/photo-detail.module';
import {PhotoListTimelineModule} from './photo-list-timeline/photo-list-timeline.module';
import { PhotoDescriptionModule } from './photo-description/photo-description.module';

@NgModule({
  declarations: [],
  imports: [
    PhotoListModule,
    PhotoFormModule,
    PhotoModule,
    PhotoDetailModule,
    PhotoListTimelineModule,
    PhotoDescriptionModule
  ],
})
export class PhotosModule{

}
