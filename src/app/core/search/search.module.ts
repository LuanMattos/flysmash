import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search.routing.module';
import { BackHistoryModule } from 'src/app/shared/directives/back-history/back-history.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ShowIsLoggedModule } from 'src/app/shared/directives/show-is-logged/show-is-logged.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
      SearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    QuicklinkModule,
    SearchRoutingModule,
    BackHistoryModule,
    ShowIsLoggedModule,
    InfiniteScrollModule
  ],
  exports: [
    QuicklinkModule
  ],
  providers: []
})
export class SearchModule{}
