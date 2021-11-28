import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommentComponent} from './comment.component';
import {ShowIsLoggedModule} from '../directives/show-is-logged/show-is-logged.module';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations:[
    CommentComponent
  ],
  exports:[
    CommentComponent
  ],
    imports: [
        CommonModule,
        ShowIsLoggedModule,
        OverlayModule
    ],
})
export class CommentModule{}
