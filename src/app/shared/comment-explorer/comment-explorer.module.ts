import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import {ShowIsLoggedModule} from '../directives/show-is-logged/show-is-logged.module';
import { OverlayModule } from '../overlay/overlay.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentExplorerComponent } from './comment-explorer.component';
import { UxModule } from 'src/app/core/ux/ux-module';
import { DropdownCommentExplorerModule } from '../dropdown-comment-explorer/dropdown-comment-explorer.module';

@NgModule({
  declarations:[
    CommentExplorerComponent
  ],
  exports:[
    CommentExplorerComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        UxModule,
        ShowIsLoggedModule,
        OverlayModule,
        DropdownCommentExplorerModule
    ],
})
export class CommentExplorerModule{}
