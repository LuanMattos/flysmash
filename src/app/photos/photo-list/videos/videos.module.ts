import { CommonModule } from '@angular/common';
import {NgModule, Pipe} from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideosComponent } from './videos.component';

@NgModule({
  declarations: [
      VideosComponent
  ],
  exports: [
    VideosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class VideosModule{

}
