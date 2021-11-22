import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HeaderHomeComponent } from './header-home.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
      HeaderHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderHomeComponent
  ],
  providers: []
})
export class HeaderHomeModule{}
