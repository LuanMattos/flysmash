import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from './auth/request.interceptor';
import { AlertModule } from '../shared/alert/alert.module';
import { UxModule } from './ux/ux-module';
import { ShowIsLoggedModule } from '../shared/directives/show-is-logged/show-is-logged.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DialogModule } from '../photos/photo-detail/dialog/dialog.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BackHistoryModule } from '../shared/directives/back-history/back-history.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    AlertModule,
    UxModule,
    ShowIsLoggedModule,
    InfiniteScrollModule,
    DialogModule,
    ReactiveFormsModule,
    BackHistoryModule
  ],
  exports: [
  ],
})
export class CoreModule { }
