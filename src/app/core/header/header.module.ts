import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ShowIsLoggedModule } from 'src/app/shared/directives/show-is-logged/show-is-logged.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
      HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ShowIsLoggedModule,
    InfiniteScrollModule
  ],
  exports: [
      HeaderComponent
  ],
  providers: []
})
export class HeaderModule{}
