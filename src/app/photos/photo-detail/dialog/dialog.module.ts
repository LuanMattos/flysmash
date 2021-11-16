import {NgModule} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import {PhotoOwnerOnlyModule} from '../../../shared/directives/owner-only/photo-owner-only.module';
import {PhotoModule} from '../../photo/photo.module';
import {LikeModule} from '../../../shared/like/like.module';
import {CardModule} from '../../../shared/card/card.module';
import {DarkenOnHoverModule} from '../../../shared/directives/dark-on-hover/darken-on-hover.module';
import {ShowIsLoggedModule} from '../../../shared/directives/show-is-logged/show-is-logged.module';
import {UxModule} from '../../../core/ux/ux-module';
@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    PhotoModule,
    LikeModule,
    CardModule,
    DarkenOnHoverModule,
    RouterModule,
    ShowIsLoggedModule,
    UxModule,
    PhotoOwnerOnlyModule
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule{

}
