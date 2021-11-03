import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {UxModule} from '../../core/ux/ux-module';
import {ShowIsLoggedModule} from '../../shared/directives/show-is-logged/show-is-logged.module';
import { StoriesComponent } from './stories.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    StoriesComponent
  ],
  exports: [
    StoriesComponent
  ],
  imports: [
    CommonModule,
    UxModule,
    RouterModule,
    ShowIsLoggedModule,
    SwiperModule
  ]
})
export class StoriesModule{}

