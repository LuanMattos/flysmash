import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import {CommentComponent} from './comment.component';
import {ShowIsLoggedModule} from '../directives/show-is-logged/show-is-logged.module';
import { OverlayModule } from '../overlay/overlay.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownCommentModule } from '../dropdown-comment/dropdown-comment.module';

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
        RouterModule,
        FormsModule,
        ShowIsLoggedModule,
        OverlayModule,
        DropdownCommentModule,
        ShowIsLoggedModule
    ],
})
export class CommentModule{}
