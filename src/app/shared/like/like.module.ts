import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LikeComponent} from './like.component';
import {ShowIsLoggedModule} from '../directives/show-is-logged/show-is-logged.module';

@NgModule({
  declarations:[
    LikeComponent
  ],
  exports:[
    LikeComponent
  ],
    imports: [
        CommonModule,
        ShowIsLoggedModule
    ],
})
export class LikeModule{}
