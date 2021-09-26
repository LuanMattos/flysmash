import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {HeaderComponent} from './header/header.component';
import {RequestInterceptor} from './auth/request.interceptor';
import {AlertModule} from '../shared/alert/alert.module';
import {PhotoListModule} from '../photos/photo-list/photo-list.module';
import {UxModule} from './ux/ux-module';
import {ShowIsLoggedModule} from '../shared/directives/show-is-logged/show-is-logged.module';
import {AboutComponent} from '../home/footer/about/about.component';
import {PrivacyComponent} from '../home/footer/privacy/privacy.component';
import {TermsComponent} from '../home/footer/terms/terms.component';
import {SearchComponent} from './search/search.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {DialogModule} from '../photos/photo-detail/dialog/dialog.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BackHistoryModule } from '../shared/directives/back-history/back-history.module';


@NgModule({
  declarations: [
    HeaderComponent,
    AboutComponent,
    SidebarComponent,
    PrivacyComponent,
    TermsComponent,
    SearchComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        PhotoListModule,
        UxModule,
        ShowIsLoggedModule,
        InfiniteScrollModule,
        DialogModule,
        ReactiveFormsModule,
        BackHistoryModule
    ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ]
})
export class CoreModule{}
