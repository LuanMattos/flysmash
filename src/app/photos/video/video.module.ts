import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { VideoComponent } from './video.component';

@NgModule({
  declarations:[
    VideoComponent
  ],
  exports:[
    VideoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class VideoModule{

}
