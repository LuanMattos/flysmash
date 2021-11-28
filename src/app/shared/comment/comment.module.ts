import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommentComponent} from './comment.component';
import {ShowIsLoggedModule} from '../directives/show-is-logged/show-is-logged.module';
import { OverlayModule } from '../overlay/overlay.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    CommentComponent
  ],
  exports:[
    CommentComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ShowIsLoggedModule,
        OverlayModule
    ],
})
export class CommentModule{}
